import express from 'express'
import { testCtrl } from '../controllers/testCtrl.js'

const router=express.Router()

router.get('/test',testCtrl)

export default router;