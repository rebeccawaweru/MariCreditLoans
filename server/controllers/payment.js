// const axios = require('axios')
const Payment = require('../models/Payment');
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
const consumerkey = process.env.CONSUMERKEY;
const consumersecret = process.env.CONSUMERSECRET;

let date = new Date()
let time = date.getDate() + "" + "" + date.getMonth() + "" + "" + date.getFullYear() + "" + "" + date.getHours() + "" + "" + date.getMinutes() + "" + "" + date.getSeconds();
const timestamp = new Buffer.from(time).toString('base64');

// const token = (req,res,next)=>{
//     const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
//     const auth = 'Basic ' + Buffer.from(consumerkey + ':' + consumersecret).toString('base64');
//     const headers = {
//         Authorization: auth,
//     }
//     axios.get(
//     url,{
//         headers:headers
//     }).then(response=>{
//         let data = response.data;
//         let access_token = data.access_token;
//         req.token = access_token
//         console.log(response.data);
//         return next()
//     }).catch(error=>console.log(error))
// }

//middleware to generate token 

const token = async (req,res,next)=>{
    //in production convert sandbox. to api
    
    // const auth = new Buffer.from(`${consumerkey}:${consumersecret}`).toString("base64")
    // await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',{
    //     Headers:{
    //         authorization: `Basic  ${auth}`,
    //     },
    
    // }).then((response)=>{
    //     res.status(200).json(data)
    //     console.log(response.data.access_token)
    //     token = response.data.access_token
    //     next() 
    // }).catch(err=>{
    //     res.status(400).json(err)
    //     console.log(err)
    // })
}

const stkPush = (req,res)=>{
// const token = req.token;
// const headers = `Bearer ${token}`;
// // const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")
// //in production convert sandbox. to api
// axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',{  
    
//     BusinessShortCode:"174379",    
//     Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
//     Timestamp:timestamp,    
//     TransactionType: "CustomerPayBillOnline",    
//     Amount:"1",    
//     PartyA:"254702742458",    
//     PartyB:"174379",    
//     PhoneNumber:"254702742458",    
//     CallBackURL:"https://mydomain.com/pat",    
//     AccountReference:"Test",    
//     TransactionDesc:"Test"  
// },{
//     headers:{
//         Authorization: `Bearer ${token}`
//     }
// }).then((response)=>{
//     console.log(response);
//     res.status(200).json(response)
// }).catch(error=>{
//     console.log(error.message);
//     res.status(400).json(error.message)

// });
// const stkURL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
// let password = new Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
// let data = {
//     BusinessShortCode:"174379",    
//     Password:"MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
//     Timestamp:timestamp,    
//     TransactionType:"CustomerPayBillOnline",    
//     Amount:"1",    
//     PartyA:"254702742458",    
//     PartyB:"174379",    
//     PhoneNumber:"254702742458",    
//     CallBackURL:"https://maricredit.herokuapp.com/cbk",    
//     AccountReference:"MariCredit",    
//     TransactionDesc:"lipa na Mpesa"    
//     }
//     axios.post(stkURL, data, { headers: {Authorization: headers}}).then(response=>res.send(response.data));
}
const cbk = async(req,res)=>{
    var payload = await req.body;
    res.status(200).send(payload)
}

const newpayment = async(req,res)=>{
   const {loanid,name,idnumber,phonenumber,amount,mode,product,addedBy} = req.body;
   const payment = await Payment.create({loanid,name,idnumber,phonenumber,amount,mode,product,addedBy});
   res.status(StatusCodes.OK).json({success:true, payment})
}

const confirmpayment = async(req,res)=>{
    const {email,fullname,amount,balance,date} = req.body;
    const payment = transporter.sendMail({
        from:process.env.GMAIL_USER,
        to:email,
        subject:'PAYMENT CONFIRMATION',
        html:`<p>Dear ${fullname},<br><br>
              Your payment of  ${amount.toLocaleString()} has been received.<br></br>
              Current loan balance: ${balance.toLocaleString()}</p> <br></br>
              Regards, <br></br>
              MariCredit <br></br>
              We believe,we multipy`
    })
    res.status(StatusCodes.OK).json({success:true, payment})
}
const getpayments = async(req,res)=>{
    try {
    const payment = await Payment.find({})
     res.status(StatusCodes.OK).json({success:true, payment})
    } catch (error) {
        return (error=>res.json(error.message));
    }
}
const getpayment = async(req,res)=>{
    try {
    const {id:paymentId} = req.params;
    const payment = await Payment.findById({_id:paymentId})
    if(!payment){
        res.status(StatusCodes.NOT_FOUND).json('payment not found')
    }
    res.status(Status.OK).json({success:true, payment})    
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
stkPush,
cbk,
newpayment,
getpayments,
getpayment,
updatepayment,
deletepayment,
getloanPay,
confirmpayment
}