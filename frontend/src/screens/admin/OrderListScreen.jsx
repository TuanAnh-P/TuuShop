import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message'; // Assuming Message component is defined in '../../components/Message'
import Loader from '../../components/Loader'; // Assuming Loader component is defined in '../../components/Loader'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'; // Assuming useGetOrdersQuery hook is defined in '../../slices/ordersApiSlice'
import { Link } from 'react-router-dom';

// Define a functional component for displaying a list of orders
const OrderListScreen = () => {
	// Fetch orders data using a custom hook from ordersApiSlice
	const { data: orders, isLoading, error } = useGetOrdersQuery();

	// Handle loading and error states
	return (
		<>
			<h1>Orders</h1> {/* Page title */}
			{isLoading ? ( // Show loader while fetching data
				<Loader />
			) : error ? ( // Show error message if there's an error fetching data
				<Message variant='danger'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					{' '}
					{/* Table component with responsive design */}
					<thead>
						<tr>
							<th>ID</th> {/* Table headers */}
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map(
							(
								order // Iterate through orders array and render each order row
							) => (
								<tr key={order._id}>
									{' '}
									{/* Unique key for each order */}
									<td>{order._id}</td> {/* Order ID */}
									<td>{order.user && order.user.name}</td>{' '}
									{/* User's name (if user exists) */}
									<td>{order.createdAt.substring(0, 10)}</td>{' '}
									{/* Order creation date */}
									<td>${order.totalPrice}</td> {/* Total order price */}
									<td>
										{order.isPaid ? ( // Show paid date if order is paid
											order.paidAt.substring(0, 10)
										) : (
											<FaTimes style={{ color: 'red' }} /> // Show red cross if order is not paid
										)}
									</td>
									<td>
										{order.isDelivered ? ( // Show delivered date if order is delivered
											order.deliveredAt.substring(0, 10)
										) : (
											<FaTimes style={{ color: 'red' }} /> // Show red cross if order is not delivered
										)}
									</td>
									<td>
										<Button // Details button linking to order details page
											as={Link}
											to={`/order/${order._id}`}
											variant='light'
											className='btn-sm'
										>
											Details {/* Button label */}
										</Button>
									</td>
								</tr>
							)
						)}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
