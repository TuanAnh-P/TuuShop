// Import Alert component from react-bootstrap
import { Alert } from 'react-bootstrap';

// Define a functional component for displaying messages
const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};

// Set default props for the Message component
Message.defaultProps = {
	variant: 'info', // Default variant is 'info'
};

// Export the Message component as default
export default Message;
