import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants'; // Assuming BASE_URL is defined elsewhere

// Configure the base query with baseUrl and credentials
const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include', // Include credentials (cookies) in requests
});

// Create an API slice using createApi from @reduxjs/toolkit/query
export const apiSlice = createApi({
	baseQuery, // Use the configured base query
	tagTypes: ['Product', 'Order', 'User'], // Define tag types for caching
	endpoints: (builder) => ({
		// Define endpoints here if needed
	}),
});
