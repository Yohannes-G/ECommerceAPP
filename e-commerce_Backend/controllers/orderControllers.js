import asyncHandler from 'express-async-handler'
import Order from '../models/orderModels.js'


//description Create new order
//router      POST /api/orders
//access      Private

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
			user: req.user._id, //to attach with corresponding user
			orderItems, 
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



//description get or fetch order by ID
//router      GET /api/orders/:id
//access      Private

export const getOrderById = asyncHandler(async (req, res)=>{
	  const order = await Order.findById(req.params.id).populate('user','name email')
	 
	 // console.log(order)

	  if(order){
	  	res.json(order)
	  }else{
	  	res.status(404)
	  	throw new Error("Order not found")
	  }
})




//description Update order to paid
//router      GET /api/orders/:id/pay
//access      Private

export const updateOrderToPaid = asyncHandler(async (req, res)=>{
	  const order = await Order.findById(req.params.id) 
	  //console.log(order)

	  if(order){
	  	order.isPaid = true
	  	order.paidAt = Date.now()
	  	order.paymentResult = {
	  		id:req.body.id,
	  		status:req.body.status,
	  		update_time: req.body.update_time,
	  		email_address:req.body>email_address
	  	}

	  	const updatedOrder = await order.save()
	  	res.json(updatedOrder)
	  }else{
	  	res.status(404)
	  	throw new Error("Order not found")
	  }
})


//description Update order to delivered
//router      GET /api/orders/:id/deliver
//access      Private/Admin

export const updateOrderToDelivered = asyncHandler(async (req, res)=>{
	  const order = await Order.findById(req.params.id) 
	  //console.log(order)

	  if(order){

	  	order.isDelivered =  true
	  	order.deliveredAt = Date.now()
	  
	  	const updatedOrder = await order.save()
	  	res.json(updatedOrder)

	  }else{
	  	res.status(404)
	  	throw new Error("Order not found")
	  }
})
//description get logged in user orders list
//router      GET /api/orders/myorders 
//access      Private

export const getMyOrders = asyncHandler(async (req, res)=>{
	  const orders = await Order.find({ user: req.user._id })

	  console.log("List of My Orders")
	  console.log(orders)
	  
	  res.json(orders) 
})



//description get All  orders list
//router      GET /api/orders/
//access      Private/Admin

export const getAllOrders = asyncHandler(async (req, res)=>{
	  const orders = await Order.find({}).populate('user', 'id name')

	  console.log("List of My Orders")
	  console.log(orders)
	  
	  res.json(orders) 
})

