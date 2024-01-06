import express from 'express'
import { changeOrderStatusController, createOrderController, getAllOrdersController, getMyOrdersControllers, paymentController, singleOrderDetailsController } from '../controllers/orderController.js';
import { isAdmin, isAuth } from '../middlewares/authMiddleware.js';

const router=express.Router()

router.post('/create',isAuth,createOrderController)

router.get('/my-orders',isAuth,getMyOrdersControllers)

router.get('/my-orders/:id',isAuth,singleOrderDetailsController)

router.post('/payments',isAuth,paymentController)

router.get('/admin/get-all-orders',isAuth,isAdmin,getAllOrdersController)

router.put('/admin/order/:id',isAuth,isAdmin,changeOrderStatusController)
export default router;