import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating'; // Assuming Rating component is defined in './Rating'

// Define a functional component for rendering a product card
const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			{' '}
			{/* Card container with margin, padding, and rounded corners */}
			<Link to={`/product/${product._id}`}>
				{' '}
				{/* Link to the product details page */}
				<Card.Img src={product.image} variant='top' /> {/* Product image */}
			</Link>
			<Card.Body>
				{' '}
				{/* Card body section */}
				<Link to={`/product/${product._id}`}>
					{' '}
					{/* Link to the product details page */}
					<Card.Title as='div' className='product-title'>
						{' '}
						{/* Product title */}
						<strong>{product.name}</strong> {/* Product name */}
					</Card.Title>
				</Link>
			</Card.Body>
			<Card.Text as='div'>
				{' '}
				{/* Card text section as a div */}
				<Rating
					value={product.rating}
					text={`${product.numReviews} reviews`}
				/>{' '}
				{/* Product rating with number of reviews */}
			</Card.Text>
			<Card.Text as='h3'>${product.price}</Card.Text> {/* Product price */}
		</Card>
	);
};

export default Product;
