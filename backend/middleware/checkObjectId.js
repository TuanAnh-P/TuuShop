// @ts-check // Enables TypeScript checking for this file
import { isValidObjectId } from 'mongoose'; // Importing isValidObjectId function from mongoose

/**
 * Middleware function to check if req.params.id is a valid Mongoose ObjectId.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @throws {Error} Throws an error if the ObjectId is invalid.
 */
function checkObjectId(req, res, next) {
	// Check if req.params.id is a valid ObjectId
	if (!isValidObjectId(req.params.id)) {
		res.status(404);
		throw new Error(`Invalid ObjectId: ${req.params.id}`);
	}
	next(); // Move to the next middleware
}

export default checkObjectId;
