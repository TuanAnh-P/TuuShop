import { Container } from 'react-bootstrap'; // Import Container component from react-bootstrap for layout
import { Outlet } from 'react-router-dom'; // Import Outlet component from react-router-dom for routing
import { ToastContainer } from 'react-toastify'; // Import ToastContainer component from react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify styles
import Header from './components/Header'; // Import Header component from local file
import Footer from './components/Footer'; // Import Footer component from local file

const App = () => {
	return (
		<>
			<Header /> {/* Render Header component */}
			<main>
				<Container>
					{' '}
					{/* Use Container for main content with Bootstrap styling */}
					<Outlet /> {/* Outlet for rendering nested routes */}
				</Container>
			</main>
			<Footer /> {/* Render Footer component */}
			<ToastContainer />{' '}
			{/* ToastContainer for displaying toast notifications */}
		</>
	);
};

export default App;
