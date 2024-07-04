// Import necessary components from react-bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// Define a functional component for the footer
const Footer = () => {
	// Get the current year
	const currentYear = new Date().getFullYear();

	return (
		// Render the footer element
		<footer>
			<Container>
				<Row>
					{/* Center the text and add padding */}
					<Col className='text-center py-3'>
						{/* Display the footer text with the current year */}
						<p>TuuShop &copy; {currentYear}</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

// Export the Footer component as default
export default Footer;
