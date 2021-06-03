import express from 'express'
const router = express.Router()
import Product from '../models/productModels.js'
import { getProducts , 
		 getProductById,
		 deleteProduct,
		 createProduct,
		 updateProduct,
		 createProductReview,
		 getTopProducts } from '../controllers/productControllers.js'
import mongoose from 'mongoose'
import {protect,admin} from '../middleware/authMiddleWare.js'


//async error handler
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router.route('/:id').get(getProductById)
					.delete(protect,admin,deleteProduct)
					.put(protect, admin, updateProduct)
					
export default router