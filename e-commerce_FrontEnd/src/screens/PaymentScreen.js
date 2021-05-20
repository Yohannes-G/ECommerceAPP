import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {CheckoutSteps} from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartAction'
//the props.history is used to redirect from shipping to payment
export const PaymentScreen = ({history}) => {

	const cart = useSelector(state => state.cart)
	const { shippingAddress } = cart
	
	if(!shippingAddress){
		history.push('/shipping')
	}

	 const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod)
	 
	const dispatch = useDispatch()

const submitHandler =(event)=>{
	event.preventDefault() //used on form submission
	dispatch(savePaymentMethod(paymentMethod))
	history.push('/placeorder')

}
	return (

			<FormContainer>
			<CheckoutSteps step1 step3 />
				<h1>
					Payment Method
				</h1>
			  <Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as = 'legend'>
						Select Method
					</Form.Label>
				
				<Col>
					<Form.Check type='radio' 
								label='Paypal or Credit Card'
								id='Paypal'
								name='paymentMethod'
								value='Paypal'
								checked 
								onChange={(event) => setPaymentMethod(event.target.value)}>
						
					</Form.Check>
					<Form.Check type='radio' 
								label='CBE Birr'
								id='CBE'
								name='paymentMethod'
								value='CBE'
							 
								onChange={(event) => setPaymentMethod(event.target.value)}>
						
					</Form.Check>
					<Form.Check type='radio' 
								label='teleBirr'
								id='teleBirr'
								name='paymentMethod'
								value='teleBirr'
						
								onChange={(event) => setPaymentMethod(event.target.value)}>
						
					</Form.Check>
				</Col>						
				</Form.Group>
				
				<Button type='submit' variant='primary'>
					Continue
				</Button>

			  </Form>
			</FormContainer>
		);
	}
