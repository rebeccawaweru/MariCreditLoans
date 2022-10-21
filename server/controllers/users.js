const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {isEmpty} = require('lodash');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
    user:process.env.GMAIL_USER,
    pass:process.env.GMAIL_PASSWORD
    }
})
const register = async(req,res)=>{
const {fullname,phonenumber,email,password} = req.body;
const findUser = await User.findOne({email});
if(findUser){
    res.status(StatusCodes.BAD_REQUEST).send({success:false,message:'User already exists'});
}
const salt = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(password, salt);
const user = await User.create({fullname,phonenumber,email,password:hashedpassword});
res.status(StatusCodes.OK).json({success:true, user})
};
const login = async(req,res)=>{
    const {email,password} = req.body;
    
}
const resetpassword = async(req,res)=>{
const {email} = req.body;
const otp = Math.floor(100000 + Math.random() * 600000);
await User.findOne({email}).then((user)=>{
    if(isEmpty(user)){
        res.status(StatusCodes.NOT_FOUND).send('Email does not exist');
    };
    user.otp = otp;
    user.save().then(()=>{
    transporter.sendMail({
            from:process.env.GMAIL_USER,
            to:email,
            subject:'RESET PASSWORD',
            html:`<p>Enter this 6-digit code <h3>${otp}</h3></p>`
        });
    res.status(StatusCodes.OK).json({success:true, message:'Check your email'}) 
    });
})};
const confirmPassword = async(req,res)=>{
    const {otp} = req.body;
    await User.findOne({otp}).then((user)=>{
        if(!user){
            res.status(StatusCodes.NOT_FOUND).send('Invalid code')
        }  
    user.otp = 0;
    user.save().then((user)=>{
        res.status(StatusCodes.ACCEPTED).json({success:true, user})
    })
    .catch(err=>res.json(err.message))
    })
}
const newpassword = async(req,res)=>{
    const {email:userEmail} = req.params;
    const {password} = req.body;
    await User.findOne({email:userEmail}).then((user)=>{
        bcrypt.hash(password,10).then((hashedpassword)=>{
            user.password = hashedpassword;
            user.save().then(()=>{
            res.status(StatusCodes.ACCEPTED).json({success:true, message:'Password set'})
            })
        })
    })
    .catch(err=>res.json(err.message))

       
}
module.exports = {register,resetpassword,confirmPassword,newpassword,login}