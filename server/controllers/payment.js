const axios = require('axios')
const Payment = require('../models/Payment');
const Loan = require('../models/Loan')
const {StatusCodes} = require ('http-status-codes');
const {createTransport} = require('nodemailer');
const transporter = createTransport({
    service:'gmail',
    auth:{
    user:process.env.GMAIL_USER,
    pass:process.env.GMAIL_PASSWORD
    }
});
const passkey = process.env.PASSKEY;
const shortcode = process.env.SHORTCODE;
const Consumerkey = process.env.CONSUMERKEY;
const Consumersecret = process.env.CONSUMERSECRET;
//timestamp
const date = new Date();
const timestamp = 
date.getFullYear() + 
("0" + (date.getMonth() + 1)).slice(-2) +
("0" + date.getDate()).slice(-2) +
("0" + date.getHours()).slice(-2) +
("0" + date.getMinutes()).slice(-2) +
("0" + date.getSeconds()).slice(-2) 

//middleware to generate token 
const token = async (req,res,next)=>{
    //in production convert sandbox. to api
    const auth = Buffer.from(Consumerkey + ':' + Consumersecret).toString('base64');
    await axios.get('https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',{
        headers:{
            Authorization: 'Basic ' + auth,
        },
    }).then((response)=>{
        console.log(response.data.access_token)
        let data = response.data;
        let access_token = data.access_token;
        req.token = access_token
        return next() 
    }).catch(err=>{
        res.status(400).json(err)
        console.log(err)
    })
}
const token2 = async(req,res,next)=>{
    let secret="VwjQRosAHZxStWmj4bVidwsuJWSbSofj";
    let key="qJAT14YL3EzntpW0";
    const auth = Buffer.from(secret + ':' + key).toString('base64');
    await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',{
        headers:{
            Authorization: 'Basic ' + auth,
        },
    }).then((response)=>{
        console.log(response.data.access_token)
     
        let data = response.data;
        let access_token = data.access_token;
        req.token = access_token
        return next() 
    }).catch(err=>{
        res.status(400).json(err)
        console.log(err.message)
    }) 
}


//stkpush+authtoken
const stkPush = async (req,res)=>{
const {loanid,name,idnumber,phonenumber,amount,mode,product,addedBy} = req.body;
const token = req.token;
// const headers = `Bearer ${token}`;
const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");
//in production convert sandbox. to api
await axios.post('https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',{  
    "BusinessShortCode": shortcode,    
    "Password": password,    
    "Timestamp": timestamp,    
    "TransactionType": "CustomerPayBillOnline",    
    "Amount":amount,    
    "PartyA":'254'+phonenumber,    
    "PartyB": shortcode,    
    "PhoneNumber":'254'+phonenumber,    
    "CallBackURL":"https://zany-pear-drill-slip.cyclic.app/callback?loanid="+loanid,    
    "AccountReference":"Test",    
    "TransactionDesc":"Test"
},{
    headers:{
        Authorization: `Bearer ${token}`
    }
}).then((response)=>{
    res.json(response.data);
    console.log(response.data);
}).catch(error=>{
    console.log(error);
    res.status(400).json(error)
});
}

