 import React, { /*useState,*/ useEffect } from 'react';
 import {Row, Col} from 'react-bootstrap'
 import Product from '../components/Product'
 import Message from '../components/Message'
 import Loader from '../components/Loader'
 
 import products from '../products'
 import { listProducts } from '../actions/productAction'
 import {useSelector, useDispatch} from 'react-redux'
// import axios from 'axios'

 const HomeScreen=()=>{
 	
 //	const [products, setProducts] = useState([])
 const dispatch = useDispatch() // to send away the productlist action
 
 const productList = useSelector(state=>state.productList)
 const { loading, error, products } = productList //extracting loading , error and products from productlist store

 	useEffect(()=>{
 /*		console.log('whats up')
 		const fetchProducts = async() =>{
 			const { data } = await axios.get("/api/products")

 			setProducts(data)
 		}

 		fetchProducts()*/
 		dispatch(listProducts())
 	
 	}, [dispatch])//for dependency error

  

 	return (

 		<>
 			<h1>Latest Products</h1>
 			{loading ? <Loader/> :
 					    error ?
 					     <Message variant='danger'>{error}</Message>:
 					     <Row>
 							{products.map(product=>(
	 							<Col key={product._id}sm={12} md={6} lg={4} xl={3}>
	 								<Product product={product}/>
	 							</Col>

 							))}

 						 </Row>

 					 }
 			
 		</> 

 		)
 }
 export default HomeScreen;