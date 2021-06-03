 import React, { useEffect } from 'react';
 import {useSelector, useDispatch} from 'react-redux'
 import { Link } from 'react-router-dom'
 import {Row, Col} from 'react-bootstrap'
 import Product from '../components/Product'
 import Message from '../components/Message'
 import Loader from '../components/Loader'
 import {Paginate} from '../components/Paginate'
 import {MetaHelmet} from '../components/MetaHelmet'
 import {ProductCarousel} from '../components/ProductCarousel'
 import { listProducts } from '../actions/productAction'

// import axios from 'axios'

 const HomeScreen=({ match })=>{
 	const keyword = match.params.keyword
 	const pageNumber = match.params.pageNumber || 1

	 //	const [products, setProducts] = useState([])
	const dispatch = useDispatch() // to send away the productlist action
	 
    const productList = useSelector(state=>state.productList)
    const { loading, error, products, page, pages } = productList //extracting loading , error and products from productlist store

 	useEffect(()=>{
 /*		console.log('whats up')
 		const fetchProducts = async() =>{
 			const { data } = await axios.get("/api/products")

 			setProducts(data)
 		}

 		fetchProducts()*/
 		dispatch(listProducts(keyword, pageNumber))
 	
 	}, [dispatch, keyword, pageNumber])//for dependency error

  

 	return (

 		<>
 		
 		<MetaHelmet />

 		{!keyword ? (<ProductCarousel /> ):(<Link to='/' className='btn btn-light'>Go Back</Link>)}
 			<h1>Latest Products</h1>
 			{loading ? <Loader/> :
 					    error ?
 					     <Message variant='danger'>{error}</Message>:(
 					     <>
 					     <Row>
 							{products.map(product=>(
	 							<Col key={product._id}sm={12} md={6} lg={4} xl={3}>
	 								<Product product={product}/>
	 							</Col>

 							))}

 						 </Row>
 						 <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
 						 </>

 					 )}
 			
 		</> 

 		)
 }
 export default HomeScreen;