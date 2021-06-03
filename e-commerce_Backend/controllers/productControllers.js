 import asyncHandler from 'express-async-handler'
import Product from '../models/productModels.js'


//description Fetch all products
//router      GET /api/products
//access      Public

const getProducts = asyncHandler(async (req, res)=>{
	const pageSize = 3
	const page = Number(req.query.pageNumber) || 1 //whether it is  ?pageNumber=2
	const keyword = req.query.keyword ? { //take value after the questions mark
		name:{
			$regex: req.query.keyword, //to extract the product using the first spellings for search
			$options: 'i' //case insensitive
		}
	}:{}
	const count = await Product.countDocuments({ ...keyword})//number of product to be count
	const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
	//console.log(products[0]._id)
	//console.log("Hello There")
	res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

//description Delete product
//router      DELETE /api/products/:id
//access      Private/Admin

const deleteProduct = asyncHandler(async (req, res)=>{
	const typeID =  req.params.id
	const product = await Product.findById(typeID)

	if(product){
	 	await product.remove()
	 	res.json({message:'Product removed'})

	}else{
		res.status(404)
		throw new Error('Product not found Sorry')
	}

})


//description Create product
//router      POST /api/products/
//access      Private/Admin

const createProduct = asyncHandler(async (req, res)=>{
	const typeID =  req.params.id
	const product = new Product({
		name: 'Sample name',
		price:0,
		user:req.user._id,
		image:'/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock:0,
		numReviews:0,
		description:'Sample description'
	})

	 const createdProduct = await product.save()
	 res.status(201).json(createdProduct)

})

//description Update product
//router      PUT /api/products/:ID
//access      Private/Admin

const updateProduct = asyncHandler(async (req, res)=>{
 	const {name, price, description, image, brand, category, countInStock} = req.body
 	const product = await Product.findById(req.params.id)

 	if(product){

 		product.name = name
 		product.price = price
 		product.description = description
 		product.image = image
 		product.brand = brand
 		product.category = category
 		product.countInStock = countInStock

		const updatedProduct = await product.save()
	    res.json(updatedProduct)

 	}else{
 		res.status(404)
 		throw new Error('Product Not found')
 	}
})

//description Create new reviews 
//router      POST /api/products/:id/reviews
//access      Private

const createProductReview = asyncHandler(async (req, res)=>{
 	const {rating, comment} = req.body
 	const product = await Product.findById(req.params.id)

 	if(product){
 		const alreadyReviewed = product.reviews.find(r => r.user.toString()===req.user._id.toString())
 		if(alreadyReviewed){
 			res.status(400)
 			throw new Error('Product already Reviewedr')
 		}

 		const review = {
 			name:req.user.name,
 			rating:Number(rating),
 			comment,
 			user: req.user._id,
 		}

 		product.reviews.push(review)

 		product.numReviews = product.reviews.length

 		product.rating = product.reviews.reduce(
 								(accumulator, item)=>item.rating + accumulator, 0)/product.reviews.length
 		await product.save()
 		res.status(201).json({message: 'Review added'})

 	}else{
 		res.status(404)
 		throw new Error('Product Not found')
 	}
})
//description Get top rated products
//router      POST /api/products/top
//access      Public

const getTopProducts = asyncHandler(async (req, res)=>{
  const products = await Product.find({}).sort({rating:-1}).limit(3)
  res.json(products)
})

export { getProducts,
	     getProductById, 
	     deleteProduct,
	     createProduct,
	     updateProduct,
	     createProductReview,
	     getTopProducts }