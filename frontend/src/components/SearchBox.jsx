import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Define a functional component for the search box
const SearchBox = () => {
	const navigate = useNavigate(); // Access navigate function from react-router-dom
	const { keyword: urlKeyword } = useParams(); // Get URL parameter 'keyword'

	// Initialize state for search keyword, defaulting to URL parameter 'keyword' or empty string
	const [keyword, setKeyword] = useState(urlKeyword || '');

	// Define function to handle form submission
	const submitHandler = (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		if (keyword) {
			navigate(`/search/${keyword.trim()}`); // Navigate to search results page with trimmed keyword
			setKeyword(''); // Clear the keyword input after navigation
		} else {
			navigate('/'); // Navigate to the home page if keyword is empty
		}
	};

	// Render the search form
	return (
		<Form onSubmit={submitHandler} className='d-flex'>
			{' '}
			{/* Search form with flexbox layout */}
			<Form.Control
				type='text' // Input type text
				name='q' // Input name attribute
				onChange={(e) => setKeyword(e.target.value)} // Update keyword state on change
				value={keyword} // Bind value to keyword state
				placeholder='Search Products...' // Placeholder text
				className='mr-sm-2 ml-sm-5' // Additional styling classes
			></Form.Control>
			<Button type='submit' variant='outline-success' className='p-2 mx-2'>
				{' '}
				{/* Submit button */}
				Search {/* Button label */}
			</Button>
		</Form>
	);
};

export default SearchBox;
