const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
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
    accountbalance:{
         type:Number,
         default:0,
         
    },
    password:{
        type:String,
        require:[true, 'Please enter password']
    },
    otp:{
        type:Number,
        default:0,
        unique:true, 
    },
    frontavatar:{
        type:String,
        default:"",
    },
    backavatar:{
        type:String,
        default:"",
    },
    usertype:{
        type:String,
        default:'mobile'
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
     return isMatch
}



module.exports = mongoose.model('User', userSchema)