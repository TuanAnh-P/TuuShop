import jwt from 'jsonwebtoken'; // Importing JWT for token verification
import asyncHandler from './asyncHandler.js'; // Importing async handler utility
import User from '../models/userModel.js'; // Importing User model

// Middleware: Protect routes requiring authentication
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Read JWT from the 'jwt' cookie
	token = req.cookies.jwt;

	if (token) {
		try {
			// Verify JWT token using the secret key
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Fetch user details excluding the password
			req.user = await User.findById(decoded.userId).select('-password');

			next(); // Move to the next middleware
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Not authorized, token failed'); // Token verification failed
		}
	} else {
		res.status(401);
		throw new Error('Not authorized, no token'); // No token found in the request
	}
});

// Middleware: Restrict route access to admins only
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next(); // Allow access if user is an admin
	} else {
		res.status(401);
		throw new Error('Not authorized as an admin'); // User is not an admin
	}
};

export { protect, admin };
