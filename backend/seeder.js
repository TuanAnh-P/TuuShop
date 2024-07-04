import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js'; // Sample user data
import products from './data/products.js'; // Sample product data
import User from './models/userModel.js'; // User model
import Product from './models/productModel.js'; // Product model
import Order from './models/orderModel.js'; // Order model
import connectDB from './config/db.js'; // Database connection function

dotenv.config(); // Load environment variables from .env file

connectDB(); // Connect to MongoDB database

// Function to import sample data into database
const importData = async () => {
	try {
		// Clear existing data
		await Order.deleteMany({}, { maxTimeMS: 30000 }); // Increase timeout to 30 seconds
		await Product.deleteMany();
		await User.deleteMany();

		// Insert sample users into database and get created users
		const createdUsers = await User.insertMany(users);

		// Get admin user ID from created users
		const adminUser = createdUsers[0]._id;

		// Map sample products to include admin user ID
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		// Insert sample products into database
		await Product.insertMany(sampleProducts);

		console.log('Data Imported!'.green.inverse); // Log success message
		process.exit(); // Exit process
	} catch (error) {
		console.error(`${error}`.red.inverse); // Log error message
		process.exit(1); // Exit process with error
	}
};

// Function to destroy all data in database
const destroyData = async () => {
	try {
		// Clear all data in collections
		await Order.deleteMany({}, { maxTimeMS: 30000 }); // Increase timeout to 30 seconds
		await Product.deleteMany();
		await User.deleteMany();

		console.log('Data Destroyed!'.red.inverse); // Log success message
		process.exit(); // Exit process
	} catch (error) {
		console.error(`${error}`.red.inverse); // Log error message
		process.exit(1); // Exit process with error
	}
};

// Check command line argument to determine whether to import or destroy data
if (process.argv[2] === '-d') {
	destroyData(); // Destroy data if argument is '-d'
} else {
	importData(); // Otherwise, import data
}
