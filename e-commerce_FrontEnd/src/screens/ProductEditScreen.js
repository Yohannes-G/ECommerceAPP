import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Form, Button } from 'react-bootstrap'	
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, 
		 updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'
const  ProductEditScreen =({ match ,history })=> { //we pass match since i need to store the is in variable
	const productId = match.params.id//The ID That Comes from URL

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState('')//we can make 0 but can also be empyty string
	const [description, setDescription] = useState('')
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	const productDetails = useSelector(state => state.productDetails)
	const { loading, error, product } = productDetails
 	

	const productUpdate = useSelector(state => state.productUpdate)
	const { loading:loadingUpdate, 
			error:errorUpdate, 
			success:successUpdate } = productUpdate
 
 	//we are going to fire off the action using useEffect
	useEffect(()=>{
		
		if(successUpdate){
			dispatch({ type: PRODUCT_UPDATE_RESET })
			history.push('/productlist')
		}else{
			if(!product.name || product._id !== productId){
		 	 dispatch(listProductDetails(productId))
		
		 }else{

		 	setName(product.name)
		 	setPrice(product.price)
		 	setImage(product.image)
		 	setBrand(product.brand)
		 	setCategory(product.category)
		 	setCountInStock(product.countInStock)
		 	setDescription(product.description)
		 	 
		 }
		
		}
	},[dispatch,history,product, productId, successUpdate])

	const uploadFileHandler = async (event)=>{
		const file = event.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)
			try{
				const config = {
					headers: {
						'Content-Type':'multipart/form-data',
					},
				}
				const {data} = await axios.post('/api/upload', formData, config)
				setImage(data)
				setUploading(false)
			}catch{
				console.error(error)
				setUploading(false)
			}
	}

	const submitHandler = (event) =>{
		 //UPDATE PRODUCT
		 event.preventDefault()
		 dispatch(
		 	updateProduct({
			 	_id: productId,
			 	name,
			 	price,
			 	image,
			 	brand,
			 	category,
			 	description,
			 	countInStock,
		 }))
	}
	 
		return (
			<>
				<Link to='/admin/productlist' className='btn btn-light my-3'>
					Go Back
				</Link>
				<FormContainer>
				<h1> Edit PRODUCT </h1>
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

										<Form.Group controlId='price'>
											<Form.Label>Price</Form.Label>
											<Form.Control type='number'
														   placeholder='Enter Price'
														    value={price}
														   onChange={(event)=> setPrice(event.target.value)}>
											</Form.Control>
											</Form.Group>

											<Form.Group controlId='image'>
											<Form.Label>Image</Form.Label>
											<Form.Control type='text'
														   placeholder='Enter Image URL'
														    value={image}
														   onChange={(event)=> setImage(event.target.value)}>
											</Form.Control>
											<Form.File id='image-file'
														label='Choose File'
														custom
														onChange={uploadFileHandler}>
											</Form.File>
											{uploading && <Loader />}
											</Form.Group>


											<Form.Group controlId='brand'>
											<Form.Label>Brand</Form.Label>
											<Form.Control type='text'
														   placeholder='Enter Brand'
														   value={brand}
														   onChange={(event)=> setBrand(event.target.value)}>
											</Form.Control>
											</Form.Group>
 
 											
											<Form.Group controlId='countInStock'>
											<Form.Label>CountInStock</Form.Label>
											<Form.Control type='number'
														   placeholder='Enter CountInStock'
														   value={countInStock}
														   onChange={(event)=> setCountInStock(event.target.value)}>
											</Form.Control>
											</Form.Group>


 											
											<Form.Group controlId='category'>
											<Form.Label>Category</Form.Label>
											<Form.Control type='text'
														   placeholder='Enter Category'
														   value={category}
														   onChange={(event)=> setCategory(event.target.value)}>
											</Form.Control>
											</Form.Group>
 
 
											<Form.Group controlId='description'>
											<Form.Label>Description</Form.Label>
											<Form.Control type='text'
														   placeholder='Enter Description'
														   value={description}
														   onChange={(event)=> setDescription(event.target.value)}>
											</Form.Control>
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
export {ProductEditScreen}