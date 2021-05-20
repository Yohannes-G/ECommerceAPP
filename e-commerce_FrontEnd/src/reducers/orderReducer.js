import {
 ORDER_CREATE_REQUEST,  
 ORDER_CREATE_SUCCESS,  
 ORDER_CREATE_FAIL
} from '../constants/orderConstants'

export const orderCreateReducer=(state={}, action)=>{
	console.log('Hello orderCreateReducer 1...................')
	console.log(state)
	console.log('Hello orderCreateReducer 2...................')
	switch(action.type){ 
		case ORDER_CREATE_REQUEST:
			return {
				loading:true
			}
		case ORDER_CREATE_SUCCESS:
					console.log('Hello orderCreateReducer success 3...................')
					console.log(state)
					console.log('Hello orderCreateReducer 4...................')
					return {
				loading:false,
				success:true,
				order:action.payload,
			}
		case ORDER_CREATE_FAIL:
					console.log('Hello orderCreateReducer  fail3...................')
					console.log(state)
					console.log('Hello orderCreateReducer 4...................')
					return {
				loading:false,
				error:action.payload,
			}
		default:
			return state

	}
	
}