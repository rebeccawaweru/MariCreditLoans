const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    interest:{
        type:Number,
        required:true,
    },
    addedBy: {
        type:String,
        required: [true, 'Please provide user'],
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Product', productSchema)