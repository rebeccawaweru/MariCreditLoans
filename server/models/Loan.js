const mongoose = require('mongoose')

const loanSchema = mongoose.Schema({
   fullname:{
        type:String,
        required:true,
        trim:true,
    },
    phonenumber:{
        type:Number,
        required:true,
        trim:true,
    },
    email:{
      type:String,
      trim:true,
    },
    idnumber:{
        type:Number,
        required:true,
        trim:true,
    },
    job:{
        type:String,
        trim:true,
        required:true
    },
    product: {
        type:String,
        trim:true,
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
    },
    period:{
        type:String,
        required:true,
        trim:true,
      },
    tenature:{
        type:Number,
        required:true,
        trim:true,
    },
    front:{
        type:String,
        required:true
    },
    back:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true,
    },
    interest:{
        type:Number,
        required:true,
    },
    finalAmount:{
        type:Number,
        required:true,
    },
    request:{
        type:String,
        default:"pending",
        trim:true,
    },
    active:{
       type:Boolean,
       default:false,
    },
    requestedOn:{
      type:Date,
      default:Date.now(),
      trim:true,
    },
    handledBy: {
        type:String,
        trim:true,
    },
 
//    emergency1: {
//         type:Number,
//         trim:true,
//         required:true
//     },
//     emergency2: {
//         type:Number,
//         trim:true,
//         required:true
//     }

})

module.exports = mongoose.model('Loan', loanSchema)