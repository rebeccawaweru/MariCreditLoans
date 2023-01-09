const Loan = require('../models/Loan')
const {StatusCodes} = require('http-status-codes')

const creatloan = async(req,res) =>{
const random = Math.floor(10000 + Math.random() * 30000);
const {fullname,phonenumber,email,idnumber,job,product,amount,period,tenature,front,back,rate,interest,finalAmount,balance,loanID} = req.body;
const loan = await Loan.create({loanID:'C'+random,fullname,phonenumber,email,idnumber,job,product,amount,period,tenature,front,back,rate,interest,finalAmount,balance})
res.status(StatusCodes.CREATED).json({success:true, loan})   
   
}

const getloans = async(req,res)=>{
    const loan = await Loan.find({}).sort({requestedOn:-1})
    res.status(StatusCodes.OK).json({success:true, loan})  
}
const getloan = async(req,res)=>{
    const {id:loanId} = req.params;
    const loan = await Loan.findById({_id:loanId})
    if(!loan){
        res.status(StatusCodes.NOT_FOUND).json({message:'Loan not found'})
    }
    res.status(StatusCodes.OK).json({success:true, loan})   
}
//whether loan is pending, approved or rejected
const loanrequest = async(req,res)=>{
    const {request:request} = req.params
    const loan = await Loan.find({request:request})
    res.status(200).json({loan})
}
const myloans = async(req,res)=>{
    try {
        const {email:email} = req.params;
        const loan = await Loan.find({"email":email});
        if(!loan){
           res.status(StatusCodes.NOT_FOUND).json({message:'You do not have any loans'})
        }
        res.status(StatusCodes.OK).json({success:true, loan}) 
    } catch (error) {
        return (error=>res.json(error.message))     
    }
}

const updateloan = async(req,res)=>{
        const {id:loanId} = req.params;
        const loan = await Loan.findByIdAndUpdate({_id:loanId},req.body,{
            new:true,
            runValidators:true,
        })
        res.status(StatusCodes.OK).json({success:true, loan}); 
  
}
const deleteloan = async(req,res)=>{
    const {id:loanId} = req.params
    const loan = await Loan.findByIdAndDelete({_id:loanId})
    if(!loan){
        res.status(StatusCodes.BAD_REQUEST).json('Select loan to delete')
    }
    res.status(200).json({success:true, message:'Loan Deleted'})   
   
}

const getUserloans = async(req,res)=>{
    const {phone:phonenumber} = req.params
    const loan = await Loan.find({phonenumber:phonenumber})
    res.json({loan})
}

const addLoanField = async(req,res)=>{
 const field =  await Loan.updateMany({}, { $set: { accountbalance: 0 } });
 res.json({field})
}




module.exports = {
addLoanField,
getloans,
getloan,
myloans,
creatloan,
updateloan,
loanrequest,
deleteloan,
getUserloans
}