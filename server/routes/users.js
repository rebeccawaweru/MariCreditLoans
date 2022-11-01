const express = require('express');
const router = express.Router();
const {register,resetpassword,newpassword,confirmPassword,login,getUser,getUsers} = require('../controllers/users');

router.route('/newuser').post(register);
router.route('/login').post(login)
router.route('/users').get(getUsers)
router.route('/user/:id').get(getUser)
router.post('/resetpassword',resetpassword);
router.post('/confirmpassword',confirmPassword);
router.route('/newpassword/:email').post(newpassword);

module.exports = router;