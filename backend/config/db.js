import mongoose from 'mongoose'; // Import mongoose library for MongoDB interactions

// Function to connect to MongoDB
const connectDB = async () => {
	try {
		// Attempt to connect to MongoDB using the provided URI from environment variables
		const conn = await mongoose.connect(process.env.MONGO_URI);

		// Log a success message if connected
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		// Log an error message if connection fails and exit the process
		console.log(`Error: ${error.message}`);
		process.exit(1); // Exit with a non-zero status to indicate failure
	}
};

export default connectDB; // Export the connectDB function for use in other parts of the application
