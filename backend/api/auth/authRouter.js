const authController = require('./authController');
const verifyToken = require('./_utils/verifyToken');

const express= require('express');





const {signUpController,loginController, forgotPwd, resetPwd} = authController
const {checkToken} = verifyToken


const router = express.Router()





//auth 

router.post('/auth/signup', signUpController )
router.post('/auth/login', loginController);
router.post('/forgot', forgotPwd);
router.put('/reset/:resetLink', resetPwd);






module.exports = router