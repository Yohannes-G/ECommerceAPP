import React, { useEffect } from 'react';
import '../index.css'   
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'


export const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id
	//const hello = "Hello CartScreen"
	//const owkay = "This is new Condition cart"
	//console.log(hello)
	//console.log(productId)
	const quantity = location.search ? Number(location.search.split('=')[1]) : 1
	//console.log(location.search)
	//console.log(quantity)

	const dispatch = useDispatch()

	const cart = useSelector((state)=> state.cart)
	const {cartItems} = cart
	//console.log(owkay)
	//console.log(cart)
	//console.log(cartItems)

	useEffect(() => {
		if(productId){
			dispatch(addToCart(productId, quantity))
		}
	},[dispatch, productId, quantity])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		//console.log('checkout')
		history.push('/login?redirect=shipping')
	}
		return (
			<Row>
				 
				<Col md={8}>
					<h1>Shopping Cart</h1>
					{cartItems.length === 0 ? (
						<Message>Your cart is empty
							<Link to='/'>Go Back</Link>
						</Message>	) : (
							
							<ListGroup variant='flush'>
										<Row >
												<Card>
													<ListGroup variant='flush' className="colSub">
														<ListGroup.Item>
															<h2 className="H2">
																Subtotal({cartItems.reduce((accumulator, currentItem)=>accumulator + currentItem.quantity, 0)}) items
															</h2>
															${cartItems
																.reduce((accumulator, currentItem) => accumulator + currentItem.quantity*currentItem.price, 0)
																.toFixed(2)
															}
															
														</ListGroup.Item>
														<ListGroup.Item >
															<Button 
																type='button'
																className='btn-block'
																disabled={cartItems.length===0}
																onClick={checkoutHandler}>

																Proceed To Checkout
																
															</Button>
														</ListGroup.Item>
													</ListGroup>
												</Card>
											</Row>
								{cartItems.map(item => (
									<ListGroup.Item key={item.product}>
										<Row>
											<Col  >
												<Image src={item.image} alt={item.name} fluid rounded />
											</Col>

											<Col  >
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</Col>

											<Col  >${item.price}</Col>

											<Col  >
												<Form.Control as='select' value={item.quantity} 
																	  onChange={(event)=>dispatch(addToCart(item.product, Number(event.target.value)))}>

																	 {
																	 	[...Array(item.countInStockkey).keys()].map((x) => (  //javascript for setting product in stock as option 
																	  	<option key={x+1} value={x+1}>{x+1}  </option>
																	  	))
																	 } 
																	  
														</Form.Control>
											</Col>

											<Col>
												<Button 
													type='button'
													variant='light'
													onClick={() => removeFromCartHandler(item.product)}>
														<i className='fas fa-trash'></i>
												</Button>
											</Col>

											
											
										</Row>
									</ListGroup.Item>

									 ))}
							</ListGroup>
						)}
				</Col>
				<Col md={2}></Col>
				<Col md={2}></Col>
			
			</Row>
		);
	}