//callback
const cbk = async(req,res)=>{
    const callbackData = await (req.body) ;
  //we will use loan id to get user information
    console.log(callbackData.Body);
    console.log(req.query.loanid)
    if(!callbackData.Body.stkCallback.CallbackMetadata){
        console.log(callbackData.Body);
       return res.json('ok')
    }
    console.log(callbackData.Body.stkCallback.CallbackMetadata)
    const loan = await Loan.findById({_id:req.query.loanid})
    const r = loan.balance - Number(loan.amount);
      const date = new Date().toISOString().slice(0, 10)
      const days = new Date(date.replace(/-/g, "/")).getTime() - new Date(loan.initiation.replace(/-/g, "/")).getTime();
      const newrate = 1/30*loan.rate/100;
     const reducingBalance = ((r * newrate *days/(60 * 60 * 24 * 1000)) + r)
    // const time = callbackData.Body.stkCallback.CallbackMetadata.Item[5].Value
    const phone =callbackData.Body.stkCallback.CallbackMetadata.Item[4].Value;
    const amount = callbackData.Body.stkCallback.CallbackMetadata.Item[0].Value;
    const trnx_id = callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value;
    //save to database
    if(loan){
        const payment = await Payment.create({
            loanid:req.query.loanid,
            name:loan.fullname,
            idnumber:loan.idnumber,
            phonenumber:phone,
            amount:amount,
            transactioncode:trnx_id,
            reducingbalance:reducingBalance,
            // mode:req.query.mode,
            product:loan.product,
            // addedBy:req.query.addedBy
            });
            res.status(StatusCodes.OK).json({success:true, payment})
    }else{
        res.status(404).json('Loan not found')
    }
}
//stk push query to see status of transaction
const stkpushquery = async(req,res)=>{
    const token = req.token;
    const CheckoutRequestID = req.body.CheckoutRequestID;
    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");
    await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: CheckoutRequestID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((responce) => {
      res.status(200).json(responce.data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json(err);
    });
    
}

const newpayment = async(req,res)=>{
   const {loanid,reducingbalance,name,idnumber,phonenumber,amount,mode,product,addedBy,transactioncode} = req.body;
   const payment = await Payment.create({loanid,reducingbalance,name,idnumber,phonenumber,amount,mode,product,addedBy,transactioncode});
   res.status(StatusCodes.OK).json({success:true, payment})
}

const confirmpayment = async(req,res)=>{
    const {email,fullname,amount,balance,date} = req.body;
    const payment = transporter.sendMail({
        from:process.env.GMAIL_USER,
        to:email,
        subject:'PAYMENT CONFIRMATION',
        html:`<p>Dear ${fullname},<br><br>
              Your payment of  Ksh${amount.toLocaleString()} has been received.<br></br>
              Current loan balance: Ksh${balance.toLocaleString()}</p> <br></br>
              Regards, <br></br>
              MariCredit <br></br>
              We believe,we multipy`
    })
    res.status(StatusCodes.OK).json({success:true, payment})
}

// https://api.safaricom.co.ke/mpesa/c2b/v2/registerurl
const customerbusinness = async(req,res)=>{
    const token = req.token;
    await axios.post('https://api.safaricom.co.ke/mpesa/c2b/v2/registerurl',{
            "ShortCode":"4037355",
            "ResponseType":"Completed",
            "ConfirmationURL":"https://zany-pear-drill-slip.cyclic.app/confirm",
            "ValidationURL":"https://zany-pear-drill-slip.cyclic.app/validation",
    },
    {
        headers:{
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`,
        },
    }
   ).then((response)=>{
      res.json(response)
   })
   .catch((err)=>{
    res.json(err)
    console.log(err)
   })
}

const validation = async(req,res)=>{}

const callback2 = async(req,res)=>{
    const response = await JSON.stringify(req.body);
    const date = new Date().toISOString().slice(0, 10);
    const day = 24 * 60 * 60 * 1000;
    const data =`${response}`;
    const obj = JSON.parse(data);
    // console.log(obj.TransID)  
    // console.log(obj.BillRefNumber)
    const char = obj.BillRefNumber
    const rest = char.slice(1)
    const id = char.charAt(0).toUpperCase()+rest
    const loan = await Loan.findOne({loanID:id})
    const reducingbalance = Number(loan.balance) - Number(obj.TransAmount);
    const r = Math.round(reducingbalance * (1/30*loan.rate/100) * ((new Date(date.replace(/-/g, "/")).getTime() - new Date(loan.initiation.replace(/-/g, "/")).getTime())/day) + reducingbalance );
    const message =`Dear Customer, your payment for loanID ${id} of ksh ${obj.TransAmount} has been received. Your current loan balance is ${r}.Thank you.`
    var smsdata = JSON.stringify({
        "apikey": "76aae574a4cfb062777c5b90c70bea49",
        "partnerID": "2026",
        "mobile": "254"+loan.phonenumber,
        "message":message,
        "shortcode": "MARICREDIT",
        "pass_type": "plain"
        });
        var config = {
            method: 'post',
            url: 'https://quicksms.advantasms.com/api/services/sendsms/',
            headers: { 
              'Content-Type': 'application/json', 
              'Cookie': 'PHPSESSID=pc85qbvdjaefs409geuca3ngj3'
            },
            data : smsdata
        };
         await axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data.responses));
          }).catch((err)=>console.log(err.message));
          await Loan.findOneAndUpdate({loanID:loan.loanID},{
            balance:reducingbalance
        }).then((response)=>console.log(response))
        .catch((err)=>console.log(err.message))
      const payment = await Payment.create({
        loanid:loan._id,
        name:loan.fullname,
        idnumber:loan.idnumber,
        phonenumber:loan.phonenumber,
        amount:obj.TransAmount,
        reducingbalance:r,
        transactioncode:obj.TransID,
        product:loan.product,
        })
        res.status(StatusCodes.OK).json({success:true, payment})
 if(!loan){
const num = (obj.MSISDN).slice(-3);
const query = { phonenumber: { $regex: new RegExp('458' + '$') } };
const loan2 = await Loan.find(query);
console.log(loan2)
 const reducingbalance = Number(loan2.balance) - Number(obj.TransAmount);
const r = Math.round(reducingbalance * (1/30*loan2.rate/100) * ((new Date(date.replace(/-/g, "/")).getTime() - new Date(loan2.initiation.replace(/-/g, "/")).getTime())/day) + reducingbalance );
const message =`Dear Customer, your payment for loanID ${loan2.loanID} of ksh ${obj.TransAmount} has been received. Your current loan balance is ${r}.Thank you.`
var smsdata = JSON.stringify({
    "apikey": "76aae574a4cfb062777c5b90c70bea49",
    "partnerID": "2026",
    "mobile": "254"+loan2.phonenumber,
    "message":message,
    "shortcode": "MARICREDIT",
    "pass_type": "plain"
    });
    var config = {
        method: 'post',
        url: 'https://quicksms.advantasms.com/api/services/sendsms/',
        headers: { 
          'Content-Type': 'application/json', 
          'Cookie': 'PHPSESSID=pc85qbvdjaefs409geuca3ngj3'
        },
        data : smsdata
    };
     await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.responses));
      }).catch((err)=>console.log(err.message));
      await Loan.findOneAndUpdate({loanID:loan2.loanID},{
        balance:reducingbalance
    }).then((response)=>console.log(response))
    .catch((err)=>console.log(err.message))
  const payment = await Payment.create({
    loanid:loan2._id,
    name:loan2.fullname,
    idnumber:loan2.idnumber,
    phonenumber:loan2.phonenumber,
    amount:obj.TransAmount,
    reducingbalance:r,
    transactioncode:obj.TransID,
    product:loan2.product,
    }).then(()=>{
        res.status(StatusCodes.OK).json({success:true, payment}) 
    }) 
        };
        //end of if
}

//send sms
const sms = async(req,res)=>{
    const {phonenumber,message} = req.body;
    var data = JSON.stringify({
    "apikey": "76aae574a4cfb062777c5b90c70bea49",
    "partnerID": "2026",
    "mobile": "254"+phonenumber,
    "message": message,
    "shortcode": "MARICREDIT",
    "pass_type": "plain"
    });
    
    var config = {
      method: 'post',
      url: 'https://quicksms.advantasms.com/api/services/sendsms/',
      headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'PHPSESSID=pc85qbvdjaefs409geuca3ngj3'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
        res.status(StatusCodes.OK).json({success:true})
      console.log(JSON.stringify(response.data.responses));
      
    })
    .catch(function (error) {
      console.log(error);
    });
}
const getpayments = async(req,res)=>{
    try {
    const payment = await Payment.find({}).sort({payday:-1})
     res.status(StatusCodes.OK).json({success:true, payment})
    } catch (error) {
        return (error=>res.json(error.message));
    }
}
const getpayment = async(req,res)=>{
    try {
    const {id:paymentId} = req.params;
    const payment = await Payment.findById({_id:paymentId}).sort({payday:1})
    res.status(Status.OK).json({success:true, payment})    
    if(!payment){
        res.status(StatusCodes.NOT_FOUND).json('payment not found')
    }
   
    } catch (error) {
        return (error=>res.json(error.message)); 
    }

}
const getloanPay = async(req,res)=>{
        const {loanid} = req.body;
        const payment = await Payment.find({loanid})
        if(!payment){
            res.status(StatusCodes.NOT_FOUND).json('payment not found')
        }
        res.status(StatusCodes.OK).json({success:true, payment}) 
}

const updatepayment = async(req,res)=>{
    try {
    const {id:paymentId} = req.params;
    const payment = await Payment.findByIdAndUpdate({_id:paymentId},req.body,{
        new:true,
        runValidators:true,
    })
    if(!payment){
        res.status(StatusCodes.NOT_FOUND).json('Select payment to update')
    }
    res.status(Status.OK).json({success:true, payment})    
    } catch (error) {
        return (error=>res.json(error.message));   
    }
}
const deletepayment = async(req,res)=>{
    try {
        const {id:paymentId} = req.params;
    const payment = await Payment.findByIdAndDelete({_id:paymentId})
    if(!payment){
        res.status(StatusCodes.NOT_FOUND).json('Select payment to delete')
    }
    res.status(Status.OK).json({success:true, payment})    
    } catch (error) {
        return (error=>res.json(error.message));  
    }

}

// const mypayments = async(req,res)=>{
//     const {user:userId} = req.params;
//     const payment = await Payment.find({userId:userId})
//     if(!payment){
//         throw new NotFoundError('You have not made any payments')
//     }
//     res.status(200).json({payment})
// }
//stkpush
// const mpesaPassword = async(req,res)=>{
//     res.send(newPassword())
// }
// const createpayment = async(req,res)=>{
//     const token = req.token;
//     res.send(token)
//     const stkURL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
//     let data = {
//     BusinessShortCode:"174379",    
//     Password:new Password(),    
//     Timestamp:"20160216165627",    
//     TransactionType: "CustomerPayBillOnline",    
//     Amount:"100",    
//     PartyA:"254702742458",    
//     PartyB:"174379",    
//     PhoneNumber:"254702742458",    
//     CallBackURL:"https://mydomain.com/pat",    
//     AccountReference:"MariCredit",    
//     TransactionDesc:"lipa na Mpesa"    
//     }
// }
// const creatpayment = async(req,res) =>{
//     const payment = await Payment.create(req.body)
//     res.status(200).json({payment})
// }


module.exports = {
token,
token2,
stkpushquery,
sms,
stkPush,
cbk,
newpayment,
customerbusinness,
callback2,
validation,
getpayments,
getpayment,
updatepayment,
deletepayment,
getloanPay,
confirmpayment,

}