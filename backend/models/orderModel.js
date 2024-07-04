import mongoose from 'mongoose';

// Define the schema for an order
const orderSchema = mongoose.Schema(
	{
		// User placing the order (reference to User model)
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User', // Reference to the User model
		},
		// Array of items in the order
		orderItems: [
			{
				name: { type: String, required: true }, // Name of the product
				qty: { type: Number, required: true }, // Quantity ordered
				image: { type: String, required: true }, // Image of the product
				price: { type: Number, required: true }, // Price of the product
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product', // Reference to the Product model
				},
			},
		],
		// Shipping address for the order
		shippingAddress: {
			address: { type: String, required: true }, // Street address
			city: { type: String, required: true }, // City
			postalCode: { type: String, required: true }, // Postal code
			country: { type: String, required: true }, // Country
		},
		// Payment method used
		paymentMethod: {
			type: String,
			required: true,
		},
		// Payment result details
		paymentResult: {
			id: { type: String }, // Payment ID
			status: { type: String }, // Payment status
			update_time: { type: String }, // Last update time
			email_address: { type: String }, // Email address associated with payment
		},
		// Total price calculation fields
		itemsPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		// Payment status flags
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date, // Date when payment was made
		},
		// Delivery status flags
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date, // Date when order was delivered
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

// Create a model based on the schema
const Order = mongoose.model('Order', orderSchema);

export default Order; // Export the Order model
