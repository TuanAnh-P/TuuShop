import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
	useGetProductDetailsQuery,
	useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
	const { id: productId } = useParams(); // Fetching product ID from URL params

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1); // State for managing quantity to add to cart
	const [rating, setRating] = useState(0); // State for managing review rating
	const [comment, setComment] = useState(''); // State for managing review comment

	// Redux selector for fetching user info
	const { userInfo } = useSelector((state) => state.auth);

	// Fetching product details, including reviews, using RTK Query
	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId);

	// Mutation hook for creating a review
	const [createReview, { isLoading: loadingProductReview }] =
		useCreateReviewMutation();

	// Handler for adding product to cart
	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate('/cart');
	};

	// Handler for submitting a review
	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			await createReview({
				productId,
				rating,
				comment,
			}).unwrap();
			refetch();
			toast.success('Review created successfully');
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{isLoading ? ( // Loading state
				<Loader />
			) : error ? ( // Error state
				<Message variant='danger'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Meta title={product.name} description={product.description} />{' '}
					{/* Meta component for SEO */}
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />{' '}
							{/* Product image */}
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3> {/* Product name */}
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>{' '}
									{/* Product rating */}
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>{' '}
								{/* Product price */}
								<ListGroup.Item>
									Description: {product.description} {/* Product description */}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong> {/* Product price */}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}{' '}
												{/* Product availability */}
											</Col>
										</Row>
									</ListGroup.Item>

									{/* Quantity selection */}
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(Number(e.target.value))}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									{/* Add to cart button */}
									<ListGroup.Item>
										<Button
											className='btn-block'
											type='button'
											disabled={product.countInStock === 0}
											onClick={addToCartHandler}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					{/* Review section */}
					<Row className='review'>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && (
								<Message>No Reviews</Message>
							)}{' '}
							{/* Display message if no reviews */}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong> {/* Reviewer name */}
										<Rating value={review.rating} /> {/* Review rating */}
										<p>{review.createdAt.substring(0, 10)}</p>{' '}
										{/* Review creation date */}
										<p>{review.comment}</p> {/* Review comment */}
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{loadingProductReview && <Loader />}{' '}
									{/* Display loader while submitting review */}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group className='my-2' controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													required
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group className='my-2' controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													required
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button
												disabled={loadingProductReview}
												type='submit'
												variant='primary'
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
