import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css'; // Custom Bootstrap styles
import './assets/styles/index.css'; // Global styles
// import 'bootstrap/dist/css/bootstrap.min.css'; // Uncomment to use Bootstrap's default CSS
import App from './App'; // Main application component
import reportWebVitals from './reportWebVitals'; // Web Vitals reporting
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'; // React Router imports for routing
import { HelmetProvider } from 'react-helmet-async'; // Helmet for managing document head tags
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute component for authenticated routes
import AdminRoute from './components/AdminRoute'; // AdminRoute component for admin routes
import HomeScreen from './screens/HomeScreen'; // Home screen component
import ProductScreen from './screens/ProductScreen'; // Product screen component
import CartScreen from './screens/CartScreen'; // Cart screen component
import LoginScreen from './screens/LoginScreen'; // Login screen component
import RegisterScreen from './screens/RegisterScreen'; // Register screen component
import ShippingScreen from './screens/ShippingScreen'; // Shipping screen component
import PaymentScreen from './screens/PaymentScreen'; // Payment screen component
import PlaceOrderScreen from './screens/PlaceOrderScreen'; // Place order screen component
import OrderScreen from './screens/OrderScreen'; // Order screen component
import ProfileScreen from './screens/ProfileScreen'; // Profile screen component
import OrderListScreen from './screens/admin/OrderListScreen'; // Order list screen component for admin
import ProductListScreen from './screens/admin/ProductListScreen'; // Product list screen component for admin
import ProductEditScreen from './screens/admin/ProductEditScreen'; // Product edit screen component for admin
import UserListScreen from './screens/admin/UserListScreen'; // User list screen component for admin
import UserEditScreen from './screens/admin/UserEditScreen'; // User edit screen component for admin
import store from './store'; // Redux store
import { Provider } from 'react-redux'; // Provider for Redux store
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; // PayPalScriptProvider for PayPal integration

// Create router with routes defined
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomeScreen />} />
			<Route path='/search/:keyword' element={<HomeScreen />} />
			<Route path='/page/:pageNumber' element={<HomeScreen />} />
			<Route
				path='/search/:keyword/page/:pageNumber'
				element={<HomeScreen />}
			/>
			<Route path='/product/:id' element={<ProductScreen />} />
			<Route path='/cart' element={<CartScreen />} />
			<Route path='/login' element={<LoginScreen />} />
			<Route path='/register' element={<RegisterScreen />} />

			{/* Routes for registered users */}
			<Route path='' element={<PrivateRoute />}>
				<Route path='/shipping' element={<ShippingScreen />} />
				<Route path='/payment' element={<PaymentScreen />} />
				<Route path='/placeorder' element={<PlaceOrderScreen />} />
				<Route path='/order/:id' element={<OrderScreen />} />
				<Route path='/profile' element={<ProfileScreen />} />
			</Route>

			{/* Routes for admin users */}
			<Route path='' element={<AdminRoute />}>
				<Route path='/admin/orderlist' element={<OrderListScreen />} />
				<Route path='/admin/productlist' element={<ProductListScreen />} />
				<Route
					path='/admin/productlist/:pageNumber'
					element={<ProductListScreen />}
				/>
				<Route path='/admin/userlist' element={<UserListScreen />} />
				<Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
				<Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
			</Route>
		</Route>
	)
);

// Initialize ReactDOM root with StrictMode and providers
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<Provider store={store}>
				<PayPalScriptProvider deferLoading={true}>
					<RouterProvider router={router} />
				</PayPalScriptProvider>
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
);

// Report Web Vitals
reportWebVitals();
