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
stkpushquery,
sms,
customerbusinness,
callback2,
validation,
} = require('../controllers/payment')


router.route('/payment').post(newpayment).get(getpayments)
router.route('/loanpay').post(getloanPay)
router.route('/payment/:id').get(getpayment).patch(updatepayment).delete(deletepayment);
router.route('/confirmpayment').post(confirmpayment);
router.post('/mpesa',token,stkPush);
router.post('/stkpushquery',token,stkpushquery);
router.post('/sms',sms)
router.route('/callback').post(cbk);
router.post('/registerurl',token,customerbusinness)
router.post('/validation', validation)
router.post('/confirm',callback2)
module.exports = router;