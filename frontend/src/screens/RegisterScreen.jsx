import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
	// Local state variables
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch(); // Redux dispatch function
	const navigate = useNavigate(); // Navigation function from react-router-dom

	const [register, { isLoading }] = useRegisterMutation(); // Register mutation from usersApiSlice

	const { userInfo } = useSelector((state) => state.auth); // Selecting user info from Redux state

	const { search } = useLocation(); // Getting query parameters from URL
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/'; // Redirect path after successful registration

	// Effect to redirect to the specified path if userInfo changes (user is logged in)
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	// Function to handle form submission
	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
		} else {
			try {
				// Call the register mutation and unwrap the result
				const res = await register({ name, email, password }).unwrap();
				// Dispatch action to set user credentials in Redux state
				dispatch(setCredentials({ ...res }));
				// Navigate to the specified redirect path
				navigate(redirect);
			} catch (err) {
				// Display error message if registration fails
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<FormContainer>
			<h1>Register</h1>
			<Form onSubmit={submitHandler}>
				{/* Name input field */}
				<Form.Group className='my-2' controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

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

				{/* Confirm password input field */}
				<Form.Group className='my-2' controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>

				{/* Register button */}
				<Button disabled={isLoading} type='submit' variant='primary'>
					Register
				</Button>

				{/* Loader component displayed during registration process */}
				{isLoading && <Loader />}
			</Form>

			{/* Link to login page */}
			<Row className='py-3'>
				<Col>
					Already have an account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
