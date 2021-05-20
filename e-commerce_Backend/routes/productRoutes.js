import express from 'express'
const router = express.Router()
import Product from '../models/productModels.js'
import { getProducts , getProductById } from '../controllers/productControllers.js'
import mongoose from 'mongoose'
//async error handler


router.route('/').get(getProducts)

router.route('/:id').get(getProductById)


export default router