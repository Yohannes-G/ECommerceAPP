import asyncHandler from 'express-async-handler'
import Product from '../models/productModels.js'


//description Fetch all products
//router      GET /api/products
//access      Public

const getProducts = asyncHandler(async (req, res)=>{
	const products = await Product.find({})
	//console.log(products[0]._id)
	//console.log("Hello There")
	res.json(products)
})




//description Fetch single product
//router      GET /api/products/:id
//access      Public

const getProductById = asyncHandler(async (req, res)=>{
	

	const typeID =  req.params.id
	const product = await Product.findById(typeID)

	if(product){
		res.json(product)

	}else{
		res.status(404)
		throw new Error('Product not found Sorry')
	}

})

export {getProducts, getProductById }