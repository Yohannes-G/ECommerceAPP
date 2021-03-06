import React, {useState, useEffect} from 'react';
import {Table,Form, Button, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderAction'

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

	 
 	//reducer variable is userLogin
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
 

 	//reducer variable is userUpdateProfile
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile
 	//console.log("hello") 	


	//reducer variable is userDetails
	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading:loadingOrders, error:errorOrders, orders} = orderListMy
	console.log("Order My List ....................on ProfileScreen")
	console.log(loadingOrders)
	console.log(orders)
	
	useEffect(()=>{
//			console.log("hello1")
		if(!userInfo){
			history.push('/login')
				
		}else
		{
			//console.log(user)
			if(!user.name){
				dispatch(getUserDetails('profile'))
				dispatch(listMyOrders())
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
					{loadingOrders ? 
							<Loader /> :
								errorOrders ? 
									<Message variant='danger'>{errorOrders}</Message>:(
											<Table striped bordered hover responsive className='table-sm'>
												<thead>
													<tr>
														<th>
															ID
														</th>
														<th>
															DATE
														</th>
														<th>
															TOTAL
														</th>
														<th>
															PAID
														</th>
														<th>
															DELIVERED
														</th>
														<th>
															
														</th>
													</tr>
												</thead>
												<tbody>
													{orders.map(order  => (
															<tr key={order._id}>
																<td>{order._id}</td>
																<td>{order.createdAt.substring(0, 10)}</td>
																<td>{order.totalPrice}</td>
																<td>{order.isPaid ? order.paidAt.substring(0 ,10):(
																	<i className='fas fa-times' style={{color: 'red'}}></i>
																	)}</td>
																<td>{order.isDelivered ? order.deliveredAt.substring(0 ,10):(
																	<i className='fas fa-times' style={{color: 'red'}}></i>
																	)}</td>
																<td>
																	<LinkContainer to={`/order/${order._id}`}>
																		<Button className='btn-sm' variant='light'> Details </Button>
																	</LinkContainer>
																</td>
																
															</tr>
														))}
												</tbody>	

											</Table>
										)}
				</Col>
			</Row>
		 )
	
}
export { ProfileScreen }