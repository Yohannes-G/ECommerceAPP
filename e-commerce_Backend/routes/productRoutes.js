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
	//to find the id on the database
//	const typeID =  req.params.id//set value of the route id
//	const products = await Product.find({})//will find all products
//	console.log(products[typeID])//will extract data from products using typeId
 
//	if(products[typeID]){
	//	res.json(products[typeID])
	//}else{
	//	res.status(404).json({message: 'Product not found'})
	//}
	
	const typeID =  req.params.id
	const product = await Product.findById(typeID)

	if(product){
		res.json(product)

	}else{
		res.status(404)
		throw new Error('Product not found Sorry')
	}

}))

export default router