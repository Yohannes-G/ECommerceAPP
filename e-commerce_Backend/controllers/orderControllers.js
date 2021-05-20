import asyncHandler from 'express-async-handler'
import Order from '../models/orderModels.js'


//description Create new order
//router      GET /api/products
//access      Public

export const addOrderItems = asyncHandler(async (req, res)=>{
	 const {
	 			orderItems, 
	 			shippingAddress, 
	 			paymentMethod, 
	 			itemsPrice,  
	 			taxPrice, 
	 			shippingPrice, 
	 			totalPrice
	 		} = req.body //will pull out from the body

	if(orderItems && orderItems.length === 0){
		res.status(400)
		throw new Error('No order items')
		return
	}else{
		const order = new Order({
			orderItems, 
			user: req.user._id, //to attach with corresponding user
 			shippingAddress, 
 			paymentMethod, 
 			itemsPrice, 
 			taxPrice, 
 			shippingPrice, 
 			totalPrice,
		})

		const createdOrder = await order.save()//will save instantiated order

		res.status(201).json(createdOrder)
	}
})

