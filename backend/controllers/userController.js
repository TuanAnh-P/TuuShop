import asyncHandler from '../middleware/asyncHandler.js'; // Import async handler middleware for handling async operations
import generateToken from '../utils/generateToken.js'; // Import function to generate JWT tokens
import User from '../models/userModel.js'; // Import User model for interacting with users in MongoDB

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Find user by email
	const user = await User.findOne({ email });

	// Check if user exists and password matches
	if (user && (await user.matchPassword(password))) {
		// Generate JWT token and set cookie
		generateToken(res, user._id);

		// Respond with user details and token
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401); // Unauthorized
		throw new Error('Invalid email or password');
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Check if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400); // Bad request
		throw new Error('User already exists');
	}

	// Create new user
	const user = await User.create({
		name,
		email,
		password,
	});

	// Generate JWT token and set cookie
	generateToken(res, user._id);

	// Respond with newly created user details and token
	res.status(201).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
	});
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
	// Clear JWT cookie
	res.clearCookie('jwt');
	res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	// Find user by ID
	const user = await User.findById(req.user._id);

	if (user) {
		// Respond with user profile details
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404); // Not found
		throw new Error('User not found');
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	// Find user by ID
	const user = await User.findById(req.user._id);

	if (user) {
		// Update user details if provided in request body
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		// Save updated user details
		const updatedUser = await user.save();

		// Respond with updated user profile
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404); // Not found
		throw new Error('User not found');
	}
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	// Fetch all users
	const users = await User.find({});

	// Respond with array of users
	res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	// Find user by ID
	const user = await User.findById(req.params.id);

	if (user) {
		// Check if user is admin (prevent deletion of admin users)
		if (user.isAdmin) {
			res.status(400); // Bad request
			throw new Error('Can not delete admin user');
		}

		// Delete user from database
		await User.deleteOne({ _id: user._id });

		// Respond with success message
		res.json({ message: 'User removed' });
	} else {
		res.status(404); // Not found
		throw new Error('User not found');
	}
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	// Find user by ID and exclude password field
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		// Respond with user details
		res.json(user);
	} else {
		res.status(404); // Not found
		throw new Error('User not found');
	}
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	// Find user by ID
	const user = await User.findById(req.params.id);

	if (user) {
		// Update user details if provided in request body
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = Boolean(req.body.isAdmin);

		// Save updated user details
		const updatedUser = await user.save();

		// Respond with updated user details
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404); // Not found
		throw new Error('User not found');
	}
});

// Export all controller functions
export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
