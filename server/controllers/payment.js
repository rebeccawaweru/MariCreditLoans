const Payment = require('../models/Payment')
const {BadRequestError, UnauthenticatedError, NotFoundError, CustomAPIError} = require('../errors')

const getpayments = async(req,res)=>{
    const payment = await Payment.find({})
    res.status(200).json({payment})
}
const getpayment = async(req,res)=>{
    const {id:paymentId} = req.params;
    const payment = await Payment.findById({_id:paymentId})
    if(!payment){
        throw new NotFoundError('payment not found')
    }
    res.status(200).json({payment})
}

const mypayments = async(req,res)=>{
    const {user:userId} = req.params;
    const payment = await Payment.find({userId:userId})
    if(!payment){
        throw new NotFoundError('You have not made any payments')
    }
    res.status(200).json({payment})
}
//stkpush
const mpesaPassword = async(req,res)=>{
    res.send(newPassword())
}
const createpayment = async(req,res)=>{
    const token = req.token;
    res.send(token)
    const stkURL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    let data = {
    BusinessShortCode:"174379",    
    Password:new Password(),    
    Timestamp:"20160216165627",    
    TransactionType: "CustomerPayBillOnline",    
    Amount:"100",    
    PartyA:"254702742458",    
    PartyB:"174379",    
    PhoneNumber:"254702742458",    
    CallBackURL:"https://mydomain.com/pat",    
    AccountReference:"MariCredit",    
    TransactionDesc:"lipa na Mpesa"    
    }
  

 
}
// const creatpayment = async(req,res) =>{
//     const payment = await Payment.create(req.body)
//     res.status(200).json({payment})
// }
const updatepayment = async(req,res)=>{
    const {id:paymentId} = req.params;
    const payment = await Payment.findByIdAndUpdate({_id:paymentId},req.body,{
        new:true,
        runValidators:true,
    })
    if(!payment){
        throw new BadRequestError('Select payment to update')
    }
    res.status(200).json({msg:'payment updated'})
}
const deletepayment = async(req,res)=>{
    const {id:paymentId} = req.params
    const payment = await Payment.findByIdAndDelete({_id:paymentId})
    if(!payment){
        throw new BadRequestError('Select payment to delete')
    }
    res.status(200).json({msg:'payment deleted'})
}

module.exports = {
getpayments,
getpayment,
mypayments,
createpayment,
updatepayment,
deletepayment
}