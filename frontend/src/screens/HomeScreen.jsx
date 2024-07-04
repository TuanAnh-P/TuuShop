import { Row, Col } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import { useParams } from 'react-router-dom'; // Importing useParams hook from react-router-dom
import { useGetProductsQuery } from '../slices/productsApiSlice'; // Importing custom hook from productsApiSlice for fetching products
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import Product from '../components/Product'; // Importing custom Product component
import Loader from '../components/Loader'; // Importing custom Loader component
import Message from '../components/Message'; // Importing custom Message component
import Paginate from '../components/Paginate'; // Importing custom Paginate component
import ProductCarousel from '../components/ProductCarousel'; // Importing custom ProductCarousel component
import Meta from '../components/Meta'; // Importing custom Meta component

// HomeScreen component definition
const HomeScreen = () => {
	const { pageNumber, keyword } = useParams(); // Destructuring pageNumber and keyword from useParams hook

	// Fetching products using useGetProductsQuery hook
	const { data, isLoading, error } = useGetProductsQuery({
		keyword,
		pageNumber,
	});

	// Rendering JSX
	return (
		<>
			{/* Conditional rendering of ProductCarousel or Go Back button based on keyword */}
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light mb-4'>
					Go Back
				</Link>
			)}
			{/* Conditional rendering based on loading state */}
			{isLoading ? (
				<Loader /> // Displaying Loader component while loading
			) : error ? (
				<Message variant='danger'>
					{error?.data?.message || error.error}
				</Message> // Displaying error message if there's an error
			) : (
				<>
					<Meta /> {/* Rendering Meta component for SEO metadata */}
					<h1>Latest Products</h1> {/* Heading for latest products */}
					<Row>
						{/* Mapping through products and rendering each in a column */}
						{data.products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />{' '}
								{/* Rendering Product component */}
							</Col>
						))}
					</Row>
					<Paginate
						pages={data.pages} // Passing pagination information to Paginate component
						page={data.page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen; // Exporting HomeScreen component
