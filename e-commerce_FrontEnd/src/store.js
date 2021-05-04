import { createStore , combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducer'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
})//list of reducers will be here

const initialState = { } //set of initial states

const middleware = [thunk]

const store = createStore(
							reducer,
							initialState, 
							composeWithDevTools(applyMiddleware(...middleware))) //the central store

export default store