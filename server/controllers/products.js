const Product = require('../models/Product')
// const {BadRequestError, UnauthenticatedError, NotFoundError, CustomAPIError} = require('../errors')
const { StatusCodes } = require('http-status-codes');

//loanproducts
const newProduct = async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(StatusCodes.CREATED).json({success:true, product})   
    } catch (error) {
        return (error=>res.json(error.message))
    }
}
const getAllProducts = async(req,res)=>{
    try {
        const product = await Product.find({})
        res.status(StatusCodes.OK).json({success:true, product})  
    } catch (error) {
            return (error=>res.json(error.message))  
    }
}
const getProduct = async(req,res)=>{
    try {
    const {id:productId} = req.params;
    const product = await Product.findById({_id:productId})
    if(!product){
    throw new NotFoundError('Product does not exist')
    }
    res.status(StatusCodes.OK).json({success:true, product})  
    } catch (error) {
        return (error=>res.json(error.message))    
    }
}

const updateProduct = async(req,res)=>{
    try {
    const {id:productId} = req.params
    const product = await Product.findByIdAndUpdate({_id:productId},req.body,
    {new:true,
    runValidators:true,
    })
    res.status(StatusCodes.OK).json({success:true, product})   
    if(!product){
       res.status(StatusCodes.NOT_FOUND).json({message:'No product to update'})
    }
    } catch (error) {
        return (error=>res.json(error.message));  
    }
   
}
const deleteProduct = async(req,res)=>{
    try {
        const {id:productId} = req.params
        const product = await Product.findByIdAndDelete({_id:productId})
        if(!product){
            res.status(StatusCodes.NOT_FOUND).json({message:'No product to delete'})
        }
        res.status(StatusCodes.OK).json({message:'Product deleted'})  
    } catch (error) {
        return (error=>res.json(error.message));  
    }
    
}
// const findInterest = async(req,res)=>{
//     const {name:productname} = req.params
//     const product = await Product.findOne({name:productname})
//     res.status(200).json({product})

// }
module.exports = {
    // findInterest,
    newProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}