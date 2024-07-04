import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Define a functional component for private routes
const PrivateRoute = () => {
	// Extract userInfo from the auth state in Redux store
	const { userInfo } = useSelector((state) => state.auth);

	// Render the Outlet if userInfo exists (user authenticated), otherwise navigate to login
	return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

// Export the PrivateRoute component as default
export default PrivateRoute;
