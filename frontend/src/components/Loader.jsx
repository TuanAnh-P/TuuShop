// Import Spinner component from react-bootstrap
import { Spinner } from 'react-bootstrap';

// Define a functional component for the loader
const Loader = () => {
	return (
		// Render a Spinner with specific styling
		<Spinner
			animation='border' // Set the animation type to 'border'
			role='status' // Set the ARIA role to 'status'
			style={{
				width: '100px', // Set the width of the spinner
				height: '100px', // Set the height of the spinner
				margin: 'auto', // Center the spinner horizontally
				display: 'block', // Display the spinner as a block element
			}}
		></Spinner>
	);
};

// Export the Loader component as default
export default Loader;
