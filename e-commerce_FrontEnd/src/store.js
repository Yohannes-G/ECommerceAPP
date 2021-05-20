import { createStore , 
		 combineReducers,
		 applyMiddleware } from 'redux'
		 
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,
		 productDetailsReducer } from './reducers/productReducer'

import { cartReducer } from './reducers/cartReducer'

import { userLoginReducer, 
		 userRegisterReducer,
		 userDetailsReducer, 
		 userUpdateProfileReducer } from './reducers/userReducer'
import {orderCreateReducer} from './reducers/orderReducer.js'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer, 
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer, 
	orderCreate: orderCreateReducer,
})//list of reducers will be here
/*	console.log('userLogin')
	console.log(userLoginReducer)
	console.log('userRegister')
	console.log(userRegisterReducer)
	console.log('userDetails')
	console.log(userDetailsReducer)
	console.log('userUpdateProfile')
	console.log(userUpdateProfileReducer)
	console.log('orderCreate')
	console.log(orderCreateReducer)*/

var hello = "Hello Store1"
//console.log(hello)
//console.log(localStorage.getItem('cartItems'))

//get the cartitem from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(
		localStorage.getItem('cartItems')): []

//get the userinfo email and password from local storage
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
		localStorage.getItem('userInfo')): null


//get the user shippingAddress from local storage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(
		localStorage.getItem('shippingAddress')): {}

var hello = "Hello userInfoFromStorage"
//console.log(hello)
//console.log(userInfoFromStorage)

//store on initial state cartItems and UserInfo 
//If the user or shippingAddress or cart is showing undefined error check this out
const initialState = { 
				cart: {
					cartItems: cartItemsFromStorage,
					shippingAddress: {shippingAddressFromStorage}
					
					},
					userLogin: { userInfo: userInfoFromStorage },
				} //set of initial states 

var hello = "Hello Store2"
//console.log(hello)
//console.log(initialState.userLogin.userInfo)

const middleware = [thunk]

const store = createStore(
							reducer,
							initialState, 
							composeWithDevTools(applyMiddleware(...middleware))) //the central store

/*console.log(store)
console.log(reducer)
console.log(orderCreateReducer)*/
export default store