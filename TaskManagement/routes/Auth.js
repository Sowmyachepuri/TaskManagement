const express = require('express')
const AuthController = require('../controller/Auth')
const isAuth = require('../middleware/is-auth')
const router = express.Router();


router.post('/Signup',AuthController.Signup)
router.post("/VerifyOTP",AuthController.VerifyOTP)
router.post('/Login',AuthController.Login)
// router.post('/CreatePassword',AuthController.CreatePassword)
// router.post('/forgotPassword',AuthController.ForgotPassword)
// router.post("/ChangePassword",AuthController.ChangePassword)
// router.post("/UpdatePassword",AuthController.UpdatePassword)


module.exports = router;