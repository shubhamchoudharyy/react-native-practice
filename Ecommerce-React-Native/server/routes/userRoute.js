import express from "express";
import { getUserController, loginController, logoutController, passwordResetController, registerController, updatePasswordController, updatePictureController, updateProfileController } from "../controllers/userCtrl.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";
import {rateLimit} from 'express-rate-limit'

// rate limiter
const limiter=rateLimit({
    windowMs:15*60*1000,
    limit:100,
    standardHeaders:'draft-7',
    legacyHeaders:false
})
const router=express.Router()

router.post('/register',limiter,registerController)
router.post('/login',limiter,loginController)

router.get('/profile',isAuth,getUserController)

router.get('/logout',isAuth,logoutController)

router.put('/profile-update',isAuth,updateProfileController)

router.put('/update-password',isAuth,updatePasswordController)

router.put('/update-picture',isAuth,singleUpload,updatePictureController)

// forgot password
router.post('/reset-password',passwordResetController)

export default router