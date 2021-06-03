import  { ORDER_CREATE_REQUEST,  
		  ORDER_CREATE_SUCCESS,  
		  ORDER_CREATE_FAIL,


		 ORDER_DETAILS_REQUEST,  
		 ORDER_DETAILS_SUCCESS,  
		 ORDER_DETAILS_FAIL,


		 ORDER_PAY_REQUEST,  
		 ORDER_PAY_SUCCESS,  
		 ORDER_PAY_FAIL,
		// ORDER_PAY_RESET,


		 ORDER_LIST_MY_REQUEST,
		 ORDER_LIST_MY_SUCCESS,
		 ORDER_LIST_MY_FAIL,


		 ORDER_LIST_REQUEST,
		 ORDER_LIST_SUCCESS, 
		 ORDER_LIST_FAIL, 
		 

		 ORDER_DELIVERE_REQUEST,
		 ORDER_DELIVERE_SUCCESS,
		 ORDER_DELIVERE_FAIL,


} from '../constants/orderConstants'

import axios from 'axios'

//will have the entire user info as an argument
export const createOrder = (order)=>async (dispatch, getState)=>{
	try{
		dispatch({
			type:ORDER_CREATE_REQUEST,
		})
		//console.log("Hello OrderAction order 1*************************************")
		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
		//	console.log(userInfo	)
	 	//	console.log("Hello OrderAction 2****************************************")
		

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
	 	console.log("Hello OrderAction order 3*************************************")
	 	console.log(order)
	 	console.log("Hello OrderAction order 4*************************************")
		const { data } = await axios.post(`/api/orders`,order, config)

		//console.log("Hello OrderAction order 5*************************************")
	 	//console.log(data)
	 	//console.log("Hello OrderAction order 6*************************************")

	 	//if it is successful then action below will dispatch the data to the state(it means to the bis store)
	 	//then we will find it in the placeorderscreen useEffect function to route, when Place Order button pressed.
	 	dispatch({
			type:  ORDER_CREATE_SUCCESS,
			payload: data,
		}) 
 
	}catch(error){
		dispatch({	
			type:  ORDER_CREATE_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}



export const getOrderDetails = (id)=>async (dispatch, getState)=>{
	try{
		dispatch({
			type:ORDER_DETAILS_REQUEST,
		})
		//console.log("Hello OrderAction order 1*************************************")
		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
		//	console.log(userInfo	)
	 	//	console.log("Hello OrderAction 2****************************************")
		

		const config = {
			headers: {
				//since it is get reqeust we don need content type
				Authorization: `Bearer ${userInfo.token}`
			}
		}
	 	 
		console.log("Get order detals........................in order action")

	 	const { data } = await axios.get(`/api/orders/${id}`, config)
	 	console.log(data)
		//console.log("Hello OrderAction order 5*************************************")
	 	//console.log(data)
	 	//console.log("Hello OrderAction order 6*************************************")

	 	//if it is successful then action below will dispatch the data to the state(it means to the bis store)
	 	//then we will find it in the placeorderscreen useEffect function to route, when Place Order button pressed.
	 	dispatch({
			type:  ORDER_DETAILS_SUCCESS,
			payload: data,
		}) 
 
	}catch(error){
		dispatch({	
			type:  ORDER_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}




export const payOrder = (orderId, paymentResult) => async (dispatch, getState)=>{
	
	try{
		dispatch({
			type:ORDER_PAY_REQUEST,
		})
		//console.log("Hello OrderAction order 1*************************************")
		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
		//	console.log(userInfo	)
	 	//	console.log("Hello OrderAction 2****************************************")
		

		const config = {
			headers: {
					'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
	 	 
		console.log("Get order detals........................in order action")

	 	const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult ,config)
	 	console.log(data)
		//console.log("Hello OrderAction order 5*************************************")
	 	//console.log(data)
	 	//console.log("Hello OrderAction order 6*************************************")

	 	//if it is successful then action below will dispatch the data to the state(it means to the bis store)
	 	//then we will find it in the placeorderscreen useEffect function to route, when Place Order button pressed.
	 	dispatch({
			type:  ORDER_PAY_SUCCESS,
			payload: data,
		}) 
 
	}catch(error){
		dispatch({	
			type:  ORDER_PAY_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}


export const deliverOrder = (order) => async (dispatch, getState)=>{
	
	try{
		dispatch({
			type:ORDER_DELIVERE_REQUEST,
		})
		//console.log("Hello OrderAction order 1*************************************")
		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
		//	console.log(userInfo	)
	 	//	console.log("Hello OrderAction 2****************************************")
		

		const config = {
			headers: {
					//SINCE WE DON PASS ANY DATA ...REMOVE CONTENT TYPE
				Authorization: `Bearer ${userInfo.token}`
			}
		}
	 	 
		console.log("Get order detals........................in order action")

	 	const { data } = await axios.put(`/api/orders/${order._id}/deliver`,{},config)
	 	console.log(data)
		//console.log("Hello OrderAction order 5*************************************")
	 	//console.log(data)
	 	//console.log("Hello OrderAction order 6*************************************")

	 	//if it is successful then action below will dispatch the data to the state(it means to the bis store)
	 	//then we will find it in the placeorderscreen useEffect function to route, when Place Order button pressed.
	 	dispatch({
			type:  ORDER_DELIVERE_SUCCESS,
			payload: data,
		}) 
 
	}catch(error){
		dispatch({	
			type:  ORDER_DELIVERE_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}

export const listMyOrders = () => async (dispatch, getState)=>{
	
	try{
		dispatch({
			type:ORDER_LIST_MY_REQUEST,
		})
		//console.log("Hello OrderAction order 1*************************************")
		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
		//	console.log(userInfo	)
	 	//	console.log("Hello OrderAction 2****************************************")
		

		const config = {
			headers: {
				 
				Authorization: `Bearer ${userInfo.token}`
			}
		}
	 	 
		console.log("Get listmyorder........................in order action")

	 	const { data } = await axios.get(`/api/orders/myorders`,config)
	 	console.log(data)
	 
	 	 	dispatch({
			type:  ORDER_LIST_MY_SUCCESS,
			payload: data,
		}) 
 
	}catch(error){
		dispatch({	
			type:  ORDER_LIST_MY_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}


export const listOrders = () => async (dispatch, getState)=>{
	console.log("hello listorder action")
	try{
		dispatch({
			type:ORDER_LIST_REQUEST,
		})
		//console.log("Hello OrderAction order 1*************************************")
		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
		//	console.log(userInfo	)
	 	//	console.log("Hello OrderAction 2****************************************")
		

		const config = {
			headers: {
				 
				Authorization: `Bearer ${userInfo.token}`
			}
		}
	 	 
		console.log("Get listmyorder........................in order action")
		
	 	const { data } = await axios.get(`/api/orders`,config)
	 	console.log(data)
	 
	 	 	dispatch({
			type:  ORDER_LIST_SUCCESS,
			payload: data,
		}) 
 
	}catch(error){
		dispatch({	
			type:  ORDER_LIST_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}