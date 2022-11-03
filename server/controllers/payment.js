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
newpayment,
getpayments,
getpayment,
updatepayment,
deletepayment,
getloanPay,
confirmpayment
}