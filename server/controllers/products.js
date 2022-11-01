const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes');

//loanproducts
const newProduct = async(req,res)=>{
    const {name,interest,per,addedBy} = req.body
    const findName = await Product.findOne({name});
    if(findName){
        res.status(StatusCodes.BAD_REQUEST).json({message:'Product with existing name already exists'})
    }
    const product = await Product.create({name,interest,per,addedBy})
    res.status(StatusCodes.CREATED).json({success:true, product})   
   
}
const getAllProducts = async(req,res)=>{
    const product = await Product.find({})
    res.status(StatusCodes.OK).json({success:true, product})  
  
}
const getProduct = async(req,res)=>{
    const {id:productId} = req.params;
    const product = await Product.findById({_id:productId})
    if(!product){
    res.status(StatusCodes.NOT_FOUND).json('Product does not exist')
    }
    res.status(StatusCodes.OK).json({success:true, product})  
}

const updateProduct = async(req,res)=>{
    const {id:productId} = req.params
    const product = await Product.findByIdAndUpdate({_id:productId},req.body,
    {new:true,
    runValidators:true,
    })
    if(!product){
       res.status(StatusCodes.NOT_FOUND).json({message:'No product to update'})
    }
    res.status(StatusCodes.OK).json({success:true, product});
}
const deleteProduct = async(req,res)=>{
        const {id:productId} = req.params
        const product = await Product.findByIdAndDelete({_id:productId})
        if(!product){
            res.status(StatusCodes.NOT_FOUND).json({message:'No product to delete'})
        }
        res.status(StatusCodes.OK).json({success:true, message:'Product deleted'})  
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