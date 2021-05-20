import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {CheckoutSteps} from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartAction'
//the props.history is used to redirect from shipping to payment
export const ShippingScreen = ({history}) => {

	const cart = useSelector(state => state.cart)
	console.log("hello ShippingScreen")
	console.log(cart)
	const { shippingAddress } = cart
	console.log(shippingAddress)

	 const [address, setAddress] = useState(shippingAddress.address)
	 const [city, setCity] = useState(shippingAddress.city)
	 const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	 const [country, setCountry] = useState(shippingAddress.country)
	

	const dispatch = useDispatch()

const submitHandler =(event)=>{
	event.preventDefault() //used on form submission
	dispatch(saveShippingAddress({ address, city, postalCode, country }))
	history.push('/payment')

}
	return (

			<FormContainer>
			<CheckoutSteps step1 step2 step3 />
				<h1>
					Shipping
				</h1>
				<Form onSubmit={submitHandler}>
						<Form.Group controlId='address'>
						<Form.Label>Address</Form.Label>
						<Form.Control type='text'
									   placeholder='Enter address'
									    value={address}
									    required
									   onChange={(event)=> setAddress(event.target.value)}>
						</Form.Control>
						</Form.Group>
 
	    				<Form.Group controlId='city'>
						<Form.Label>City</Form.Label>
						<Form.Control type='city'
									   placeholder='Enter city'
									    value={city}
									    required
									   onChange={(event)=> setCity(event.target.value)}>
						</Form.Control>
						</Form.Group>


    					<Form.Group controlId='postalCode'>
						<Form.Label>PostalCode</Form.Label>
						<Form.Control type='postalCode'
									   placeholder='Enter postalCode'
									    value={postalCode}
									    required
									   onChange={(event)=> setPostalCode(event.target.value)}>
						</Form.Control>
						</Form.Group>


						<Form.Group controlId='country'>
						<Form.Label>Country</Form.Label>
						<Form.Control type='country'
									   placeholder='Enter country'
									    value={country}
									    required
									   onChange={(event)=> setCountry(event.target.value)}>
						</Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Continue
						</Button>

				 </Form>
			</FormContainer>
		);
	}
