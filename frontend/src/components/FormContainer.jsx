// Import necessary components from react-bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// Define a functional component for form container
const FormContainer = ({ children }) => {
	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col
					xs={12} // Set column size to 12 for extra small screens
					md={6} // Set column size to 6 for medium and larger screens
				>
					{/* Render the children components passed to FormContainer */}
					{children}
				</Col>
			</Row>
		</Container>
	);
};

// Export the FormContainer component as default
export default FormContainer;
