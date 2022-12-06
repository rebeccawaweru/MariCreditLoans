const express = require('express')
const router = express.Router()
const {
newpayment,
getpayments,
getpayment,
updatepayment,
deletepayment,
getloanPay,
confirmpayment,
token,
stkPush,
cbk,
sms
} = require('../controllers/payment')

router.route('/payment').post(newpayment).get(getpayments)
router.route('/loanpay').post(getloanPay)
router.route('/payment/:id').get(getpayment).patch(updatepayment).delete(deletepayment);
router.route('/confirmpayment').post(confirmpayment);
router.post('/mpesa',token,stkPush);
router.post('/sms',sms)
router.post('/callback',cbk);
module.exports = router