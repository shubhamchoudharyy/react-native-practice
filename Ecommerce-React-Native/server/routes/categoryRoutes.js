import express from 'express'
import { createCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from '../controllers/categoryController.js'
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js'

const router=express.Router()

router.post('/create',isAuth,isAdmin,createCategoryController)

router.get('/get-all',getAllCategoryController)

router.delete('/delete/:id',isAuth,isAdmin,deleteCategoryController)

router.put('/update/:id',isAuth,isAdmin,updateCategoryController)

export default router