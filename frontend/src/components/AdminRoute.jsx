// Import necessary components from react-router-dom
import { Outlet, Navigate } from 'react-router-dom';
// Import useSelector hook from react-redux to access Redux state
import { useSelector } from 'react-redux';

// Define a functional component for admin route protection
const AdminRoute = () => {
	// Extract userInfo from the auth state in Redux store
	const { userInfo } = useSelector((state) => state.auth);

	// Check if userInfo exists and the user is an admin
	return userInfo && userInfo.isAdmin ? (
		// If the user is an admin, render the nested routes
		<Outlet />
	) : (
		// If the user is not an admin, navigate to the login page
		<Navigate to='/login' replace />
	);
};

// Export the AdminRoute component as default
export default AdminRoute;
