import express from 'express'
const router = express.Router()
//import Product from '../models/productModels.js'
import { addOrderItems } from '../controllers/orderControllers.js'
//import mongoose from 'mongoose'
import {protect} from '../middleware/authMiddleWare.js'


router.route('/').post(protect,addOrderItems)

export default router    