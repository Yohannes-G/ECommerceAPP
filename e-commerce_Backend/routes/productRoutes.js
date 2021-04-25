import express from 'express'
import asynchHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModels.js'
import mongoose from 'mongoose'
//async error handler

//description Fetch all products
//router      GET /api/products
//access      Public

router.get(
	'/', 
	asynchHandler(async (req, res)=>{

	const products = await Product.find({})
	//console.log(products[0]._id)
	//console.log("Hello There")
	res.json(products)
}))


//description Fetch single product
//router      GET /api/products/:id
//access      Public

router.get('/:id', asynchHandler(async(req, res)=>{

	const typeID =  req.params.id
	console.log(typeID)
	const products = await Product.find({})
	if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return false;
	console.log(products[0]._id)

	console.log(products[typeID])

	const product = await Product.findById(typeID)
	console.log(product)
	if(product){
		res.json(product)
	}else{
		res.status(404).json({message: 'Product not found'})
	}
	
}))

export default router