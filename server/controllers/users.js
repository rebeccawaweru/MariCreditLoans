const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {isEmpty} = require('lodash');
const axios = require('axios')
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
    res.status(StatusCodes.BAD_REQUEST).json({message:'User already exists'});
}
const salt = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(password, salt);
const user = await User.create({fullname,phonenumber,email,password:hashedpassword});
res.status(StatusCodes.OK).json({success:true, user})
};
const login = async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(StatusCodes.BAD_REQUEST).send({success:false,message:'Please provide the required credentials'})
    }
    const user = await User.findOne({email})
    const id = user._id
    if(!user){
        res.status(StatusCodes.NOT_FOUND).send({success:false,message:'Email does not exist'})
    }
    const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    res.status(StatusCodes.UNAUTHORIZED).send({success:false,message:'Wrong Credentials'})
   }
     res.status(StatusCodes.OK).json(id)
}

const getUsers = async (req,res)=>{
    const user = await User.find({})
    res.status(StatusCodes.OK).json({success:true,user})
}
//get specific user
const getUser = async (req,res) =>{
    const {id:userId} = req.params;
    const user = await User.findById({_id:userId});
    if(!user){
        res.status(StatusCodes).json({message:'User does not exist'})
    }
    res.status(StatusCodes.OK).json({success:true,user})
}
const resetpassword = async(req,res)=>{
const {phonenumber} = req.body;
let zero = 0 + phonenumber;
const otp = Math.floor(100000 + Math.random() * 600000);

await User.findOne({zero}).then((user)=>{
    if(isEmpty(user)){
        res.status(StatusCodes.NOT_FOUND).send('Phone Number does not exist');
    };
    user.otp = otp;
    user.save();
    var smsdata = JSON.stringify({
        "apikey": "76aae574a4cfb062777c5b90c70bea49",
        "partnerID": "2026",
        "mobile": "254"+phonenumber,
        "message":"OTP:"+otp,
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
          axios(config)
          .then(function (response) {
            return res.status(StatusCodes.OK).json({success:true, message:'OTP sent'}) 
          }).catch((err)=>console.log(err));
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
    })
    .catch(err=>res.json(err.message))
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

const addUserField = async(req,res)=>{
    const field =  await User.updateMany({}, { $set: { usertype: 'mobile' } });
    res.json({field})
   }

module.exports = {addUserField,getUser,getUsers,register,resetpassword,confirmPassword,newpassword,login}