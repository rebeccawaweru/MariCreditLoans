const express = require('express')
const router = express.Router()
const {
getpayments,
getpayment,
mypayments,
createpayment,
updatepayment,
deletepayment
} = require('../controllers/payment')

router.route('/').post(createpayment)
// router.route('/').get(getpayments).post(creatpayment);
router.route('/:id').get(getpayment).put(updatepayment).delete(deletepayment);
router.get('/mypayments/:user', mypayments)
module.exports = router