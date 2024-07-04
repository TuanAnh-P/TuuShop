import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
	// State for managing payment method
	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Selecting shipping address from Redux store
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	// Redirect to shipping screen if shipping address is not available
	useEffect(() => {
		if (!shippingAddress) {
			navigate('/shipping');
		}
	}, [shippingAddress, navigate]);

	// Handle form submission
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod)); // Dispatch action to save payment method
		navigate('/placeorder'); // Navigate to place order screen
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 /> {/* Checkout steps component */}
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							className='my-2'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method state
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
