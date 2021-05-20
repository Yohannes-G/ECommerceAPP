import express from 'express'
const router = express.Router()
//import Product from '../models/productModels.js'
import { getUsers,authUser, registerUser, getUserProfile,updateUserProfile } from '../controllers/userControllers.js'
//import mongoose from 'mongoose'
import {protect} from '../middleware/authMiddleWare.js'


router.route('/').get(getUsers)



router.route('/').post(registerUser)
router.post('/login', authUser) 
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)  

export default router    