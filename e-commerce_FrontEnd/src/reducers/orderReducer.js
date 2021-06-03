import {

 ORDER_CREATE_REQUEST,  
 ORDER_CREATE_SUCCESS,  
 ORDER_CREATE_FAIL,

 ORDER_DETAILS_REQUEST,  
 ORDER_DETAILS_SUCCESS,  
 ORDER_DETAILS_FAIL,

 ORDER_PAY_REQUEST,  
 ORDER_PAY_SUCCESS,  
 ORDER_PAY_FAIL,
 ORDER_PAY_RESET,

 ORDER_LIST_MY_REQUEST,
 ORDER_LIST_MY_SUCCESS,
 ORDER_LIST_MY_FAIL,
 ORDER_LIST_MY_RESET,



 ORDER_LIST_REQUEST,
 ORDER_LIST_SUCCESS, 
 ORDER_LIST_FAIL, 
  

 ORDER_DELIVERE_REQUEST,
 ORDER_DELIVERE_SUCCESS,
 ORDER_DELIVERE_FAIL,
 ORDER_DELIVERE_RESET,




} from '../constants/orderConstants'

export const orderCreateReducer=(state={}, action)=>{
	//console.log('Hello orderCreateReducer 1...................')
	//console.log(state)
	//console.log('Hello orderCreateReducer 2...................')
	switch(action.type){ 
		case ORDER_CREATE_REQUEST:
			return {
				loading:true
			}
		case ORDER_CREATE_SUCCESS:
					/*console.log('Hello orderCreateReducer success 3...................')
					console.log(state)
					console.log('Hello orderCreateReducer 4...................')*/
					return {
				loading:false,
				success:true,
				order:action.payload,
			}
		case ORDER_CREATE_FAIL:
					//console.log('Hello orderCreateReducer  fail3...................')
					//console.log(state)
					//console.log('Hello orderCreateReducer 4...................')
					return {
				loading:false,
				error:action.payload,
			}
		default:
			return state

	}
	
}


export const orderDetailsReducer=(state={ loading:true, orderItems: [], shippingAddress: {}}, action)=>{
	//console.log('Hello orderCreateReducer 1...................')
	//console.log(state)
	//console.log('Hello orderDETAILSReducer 2...................')
	switch(action.type){ 
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading:true
			}
		case ORDER_DETAILS_SUCCESS:
					/*console.log('Hello orderDETAILSReducer success 3...................')
					console.log(state)
					console.log('Hello orderDETAILSReducer 4...................')*/
					return {
				loading:false,
				order:action.payload,
			}
		case ORDER_DETAILS_FAIL:
					//console.log('Hello orderDETAILSReducer  fail3...................')
					//console.log(state)
					//console.log('Hello orderDETAILSReducer 4...................')
					return {
				loading:false,
				error:action.payload,
			}
		default:
			return state

	}
	
}


export const orderPayReducer=(state={ }, action)=>{
	//console.log('Hello orderCreateReducer 1...................')
	//console.log(state)
	//console.log('Hello orderDETAILSReducer 2...................')
	switch(action.type){ 
		case ORDER_PAY_REQUEST:
			return {
			 
				loading:true
			}
		case ORDER_PAY_SUCCESS:

			return {
				loading:false,
				success:true,
			}
		case ORDER_PAY_FAIL:
					 					
			return {
				loading:false,
				error:action.payload,
			}
		case ORDER_PAY_RESET:
			return {}
		default:
			return state

	}
	
}


export const orderDeliverReducer=(state={ }, action)=>{
	//console.log('Hello orderCreateReducer 1...................')
	//console.log(state)
	//console.log('Hello orderDETAILSReducer 2...................')
	switch(action.type){ 
		case ORDER_DELIVERE_REQUEST:
			return {
			 
				loading:true
			}
		case ORDER_DELIVERE_SUCCESS:

			return {
				loading:false,
				success:true,
			}
		case ORDER_DELIVERE_FAIL:
					 					
			return {
				loading:false,
				error:action.payload,
			}
		case ORDER_DELIVERE_RESET:
			return {}
		default:
			return state

	}
	
}


export const orderListMyReducer=(state={ orders:[] }, action)=>{
	 
	 	switch(action.type){ 
		case ORDER_LIST_MY_REQUEST:
			return {
			 
				loading:true
			}
		case ORDER_LIST_MY_SUCCESS:

			return {
				loading:false,
				orders:action.payload,
			}
		case ORDER_LIST_MY_FAIL:
					 					
			return {
				loading:false,
				error:action.payload,
			}
		 case ORDER_LIST_MY_RESET:
		 return { orders:[] }
		default:
			return state

	}
	
}
 

export const orderListReducer=(state={ orders:[] }, action)=>{
	 	console.log(state)
	 	switch(action.type){ 
		case ORDER_LIST_REQUEST:
			return {
			 	 
				loading:true
			}
		case ORDER_LIST_SUCCESS:

			return {
				loading:false,
				orders:action.payload,
			}
		case ORDER_LIST_FAIL:
					 					
			return {
				loading:false,
				error:action.payload,
			}
		default:
			return state

	}
	
}
 