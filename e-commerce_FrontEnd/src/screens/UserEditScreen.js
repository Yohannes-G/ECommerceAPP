import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {Form, Button } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails,updateUser } from '../actions/userAction'
import {USER_UPDATE_RESET} from '../constants/userConstants'

const  UserEditScreen =({ match ,history })=> { //we pass match since i need to store the is in variable
	const userId = match.params.id//The ID That Comes from URL

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const dispatch = useDispatch()

	const userDetails = useSelector(state => state.userDetails)
	const { loading, error, user } = userDetails


	const userUpdate = useSelector(state => state.userUpdate)
	const { loading:loadingUpdate, 
			error:errorUpdate, 
			success:successUpdate } = userUpdate

 
 	//we are going to fire off the action using useEffect
	useEffect(()=>{
		if(successUpdate){
			dispatch({type: USER_UPDATE_RESET})
			history.push('/admin/userlist')
		}else{

			if(!user.name || user._id !== userId){
		 	 dispatch(getUserDetails(userId))
		 }else{
		 	setName(user.name)
		 	setEmail(user.email)
		 	setIsAdmin(user.isAdmin)
		 }
		}
		 
	},[dispatch,history,user, userId,successUpdate])

	const submitHandler = (event) =>{
		event.preventDefault()
		dispatch(updateUser({_id:userId, name, email, isAdmin }))
		 
	}
	 
		return (
			<>
				<Link to='/admin/userlist' classname='btn btn-light my-3'>
					Go Back
				</Link>
				<FormContainer>
				<h1> Edit User </h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				 
				 {loading ? 
				 	<Loader/>:
				 		error ? 
				 			<Message variant='danger' >{error}</Message>:
						 		(
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

											<Form.Group controlId='isAdmin'>
											<Form.Check    
													   type='checkbox'
													   label='Is Admin'
													   checked={isAdmin}
													   onChange={(event)=> setIsAdmin(event.target.checked)}>
											</Form.Check>
										</Form.Group>
 

										<Button type='submit' variant='primary'>
											Update
										</Button>
									</Form>
								)}
				
 
				</FormContainer>
			</>
			
		 )
	
}
export {UserEditScreen}