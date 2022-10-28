const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    payday:{
    type:Date,
    default:Date.now()
    },
    amount:{
    type:Number,
    required:true,
    },
    // loanId:{
    // type: mongoose.Types.ObjectId,
    // ref: 'Loan',
    // required: [true, 'Loan id required'],
    // trim:true, 
    // },
    // userId: {
    // type: mongoose.Types.ObjectId,
    // ref: 'User',
    // required: [true, 'Please provide user'],
    // trim:true,
    // },
    mode:{
    type:String,
    required:true,
    }
})

module.exports = mongoose.model('Payment', paymentSchema)