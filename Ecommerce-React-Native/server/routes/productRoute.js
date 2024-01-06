import express from 'express'
import { createProductController, deleteProductController, deleteProductImgController, getAllProductsController, getProductController, reviewProductController, topProductController, updateProductController, updateProductImgController } from '../controllers/productController.js'
import { singleUpload } from '../middlewares/multer.js'
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js'

const router=express.Router()

router.get('/get-all',getAllProductsController)

router.get('/top',topProductController)

router.get('/:id',getProductController)

router.post('/create',isAuth,isAdmin,singleUpload,createProductController)
// update product
router.put('/:id',isAuth,isAdmin,updateProductController)

// updaate product image
router.put('/image/:id',isAuth,isAdmin,singleUpload,updateProductImgController)

// delete product image
router.delete('/delete-image/:id',isAuth,isAdmin,deleteProductImgController)

router.delete('/delete/:id',isAuth,isAdmin,deleteProductController)

// review product
router.put('/:id/review',isAuth,reviewProductController)
export default router