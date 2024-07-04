import jwt from 'jsonwebtoken';

// Function to generate JWT token and set it as an HTTP-only cookie
const generateToken = (res, userId) => {
	// Generate JWT token with user ID payload
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '30d', // Token expires in 30 days
	});

	// Set JWT as an HTTP-Only cookie
	res.cookie('jwt', token, {
		httpOnly: true, // Cookie accessible only by the server
		secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
		sameSite: 'strict', // Prevent CSRF attacks by limiting same-site requests
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
	});
};

export default generateToken;
