import { CART_ADD_ITEM,
	     CART_REMOVE_ITEM,
	     CART_SAVE_SHIPPING_ADDRESS,
	 	 CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants'


export const cartReducer = (state = {cartItems: [], shippingAddress: {} }, action) => {
	var hello = "Hello cartReducer1"
	//console.log(hello)
	//console.log(state.cartItems)
	switch(action.type){
		case CART_ADD_ITEM:
			const item = action.payload
			var hello = "Hello cartReducer2"
			//console.log(hello)
			//console.log(item)
			//console.log(hello)
			const existedItem = state.cartItems.find( varItem => 
													  varItem.product === 
													  item.product     )//checking new item added and previous varItem

			//console.log(existedItem)
			//console.log(hello)

			if(existedItem){
				return{
					...state,
					cartItems: state.cartItems.map( varItem =>
												    varItem.product ===
												    existedItem.product ? 
												    item : 
												    varItem
												    )
				}
			}else{ 
				return {
					...state, 
					cartItems: [...state.cartItems, item]
				}
			}
		case CART_REMOVE_ITEM:
			return {
				...state, 
				cartItems: state.cartItems.filter((x) => x.product !== action.payload)
			}

		case CART_SAVE_SHIPPING_ADDRESS:
			return{
				...state,
				shippingAddress: action.payload, //data of user address from the form submission
			}
		case CART_SAVE_PAYMENT_METHOD://this is current state for payment and can be destructured
			return{
				...state,
				paymentMethod: action.payload, //data of user address from the form submission
			}

		default:
			return state
	} 
}
