import { useState, useEffect } from 'react'; // Importing necessary components from React
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importing necessary components from react-router-dom
import { Form, Button, Row, Col } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import { useDispatch, useSelector } from 'react-redux'; // Importing necessary components from react-redux
import Loader from '../components/Loader'; // Importing custom Loader component
import FormContainer from '../components/FormContainer'; // Importing custom FormContainer component

import { useLoginMutation } from '../slices/usersApiSlice'; // Importing custom hook from usersApiSlice for login mutation
import { setCredentials } from '../slices/authSlice'; // Importing Redux action for setting credentials
import { toast } from 'react-toastify'; // Importing toast notification library

// LoginScreen component definition
const LoginScreen = () => {
	const [email, setEmail] = useState(''); // State for storing email input
	const [password, setPassword] = useState(''); // State for storing password input

	const dispatch = useDispatch(); // Getting dispatch function from useDispatch hook
	const navigate = useNavigate(); // Getting navigation function from useNavigate hook

	const [login, { isLoading }] = useLoginMutation(); // Using login mutation hook from usersApiSlice

	const { userInfo } = useSelector((state) => state.auth); // Accessing userInfo from Redux store

	const { search } = useLocation(); // Getting current location search parameters
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/'; // Setting redirect path from URL query parameter or default to '/'

	// Effect to redirect to specified path if user info is available
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	// Function to handle form submission
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await login({ email, password }).unwrap(); // Calling login mutation and unwrapping the result
			dispatch(setCredentials({ ...res })); // Dispatching action to set user credentials in Redux store
			navigate(redirect); // Redirecting user after successful login
		} catch (err) {
			toast.error(err?.data?.message || err.error); // Displaying error message using toast notification
		}
	};

	// Rendering JSX
	return (
		<FormContainer>
			<h1>Sign In</h1>

			<Form onSubmit={submitHandler}>
				{/* Email input field */}
				<Form.Group className='my-2' controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				{/* Password input field */}
				<Form.Group className='my-2' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				{/* Sign In button */}
				<Button disabled={isLoading} type='submit' variant='primary'>
					Sign In
				</Button>

				{/* Loading spinner while logging in */}
				{isLoading && <Loader />}
			</Form>

			{/* Link to register page */}
			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen; // Exporting LoginScreen component
