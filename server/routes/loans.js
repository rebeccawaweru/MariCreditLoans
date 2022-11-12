const express = require('express')
const router = express.Router()
const {getloans,getloan,creatloan,updateloan,deleteloan,myloans,loanrequest,getUserloans,loan} = require('../controllers/loans')
// const permissionMiddleware = require('../middleware/permissions')

router.route('/loan').get(getloans).post(creatloan);
router.route('/loan/:id').get(getloan).patch(updateloan).delete(deleteloan);

// router.route('/userloans/:phone/:user', permissionMiddleware).get(getUserloans)




// router.delete('/:id/:user', permissionMiddleware,deleteloan)



router.post('/myloans/:email', myloans)
router.get('/requests/:request', loanrequest)
module.exports = router