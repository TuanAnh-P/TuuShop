# TuuShop

A full-stack e-commerce application built with the MERN stack, featuring a modern React frontend, robust Node.js backend, and comprehensive admin panel.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

TuuShop is a complete e-commerce solution that allows users to browse products, manage their shopping cart, process payments through PayPal, and handle orders. The application includes an admin panel for managing products, orders, and users.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd TuuShop
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   NODE_ENV=development
   PORT=8000
   ```

5. Seed the database with sample data (optional):
   ```bash
   npm run data:import
   ```

## Usage

### Development Mode

To run both frontend and backend concurrently:

```bash
npm run dev
```

### Running Separately

Backend server:

```bash
npm run server
```

Frontend development server:

```bash
npm run client
```

### Production Mode

```bash
npm start
```

The application will be available at `http://localhost:3000` (frontend) and `http://localhost:8000` (backend).

## Project Structure

```
TuuShop/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── data/           # Sample data
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── server.js       # Express server setup
├── frontend/
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # Reusable React components
│       ├── screens/    # Page components
│       ├── slices/     # Redux slices
│       └── utils/      # Frontend utilities
└── package.json        # Root package configuration
```

## Features

### User Features

- Product browsing with search and filtering
- Product details with ratings and reviews
- Shopping cart management
- User authentication and registration
- Order placement and tracking
- PayPal payment integration
- User profile management
- Order history

### Admin Features

- Product management (create, read, update, delete)
- Order management and status updates
- User management
- Image upload for products
- Sales analytics

### Technical Features

- Responsive design with Bootstrap
- Redux state management
- JWT authentication
- MongoDB database with Mongoose ODM
- Image upload with Multer
- Pagination for products and orders
- Error handling middleware
- API validation

## Technology Stack

### Frontend

- **React** - JavaScript library for building user interfaces
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **React Bootstrap** - UI components
- **Axios** - HTTP client

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

### Payment Integration

- **PayPal API** - Payment processing

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users

- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/myorders` - Get user orders
- `PUT /api/orders/:id/pay` - Update order to paid
