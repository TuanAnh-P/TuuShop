// Import Pagination component from react-bootstrap
import { Pagination } from 'react-bootstrap';
// Import Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';

// Define a functional component for pagination
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	return (
		// Render pagination only if there are more than 1 page
		pages > 1 && (
			<Pagination>
				{/* Generate pagination items based on the number of pages */}
				{[...Array(pages).keys()].map((x) => (
					<Pagination.Item
						as={Link} // Use Link component from react-router-dom
						key={x + 1} // Set a unique key for each pagination item
						to={
							!isAdmin
								? keyword
									? `/search/${keyword}/page/${x + 1}` // Link for normal users with keyword
									: `/page/${x + 1}` // Link for normal users without keyword
								: `/admin/productlist/${x + 1}` // Link for admin users
						}
						active={x + 1 === page} // Set active state for current page
					>
						{x + 1} {/* Display the page number */}
					</Pagination.Item>
				))}
			</Pagination>
		)
	);
};

// Export the Paginate component as default
export default Paginate;
