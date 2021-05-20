import  { ORDER_CREATE_REQUEST,  
		  ORDER_CREATE_SUCCESS,  
		  ORDER_CREATE_FAIL
} from '../constants/orderConstants'

import axios from 'axios'

//will have the entire user info as an argument
export const createOrder = (order)=>async (dispatch, getState)=>{
	try{
		dispatch({
			type:ORDER_CREATE_REQUEST,
		})
		console.log("Hello OrderAction order 1*************************************")
		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
			console.log(userInfo	)
	 		console.log("Hello OrderAction 2****************************************")
		

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

		console.log("Hello OrderAction order 5*************************************")
	 	console.log(data)
	 	console.log("Hello OrderAction order 6*************************************")

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