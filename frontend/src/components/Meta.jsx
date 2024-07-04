// Import Helmet component from react-helmet-async
import { Helmet } from 'react-helmet-async';

// Define a functional component for meta tags
const Meta = ({ title, description, keywords }) => {
	return (
		// Render Helmet to manage document head contents
		<Helmet>
			{/* Set the page title */}
			<title>{title}</title>
			{/* Set meta description */}
			<meta name='description' content={description} />
			{/* Set meta keywords */}
			<meta name='keywords' content={keywords} />
		</Helmet>
	);
};

// Set default props for the Meta component
Meta.defaultProps = {
	title: 'Welcome To TuuShop', // Default title
	description: 'We sell the best products for cheap', // Default description
	keywords: 'electronics, buy electronics, cheap electronics', // Default keywords
};

// Export the Meta component as default
export default Meta;
