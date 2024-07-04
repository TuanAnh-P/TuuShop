import mongoose from 'mongoose';

// Define the review schema
const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true }, // Name of the reviewer
		rating: { type: Number, required: true }, // Rating given by the reviewer
		comment: { type: String, required: true }, // Review comment
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User', // Reference to the User model
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

// Define the product schema
const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User', // Reference to the User model who added the product
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema], // Array of reviews (using reviewSchema)
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

// Create a model based on the product schema
const Product = mongoose.model('Product', productSchema);

export default Product; // Export the Product model
