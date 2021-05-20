import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {Form, Button, Col, Row } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'

const  ProfileScreen =({ location, history })=> {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState(null)
 
	const dispatch = useDispatch()
	//reducer variable is userDetails
	const userDetails = useSelector((state) => state.userDetails)
	
	const { loading, error, user} = userDetails

	//console.log("hello")
	//console.log(userDetails)
 	//console.log(user)
 	//reducer variable is userLogin
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
 	//console.log("hello")

 	//reducer variable is userUpdateProfile
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile
 	//console.log("hello") 	

	useEffect(()=>{
//			console.log("hello1")
		if(!userInfo){
			history.push('/login')
				
		}else
		{
			//console.log(user)
			if(!user.name){
				dispatch(getUserDetails('profile'))
			}else{
				//will fill the form the previous user profile
				setName(user.name) 
				setEmail(user.email)
			}
		}
	},[dispatch, history, user,userInfo])
	//console.log("hello submitHandler...............................1")
	const submitHandler = (event) => {
		event.preventDefault()
		//Dispatch register
		//console.log("hello submitHandler..........................2")
		if(password !== confirmPassword){
			setMessage('Password do not match')
		}else{
			//DISPATCH UPDATE PROFILE
			console.log("hello submitHandler user.................3")
			//console.log(user)
			dispatch(updateUserProfile({ id: user._id, name, email,password}))
			//console.log("hello submitHandler user.................4")
		}
		
		 
	}
	 
		return ( 
			<Row>
				<Col md={3}>
					<h2> User Profile</h2>
				{message && <Message variant='danger' >{message}</Message>}
				{error && <Message variant='danger' >{error}</Message>}
				{success && <Message variant='success '> Profile Update </Message>}
				 {loading && <Loader />}
				<Form onSubmit={submitHandler}>

					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control type='name'
									   placeholder='Enter name'
									    value={name}
									   onChange={(event)=> setName(event.target.value)}>
						</Form.Control>
						</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control type='email'
									   placeholder='Enter email'
									    value={email}
									   onChange={(event)=> setEmail(event.target.value)}>
						</Form.Control>
						</Form.Group>

						<Form.Group controlId='password'>
						<Form.Label>Password Address</Form.Label>
						<Form.Control type='password'
									   placeholder='Enter Password'
									 	value={password}
									   onChange={(event)=> setPassword(event.target.value)}>
						</Form.Control>
					</Form.Group>


						<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password  </Form.Label>
						<Form.Control  type='Password'
									   placeholder='Confirm Password'
									   value={confirmPassword}
									   onChange={(event)=> setConfirmPassword(event.target.value)}>
						</Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>


				</Col>
				<Col md ={9}>
					<h2> My Orders </h2>
				</Col>
			</Row>
		 )
	
}
export { ProfileScreen }