const express = require('express')
const router = express.Router()
const {getloans,getloan,creatloan,updateloan,deleteloan,myloans,loanrequest,getUserloans,loan} = require('../controllers/loans')
// const permissionMiddleware = require('../middleware/permissions')

router.route('/loan').get(getloans).post(creatloan);


// router.route('/userloans/:phone/:user', permissionMiddleware).get(getUserloans)
// router.route('/:id').get(getloan)

// router.route('/:id/:user', permissionMiddleware).put(updateloan)

// router.delete('/:id/:user', permissionMiddleware,deleteloan)



router.get('/myloans/:user', myloans)
router.get('/requests/:request', loanrequest)
module.exports = router