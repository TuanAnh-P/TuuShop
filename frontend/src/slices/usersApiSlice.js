import { apiSlice } from './apiSlice'; // Assuming apiSlice is defined elsewhere
import { USERS_URL } from '../constants'; // Assuming USERS_URL is defined

// Injecting endpoints into apiSlice for user management
export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Mutation to authenticate/login a user
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: data,
			}),
		}),
		// Mutation to register a new user
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: data,
			}),
		}),
		// Mutation to logout a user
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		// Mutation to update user profile
		profile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
			}),
		}),
		// Query to fetch all users
		getUsers: builder.query({
			query: () => ({
				url: USERS_URL,
			}),
			providesTags: ['User'], // Provides caching tag 'User' for invalidation
			keepUnusedDataFor: 5, // Keep unused data in cache for 5 minutes
		}),
		// Mutation to delete a user by userId
		deleteUser: builder.mutation({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'DELETE',
			}),
		}),
		// Query to fetch user details by id
		getUserDetails: builder.query({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
			}),
			keepUnusedDataFor: 5, // Keep unused data in cache for 5 minutes
		}),
		// Mutation to update a user by userId
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.userId}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['User'], // Invalidates caching tag 'User' after mutation
		}),
	}),
});

// Export hooks generated by injectEndpoints for user management
export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useProfileMutation,
	useGetUsersQuery,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useGetUserDetailsQuery,
} = userApiSlice;
