const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    loanid:{
    type:String,
    required:true
    },
    name:{
    type:String,
    required:true
    },
    idnumber:{
    type:Number,
    required:true
    },
    phonenumber:{
    type:Number,
    required:true
    },
    product:{
    type:String,
    required:true,
    },
    payday:{
    type:Date,
    default:Date.now()
    },
    amount:{
    type:Number,
    required:true,
    },
    transactioncode:{
    type:String,
    required:true,
    },
    reducingbalance:{
    type:Number,
    required:true
    },
    mode:{
    type:String,
    default:'mpesa'
    },
    addedBy:{
        type:String,
        default:'direct pay'
    }
})

module.exports = mongoose.model('Payment', paymentSchema)