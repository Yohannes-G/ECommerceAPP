import React, {useState, useEffect } from 'react'
import {Row, Col, Card, Image, ListGroup, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listProductDetails } from '../actions/productAction'
//import axios from 'axios'


const ProductScreen = ({history, match}) =>{//props.history or props.match
	const [quantity,setQuantity] = useState(1) //set number of product
	 
	//const [product, setProduct] = useState({})
	const dispatch = useDispatch() //used to send away the actions

	const productDetails = useSelector((state) => state.productDetails)
	const {loading, error, product} = productDetails
	//console.log(productDetails)

	useEffect(()=>{
	/*	const fetchProduct = async() =>{
			const { data } = await axios(`/api/products/${match.params.id}`)

			setProduct(data)
		}

		fetchProduct()*/
		dispatch( listProductDetails(match.params.id) )
	}, [dispatch, match]) 

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?quantity=${quantity}`)
	}


	return  <>
				<Link className='btn btn-light my-3' to = '/'>Go Back</Link>
				{loading ? 
					<Loader/>: error ?
					<Message variant='danger'>{error}</Message>:
					(
						<Row>
							<Col md={6}>
								<Image src={product.image} alt={product.name} fluid/>
							</Col>
							<Col md={3}>
								<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating 
										value = {product.rating}
										text = {`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									Price: ${product.price}
								</ListGroup.Item>
								<ListGroup.Item>
									Description: ${product.description}
								</ListGroup.Item>

								</ListGroup>
							</Col>
							<Col md={3}>
								<Card>
									<ListGroup variant='flush'>
										<ListGroup.Item>
											<Row>
												<Col>
													Price:
												</Col>
												<Col>
													<strong>${product.price}</strong>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>
													Price:
												</Col>
												<Col>
												 {product.countInStockkey > 0 ? 'In Stock' : 'Out Of Stock'}
												</Col>
											</Row>
										</ListGroup.Item>
										
										{product.countInStockkey > 0 && (
											<ListGroup.Item>
												<Row>
													<Col>Quantity</Col>

													<Col>
														<Form.Control as='select' value={quantity} 
																	  onChange={(event)=>setQuantity(event.target.value)}>

																	 {
																	 	[...Array(product.countInStockkey).keys()].map((x) => (  //javascript for setting product in stock as option 
																	  	<option key={x+1} value={x+1}>  {x+1}  </option>
																	  	))
																	 } 
																	  
														</Form.Control>
													</Col>

												</Row>

											</ListGroup.Item>  
											)}

										<ListGroup.Item>
											 <Button 
											 		onClick = {addToCartHandler}
											 		className='btn-block' 
											 		 type='button' 
											 		 disabled={product.countInStockkey === 0 }>
											 	Add To Cart
											 </Button>
										</ListGroup.Item>
									</ListGroup>
								</Card>
								
							</Col>
						</Row>
					)}
				
			</>


}
export default ProductScreen;