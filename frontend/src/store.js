import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import { apiSlice } from './slices/apiSlice'; // Import API slice from local file
import cartSliceReducer from './slices/cartSlice'; // Import cart slice reducer from local file
import authSliceReducer from './slices/authSlice'; // Import auth slice reducer from local file

// Configure Redux store
const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer, // Include API slice reducer under apiSlice.reducerPath
		cart: cartSliceReducer, // Include cart slice reducer under 'cart' key
		auth: authSliceReducer, // Include auth slice reducer under 'auth' key
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware), // Add API middleware to handle async actions
	devTools: true, // Enable Redux DevTools for debugging
});

export default store; // Export the configured Redux store
