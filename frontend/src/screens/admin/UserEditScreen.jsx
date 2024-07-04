import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message'; // Assuming Message component is defined in '../../components/Message'
import Loader from '../../components/Loader'; // Assuming Loader component is defined in '../../components/Loader'
import FormContainer from '../../components/FormContainer'; // Assuming FormContainer component is defined in '../../components/FormContainer'
import { toast } from 'react-toastify'; // Assuming react-toastify is imported and used for notifications
import {
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} from '../../slices/usersApiSlice'; // Assuming hooks and mutations are imported from usersApiSlice

const UserEditScreen = () => {
	const { id: userId } = useParams(); // Get userId from URL parameters
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	// Fetch user details using useGetUserDetailsQuery hook from usersApiSlice
	const {
		data: user,
		isLoading,
		error,
		refetch,
	} = useGetUserDetailsQuery(userId);

	// Define updateUser mutation and loading state
	const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

	const navigate = useNavigate();

	// Handle form submission to update user details
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await updateUser({ userId, name, email, isAdmin }); // Update user using updateUser mutation
			toast.success('User updated successfully'); // Show success toast notification
			refetch(); // Refetch user data to update UI
			navigate('/admin/userlist'); // Redirect to user list page after successful update
		} catch (err) {
			toast.error(err?.data?.message || err.error); // Show error toast notification
		}
	};

	// Populate form fields with user data on component load
	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user]);

	// Render the user edit screen with conditional loading and error handling
	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1> {/* Page title */}
				{loadingUpdate && <Loader />} {/* Show loader while updating user */}
				{isLoading ? ( // Show loader while fetching user data
					<Loader />
				) : error ? ( // Show error message if there's an error fetching user data
					<Message variant='danger'>
						{error?.data?.message || error.error}
					</Message>
				) : (
					<Form onSubmit={submitHandler}>
						{/* User edit form */}
						<Form.Group className='my-2' controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className='my-2' controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className='my-2' controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							/>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
