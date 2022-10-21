const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        require:[true, 'Please enter full name'],
    },
    email:{
        type:String,
        require:[true, 'Please enter email'],
        unique:[true, 'Email already exists'],
    },
    phonenumber:{
        type:String,
        require:[true,'Please enter phone number'],
    },
    password:{
        type:String,
        require:[true, 'Please enter password']
    },
    otp:{
        type:Number,
        default:0,
        unique:true, 
    }
})

module.exports = mongoose.model('User', userSchema)