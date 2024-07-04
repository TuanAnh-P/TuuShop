import asyncHandler from '../middleware/asyncHandler.js'; // Import async handler middleware for handling async operations
import Order from '../models/orderModel.js'; // Import Order model for interacting with orders in MongoDB

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	// Check if orderItems exist and are not empty
	if (!orderItems || orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		// Create new order instance
		const order = new Order({
			orderItems: orderItems.map((x) => ({
				...x,
				product: x._id,
				_id: undefined,
			})),
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		// Save the order to the database
		const createdOrder = await order.save();

		res.status(201).json(createdOrder); // Respond with the created order
	}
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	// Find orders for the logged in user
	const orders = await Order.find({ user: req.user._id });

	res.status(200).json(orders); // Respond with the orders found
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	// Find order by ID and populate user details
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order) {
		res.status(200).json(order); // Respond with the order details
	} else {
		res.status(404); // Order not found
		throw new Error('Order not found');
	}
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true; // Set order as paid
		order.paidAt = Date.now(); // Set paid date
		order.paymentResult = {
			// Capture payment result details
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer,
			email_address, // typo correction: should be 'email_address'
		};

		const updatedOrder = await order.save(); // Save updated order

		res.status(200).json(updatedOrder); // Respond with updated order
	} else {
		res.status(404); // Order not found
		throw new Error('Order not found');
	}
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true; // Set order as delivered
		order.deliveredAt = Date.now(); // Set delivery date

		const updatedOrder = await order.save(); // Save updated order

		res.json(updatedOrder); // Respond with updated order
	} else {
		res.status(404); // Order not found
		throw new Error('Order not found');
	}
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	// Find all orders and populate user details
	const orders = await Order.find({}).populate('user', 'id name');

	res.status(200).json(orders); // Respond with all orders
});

// Export all controller functions
export {
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
};
