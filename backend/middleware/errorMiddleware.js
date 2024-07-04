// Middleware: Not Found handler for undefined routes
const notFound = (req, res, next) => {
	// Create an error for undefined routes
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404); // Set response status to 404
	next(error); // Pass the error to the next middleware
};

// Middleware: Global error handler
const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set status code based on existing or default to 500
	let message = err.message; // Extract error message

	// Prepare response object with error details
	res.status(statusCode).json({
		message: message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Include stack trace in non-production environments
	});
};

export { notFound, errorHandler };
