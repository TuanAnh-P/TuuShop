import { Link, useNavigate } from 'react-router-dom'; // Importing necessary components from react-router-dom
import { useDispatch, useSelector } from 'react-redux'; // Importing necessary components from react-redux
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import { FaTrash } from 'react-icons/fa'; // Importing trash icon from react-icons/fa
import Message from '../components/Message'; // Importing custom Message component
import { addToCart, removeFromCart } from '../slices/cartSlice'; // Importing Redux actions for cart handling

// CartScreen component definition
const CartScreen = () => {
	const navigate = useNavigate(); // Getting navigation function from useNavigate hook
	const dispatch = useDispatch(); // Getting dispatch function from useDispatch hook

	const cart = useSelector((state) => state.cart); // Accessing cart state from Redux store
	const { cartItems } = cart; // Destructuring cartItems from cart state

	// Function to handle adding items to cart
	const addToCartHandler = async (product, qty) => {
		dispatch(addToCart({ ...product, qty })); // Dispatching addToCart action with product and quantity
	};

	// Function to handle removing items from cart
	const removeFromCartHandler = async (id) => {
		dispatch(removeFromCart(id)); // Dispatching removeFromCart action with product ID
	};

	// Function to handle checkout process
	const checkoutHandler = () => {
		navigate('/login?redirect=/shipping'); // Navigating to login page with redirect to shipping
	};

	// Rendering JSX
	return (
		<Row>
			<Col md={8}>
				<h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					// Rendering message if cart is empty
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					// Rendering cart items if cart is not empty
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							// Mapping through cart items and rendering each item
							<ListGroup.Item key={item._id}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item._id}`}>{item.name}</Link>
									</Col>
									<Col md={2}>{item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												addToCartHandler(item, Number(e.target.value))
											}
										>
											{/* Generating quantity options based on stock */}
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										{/* Button to remove item from cart */}
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item._id)}
										>
											<FaTrash />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				{/* Cart summary */}
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>
							{/* Calculating and displaying subtotal */}$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						{/* Button to proceed to checkout */}
						<ListGroup.Item
							type='button'
							className='btn-block'
							disabled={cartItems.length === 0}
							onClick={checkoutHandler}
						>
							<Button>Proceed To Checkout</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen; // Exporting CartScreen component
