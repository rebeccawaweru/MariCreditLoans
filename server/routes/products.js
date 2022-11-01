const express = require('express')
const router = express.Router()
// const permissionMiddleware = require('../middleware/permissions')
const {
// findInterest,
getProduct, 
getAllProducts,
updateProduct,
deleteProduct,
newProduct} = require('../controllers/products')

router.route('/product').get(getAllProducts).post(newProduct)
router.route('/product/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
// router.post('/:user', permissionMiddleware, newProduct)

module.exports = router