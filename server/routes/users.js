const express = require('express');
const router = express.Router();
const {register,resetpassword,newpassword,confirmPassword} = require('../controllers/users');

router.route('/newuser').post(register);
router.post('/resetpassword',resetpassword);
router.post('/confirmpassword',confirmPassword);
router.route('/newpassword/:email').post(newpassword);

module.exports = router;