import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message'; // Assuming Message component is defined in '../../components/Message'
import Loader from '../../components/Loader'; // Assuming Loader component is defined in '../../components/Loader'
import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from '../../slices/usersApiSlice'; // Assuming hooks and mutations are imported from usersApiSlice
import { toast } from 'react-toastify'; // Assuming react-toastify is imported and used for notifications
import { Link } from 'react-router-dom';

const UserListScreen = () => {
	// Fetch users data using useGetUsersQuery hook from usersApiSlice
	const { data: users, refetch, isLoading, error } = useGetUsersQuery();

	// Define deleteUser mutation and loading state
	const [deleteUser] = useDeleteUserMutation();

	// Handle deletion of a user
	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure')) {
			try {
				await deleteUser(id); // Delete user using deleteUser mutation
				refetch(); // Refetch users data to update UI
			} catch (err) {
				toast.error(err?.data?.message || err.error); // Show error toast notification
			}
		}
	};

	// Render the user list screen with conditional loading and error handling
	return (
		<>
			<h1>Users</h1> {/* Page title */}
			{isLoading ? ( // Show loader while fetching users data
				<Loader />
			) : error ? ( // Show error message if there's an error fetching users data
				<Message variant='danger'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? ( // Display admin status with green check mark or red cross
										<FaCheck style={{ color: 'green' }} />
									) : (
										<FaTimes style={{ color: 'red' }} />
									)}
								</td>
								<td>
									{!user.isAdmin && ( // Display edit and delete buttons for non-admin users
										<>
											<Button
												as={Link}
												to={`/admin/user/${user._id}/edit`}
												style={{ marginRight: '10px' }}
												variant='light'
												className='btn-sm'
											>
												<FaEdit />
											</Button>
											<Button
												variant='danger'
												className='btn-sm'
												onClick={() => deleteHandler(user._id)}
											>
												<FaTrash style={{ color: 'white' }} />
											</Button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
