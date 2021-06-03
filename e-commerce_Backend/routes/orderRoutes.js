import express from 'express'
const router = express.Router()

//import Product from '../models/productModels.js'
import { addOrderItems ,
	     getOrderById,
	     getMyOrders,
	     updateOrderToPaid,
	     getAllOrders,
	     updateOrderToDelivered } from '../controllers/orderControllers.js'
//import mongoose from 'mongoose'
import {protect,admin} from '../middleware/authMiddleWare.js'


router.route('/').post(protect, addOrderItems)
				 .get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
export default router       