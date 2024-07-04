// asyncHandler.js

// Middleware function to handle asynchronous operations and errors
const asyncHandler = (fn) => (req, res, next) => {
	// Wrap the asynchronous function `fn` in a Promise and catch any errors
	Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
