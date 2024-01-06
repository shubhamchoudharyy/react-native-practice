const express=require('express')
const { registerController, loginController, updateUserController, requireSignIn } = require('../controllers/userCtrl')

// router object 
const router=express.Router()

// routes
router.post('/register',registerController)
router.post('/login',loginController)
router.put('/update-user',requireSignIn,updateUserController)

module.exports=router