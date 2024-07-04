import asyncHandler from '../middleware/asyncHandler.js'; // Import async handler middleware for handling async operations
import Product from '../models/productModel.js'; // Import Product model for interacting with products in MongoDB

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = process.env.PAGINATION_LIMIT; // Number of products per page
	const page = Number(req.query.pageNumber) || 1; // Current page number

	// Filter products by keyword (name case-insensitive search)
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i', // Case-insensitive search
				},
		  }
		: {};

	// Count total products matching keyword
	const count = await Product.countDocuments({ ...keyword });

	// Fetch products based on pagination settings and keyword filter
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	// Respond with products, current page, and total pages
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
	// Find product by ID
	const product = await Product.findById(req.params.id);

	// Check if product exists and respond with product details
	if (product) {
		res.json(product);
	} else {
		res.status(404); // Product not found
		throw new Error('Product not found');
	}
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	// Create new product instance with default values
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	// Save the newly created product to the database
	const createdProduct = await product.save();

	// Respond with the created product
	res.status(201).json(createdProduct);
});

// @desc    Update a product by ID
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	// Destructure updated product fields from request body
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	// Find product by ID
	const product = await Product.findById(req.params.id);

	// Update product fields if product exists
	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		// Save updated product to the database
		const updatedProduct = await product.save();

		// Respond with the updated product
		res.json(updatedProduct);
	} else {
		res.status(404); // Product not found
		throw new Error('Product not found');
	}
});

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	// Find product by ID
	const product = await Product.findById(req.params.id);

	// Delete product if found
	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.json({ message: 'Product removed' });
	} else {
		res.status(404); // Product not found
		throw new Error('Product not found');
	}
});

// @desc    Create a new review for a product
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
	// Destructure review details from request body
	const { rating, comment } = req.body;

	// Find product by ID
	const product = await Product.findById(req.params.id);

	// Check if product exists
	if (product) {
		// Check if user already reviewed the product
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		// Throw error if user already reviewed the product
		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		// Construct new review object
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		// Add new review to product's reviews array
		product.reviews.push(review);

		// Update number of reviews for the product
		product.numReviews = product.reviews.length;

		// Calculate average rating for the product
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		// Save updated product to the database
		await product.save();

		// Respond with success message
		res.status(201).json({ message: 'Review added' });
	} else {
		res.status(404); // Product not found
		throw new Error('Product not found');
	}
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
	// Fetch top rated products (sorted by rating descending)
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	// Respond with top rated products
	res.json(products);
});

// Export all controller functions
export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getTopProducts,
};
