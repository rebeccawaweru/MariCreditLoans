const express = require('express')
const router = express.Router()
const {
newpayment,
getpayments,
getpayment,
updatepayment,
deletepayment,
getloanPay,
confirmpayment
} = require('../controllers/payment')

router.route('/payment').post(newpayment).get(getpayments)
router.route('/loanpay').post(getloanPay)
router.route('/payment/:id').get(getpayment).patch(updatepayment).delete(deletepayment);
router.route('/confirmpayment').post(confirmpayment)
module.exports = router