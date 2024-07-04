// Import necessary hooks and components from react-router-dom and react-bootstrap
import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
// import logo from '../assets/logo.jpg';

// Define a functional component for the header
const Header = () => {
	// Extract cartItems and userInfo from the Redux store
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.auth);

	// Initialize dispatch and navigate hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Initialize the logout mutation
	const [logoutApiCall] = useLogoutMutation();

	// Define a handler for logging out
	const logoutHandler = async () => {
		try {
			// Call the logout API and dispatch the logout action
			await logoutApiCall().unwrap();
			dispatch(logout());
			// Navigate to the login page
			navigate('/login');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		// Render the header element
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					{/* Brand link to the home page */}
					<LinkContainer to='/'>
						<Navbar.Brand>
							{/* <img src={logo} alt='TuuShop' /> */}
							TuuShop
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							{/* Link to the cart page */}
							<LinkContainer to='/cart'>
								<Nav.Link>
									<FaShoppingCart /> Cart
									{cartItems.length > 0 && (
										<Badge pill bg='success' style={{ marginLeft: '5px' }}>
											{cartItems.reduce((a, c) => a + c.qty, 0)}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									{/* Link to the profile page */}
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									{/* Logout link */}
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<FaUser /> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{/* Admin dropdown menu */}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

// Export the Header component as default
export default Header;
