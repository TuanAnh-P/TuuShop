# TuuShop

TuuShop is an e-commerce website, built from scratch using the MERN stack (MongoDB, Express, React, Node.js).

## Initial Setup

The project begins by creating a simple JSON file containing a list of products. This file serves as the initial dataset for the application.

## Frontend Development

The next step involves developing the user interface to display the products. The homepage features a carousel showcasing the top-rated products, along with a list of the latest products with pagination. Pagination becomes visible when more than eight products are available.

## Product Details

Users can click on a product to view its details. The product details page includes the ID, description, price, and rating. Ratings and reviews are visible, and users must be logged in to submit a review. Each user can submit only one review per product. An "Add to Cart" button updates the cart quantity and total price.

## Shopping Cart

The cart page allows users to view items in the cart and adjust item quantities, which updates the total price and quantity. Users can proceed to checkout, requiring them to log in or register.

## Checkout Process

During checkout, users:

- Log in or register.
- Enter shipping information, which is stored in local storage for convenience.
- Choose a payment method, with options for PayPal and credit/debit card payments.
- Place their order, which is saved in the database and marked as "not paid" until payment is processed via the PayPal sandbox.

## Order Management

Once an order is placed:

- Users can view their order history and details from their profile.
- Admins can manage orders, marking them as delivered once fulfilled.

## Admin Features

Admins have additional functionalities, including:

- Viewing and managing all orders.
- Creating, editing, and deleting products.
- Uploading product images, which are stored on the server using Multer, with an option to use external services like Cloudinary or Amazon S3.

## Reviews and Ratings

Users can submit reviews and ratings for products, with checks in place to prevent multiple reviews for the same product.

## Technology Stack

- Frontend: React, Redux
- Backend: Node.js, Express
- Database: MongoDB
- Payment Integration: PayPal
