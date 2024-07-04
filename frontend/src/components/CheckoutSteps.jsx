import React from 'react';
// Import Nav component from react-bootstrap
import { Nav } from 'react-bootstrap';
// Import Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';

// Define a functional component for checkout steps
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		// Create a navigation bar with centered items and a bottom margin
		<Nav className='justify-content-center mb-4'>
			{/* Step 1: Sign In */}
			<Nav.Item>
				{step1 ? (
					// If step1 is true, provide a link to the login page
					<Nav.Link as={Link} to='/login'>
						Sign In
					</Nav.Link>
				) : (
					// If step1 is false, disable the link
					<Nav.Link disabled>Sign In</Nav.Link>
				)}
			</Nav.Item>

			{/* Step 2: Shipping */}
			<Nav.Item>
				{step2 ? (
					// If step2 is true, provide a link to the shipping page
					<Nav.Link as={Link} to='/shipping'>
						Shipping
					</Nav.Link>
				) : (
					// If step2 is false, disable the link
					<Nav.Link disabled>Shipping</Nav.Link>
				)}
			</Nav.Item>

			{/* Step 3: Payment */}
			<Nav.Item>
				{step3 ? (
					// If step3 is true, provide a link to the payment page
					<Nav.Link as={Link} to='/payment'>
						Payment
					</Nav.Link>
				) : (
					// If step3 is false, disable the link
					<Nav.Link disabled>Payment</Nav.Link>
				)}
			</Nav.Item>

			{/* Step 4: Place Order */}
			<Nav.Item>
				{step4 ? (
					// If step4 is true, provide a link to the place order page
					<Nav.Link as={Link} to='/placeorder'>
						Place Order
					</Nav.Link>
				) : (
					// If step4 is false, disable the link
					<Nav.Link disabled>Place Order</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

// Export the CheckoutSteps component as default
export default CheckoutSteps;
