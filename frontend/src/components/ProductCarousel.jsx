import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message'; // Assuming Message component is defined in './Message'
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

// Define a functional component for displaying a product carousel
const ProductCarousel = () => {
	// Fetch top products data using a custom hook from productsApiSlice
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	// Handle loading and error states
	if (isLoading) {
		return null; // Return null if still loading
	}

	if (error) {
		return (
			<Message variant='danger'>{error?.data?.message || error.error}</Message>
		); // Display error message if there's an error fetching data
	}

	// Render the carousel with fetched products data
	return (
		<Carousel pause='hover' className='bg-primary mb-4'>
			{' '}
			{/* Carousel component with hover pause and styling */}
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					{' '}
					{/* Carousel item with unique key */}
					<Link to={`/product/${product._id}`}>
						{' '}
						{/* Link to the product details page */}
						<Image src={product.image} alt={product.name} fluid />{' '}
						{/* Product image */}
						<Carousel.Caption className='carousel-caption'>
							{' '}
							{/* Caption for product details */}
							<h2 className='text-white text-right'>
								{product.name} (${product.price}) {/* Product name and price */}
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
