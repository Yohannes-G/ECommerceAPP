import {USER_LOGIN_REQUEST,
		USER_LOGIN_SUCCESS,
		USER_LOGIN_FAIL,
		USER_LOGOUT,
 
		USER_REGISTER_REQUEST,
		USER_REGISTER_SUCCESS,
		USER_REGISTER_FAIL, 


		USER_DETAILS_REQUEST,
		USER_DETAILS_SUCCESS,
		USER_DETAILS_FAIL, 
		USER_DETAILS_RESET,

		USER_UPDATE_PROFILE_REQUEST,
		USER_UPDATE_PROFILE_SUCCESS,
		USER_UPDATE_PROFILE_FAIL,
		//USER_UPDATE_PROFILE_RESET,


		 USER_LIST_REQUEST,
		 USER_LIST_SUCCESS,
		 USER_LIST_FAIL,
		 USER_LIST_RESET,


		 USER_DELETE_REQUEST,
		 USER_DELETE_SUCCESS,
		 USER_DELETE_FAIL,

		 USER_UPDATE_REQUEST , 
		 USER_UPDATE_SUCCESS,  
		 USER_UPDATE_FAIL ,
		 

		} from "../constants/userConstants"
import axios from 'axios'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password)=>async (dispatch)=>{
	try{
		dispatch({
			type:USER_LOGIN_REQUEST
		})

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const { data } = await axios.post('/api/users/login', 
											{email, password},
											 config)
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		})

		localStorage.setItem('userInfo', JSON.stringify(data))

	}catch(error){
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}

export const logout = () =>(dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({type:USER_LOGOUT})
	dispatch({type:USER_DETAILS_RESET})
	dispatch({type:ORDER_LIST_MY_RESET})
	dispatch({type:USER_LIST_RESET})
}


export const register = (name,email, password)=>async (dispatch)=>{
	try{
		dispatch({
			type:USER_REGISTER_REQUEST
		})

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const { data } = await axios.post('/api/users', 
											{name, email, password},
											 config)
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		})


		localStorage.setItem('userInfo', JSON.stringify(data))

	}catch(error){
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}

//will have the users detail info by taking ID as argument
export const getUserDetails = (id)=>async (dispatch, getState)=>{
	try{
		dispatch({
			type:USER_DETAILS_REQUEST
		})

		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get(`/api/users/${id}`,config)
		
	//	console.log("getUserDetails.....................data")
	//	console.log(data)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data
		})
 
	}catch(error){
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}

//will have the entire user info as an argument
export const updateUserProfile = (user)=>async (dispatch, getState)=>{
	try{
		dispatch({
			type:USER_UPDATE_PROFILE_REQUEST
		})

		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
	//	console.log('update...........................userprofile action')
	//	console.log(userInfo)
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		//console.log('Hello......... updateuserprofile action /api/users/profile 1')
		//console.log(user)

		//here adding the user object to be updated
		const { data } = await axios.put(`/api/users/profile`,user, config)
		//console.log('Hello.......................... /api/users/profile 2')

	 	dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
 
	}catch(error){
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}


//will have the entire user info as an argument
export const listUsers = ()=>async (dispatch, getState)=>{
	try{
		dispatch({
			type:USER_LIST_REQUEST
		})

		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
	//	console.log('update...........................userprofile action')
	//	console.log(userInfo)
		const config = {
			headers: {
		 
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		//console.log('Hello......... updateuserprofile action /api/users/profile 1')
		//console.log(user)

		//here adding the user object to be updated
		const { data } = await axios.get(`/api/users`, config)
		//console.log('Hello.......................... /api/users/profile 2')

	 	dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		})
 
	}catch(error){
		dispatch({
			type: USER_LIST_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}



//will have the entire user info as an argument
export const deleteUser = (id)=>async (dispatch, getState)=>{
	try{
		dispatch({
			type:USER_DELETE_REQUEST
		})

		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
	//	console.log('update...........................userprofile action')
	//	console.log(userInfo)
		const config = {
			headers: {
		 
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		//console.log('Hello......... updateuserprofile action /api/users/profile 1')
		//console.log(user)

		//here adding the user object to be updated
		const { data } = await axios.delete(`/api/users/${id}`, config)
		//console.log('Hello.......................... /api/users/profile 2')

	 	dispatch({
			type: USER_DELETE_SUCCESS,

		})
 
	}catch(error){
		dispatch({
			type: USER_DELETE_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}



//will have the entire user info as an argument
export const updateUser = (user)=>async (dispatch, getState)=>{
	try{
		dispatch({
			type:USER_UPDATE_REQUEST
		})

		//this is  used to access the login user info
		const { userLogin: { userInfo }} = getState()//will pull out login states  
	//	console.log('update...........................userprofile action')
	//	console.log(userInfo)
		const config = {
			headers: {
		 		'Content-Type':'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		}
		//console.log('Hello......... updateuserprofile action /api/users/profile 1')
		//console.log(user)

		//here adding the user object to be updated
		const { data } = await axios.put(`/api/users/${user._id}`,user, config)
		//console.log('Hello.......................... /api/users/profile 2')

	 	dispatch({
			type: USER_UPDATE_SUCCESS,

		})
		dispatch({
			type: USER_DETAILS_SUCCESS, payload:data

		})
		
 
	}catch(error){
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? 
					 error.response.data.message :
					 error.message
		})
	}
}



