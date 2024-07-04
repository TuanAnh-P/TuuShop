import { useEffect } from 'react'; // Importing necessary components from React
import { Link, useParams } from 'react-router-dom'; // Importing necessary components from react-router-dom
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'; // Importing PayPal components for integration
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux for accessing Redux store
import { toast } from 'react-toastify'; // Importing toast notification library
import Message from '../components/Message'; // Importing custom Message component
import Loader from '../components/Loader'; // Importing custom Loader component
import {
	useDeliverOrderMutation,
	useGetOrderDetailsQuery,
	useGetPaypalClientIdQuery,
	usePayOrderMutation,
} from '../slices/ordersApiSlice'; // Importing custom hooks from ordersApiSlice for API interactions

// OrderScreen component definition
const OrderScreen = () => {
	const { id: orderId } = useParams(); // Getting orderId from URL parameters

	const {
		data: order, // Data received from useGetOrderDetailsQuery
		refetch, // Function to refetch order details
		isLoading, // Loading state
		error, // Error object
	} = useGetOrderDetailsQuery(orderId); // Fetching order details based on orderId

	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation(); // Mutation hook for paying an order
	const [deliverOrder, { isLoading: loadingDeliver }] =
		useDeliverOrderMutation(); // Mutation hook for marking an order as delivered

	const { userInfo } = useSelector((state) => state.auth); // Accessing userInfo from Redux store

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer(); // PayPal script reducer for managing PayPal script loading state

	const {
		data: paypal, // Data received from useGetPaypalClientIdQuery
		isLoading: loadingPayPal, // Loading state for PayPal client ID fetching
		error: errorPayPal, // Error object for PayPal client ID fetching
	} = useGetPaypalClientIdQuery(); // Fetching PayPal client ID for integration

	// Effect to handle PayPal script loading and initialization
	useEffect(() => {
		if (!errorPayPal && !loadingPayPal && paypal.clientId) {
			const loadPaypalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': paypal.clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
			};
			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadPaypalScript();
				}
			}
		}
	}, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

	// Function to handle payment approval through PayPal
	function onApprove(data, actions) {
		return actions.order.capture().then(async function (details) {
			try {
				await payOrder({ orderId, details }); // Calling payOrder mutation with order ID and payment details
				refetch(); // Refreshing order details after payment
				toast.success('Order is paid'); // Showing success message
			} catch (err) {
				toast.error(err?.data?.message || err.error); // Showing error message
			}
		});
	}

	// TESTING ONLY! REMOVE BEFORE PRODUCTION
	async function onApproveTest() {
		await payOrder({ orderId, details: { payer: {} } }); // Simulating payment approval for testing
		refetch(); // Refreshing order details after simulated payment
		toast.success('Order is paid'); // Showing success message
	}

	// Function to handle payment error
	function onError(err) {
		toast.error(err.message); // Showing error message
	}

	// Function to create PayPal order
	function createOrder(data, actions) {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: { value: order.totalPrice }, // Setting purchase amount based on order total
					},
				],
			})
			.then((orderID) => {
				return orderID;
			});
	}

	// Function to handle order delivery
	const deliverHandler = async () => {
		await deliverOrder(orderId); // Calling deliverOrder mutation with order ID
		refetch(); // Refreshing order details after marking as delivered
	};

	// Rendering JSX based on loading and error states
	return isLoading ? (
		<Loader /> // Displaying loader while fetching order details
	) : error ? (
		<Message variant='danger'>{error.data.message}</Message> // Displaying error message if order details fetch fails
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						{/* Shipping details */}
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong>{' '}
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</p>
							{/* Displaying delivery status */}
							{order.isDelivered ? (
								<Message variant='success'>
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>

						{/* Payment method details */}
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{/* Displaying payment status */}
							{order.isPaid ? (
								<Message variant='success'>Paid on {order.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>

						{/* Order items details */}
						<ListGroup.Item>
							<h2>Order Items</h2>
							{/* Displaying order items */}
							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{/* Calculating and displaying item subtotal */}
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				{/* Order summary and payment/delivery controls */}
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>

							{/* Items subtotal */}
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* Shipping cost */}
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* Tax */}
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* Total order amount */}
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* PayPal payment integration */}
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}

									{isPending ? (
										<Loader />
									) : (
										<div>
											{/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
											<Button
												style={{ marginBottom: '10px' }}
												onClick={onApproveTest}
											>
												Test Pay Order
											</Button>

											{/* PayPal buttons for payment */}
											<div>
												<PayPalButtons
													createOrder={createOrder}
													onApprove={onApprove}
													onError={onError}
												></PayPalButtons>
											</div>
										</div>
									)}
								</ListGroup.Item>
							)}

							{/* Delivery status update button (for admins) */}
							{loadingDeliver && <Loader />}

							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type='button'
											className='btn btn-block'
											onClick={deliverHandler}
										>
											Mark As Delivered
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen; // Exporting OrderScreen component
