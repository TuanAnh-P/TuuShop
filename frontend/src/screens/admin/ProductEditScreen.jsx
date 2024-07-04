import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message'; // Assuming Message component is defined in '../../components/Message'
import Loader from '../../components/Loader'; // Assuming Loader component is defined in '../../components/Loader'
import FormContainer from '../../components/FormContainer'; // Assuming FormContainer component is defined in '../../components/FormContainer'
import { toast } from 'react-toastify'; // Assuming react-toastify is imported and used for notifications
import {
	useGetProductDetailsQuery,
	useUpdateProductMutation,
	useUploadProductImageMutation,
} from '../../slices/productsApiSlice'; // Assuming hooks and mutations are imported from productsApiSlice

// Define a functional component for editing a product
const ProductEditScreen = () => {
	const { id: productId } = useParams(); // Get productId from URL parameters

	// Define state variables for form fields and data fetching/loading
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	// Fetch product details using useGetProductDetailsQuery hook from productsApiSlice
	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId);

	// Define updateProduct mutation and loading state
	const [updateProduct, { isLoading: loadingUpdate }] =
		useUpdateProductMutation();

	// Define uploadProductImage mutation and loading state
	const [uploadProductImage, { isLoading: loadingUpload }] =
		useUploadProductImageMutation();

	const navigate = useNavigate(); // Access navigate function from react-router-dom

	// Handle form submission for updating product details
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await updateProduct({
				productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			}).unwrap(); // Unwrap the Promise to handle potential rejection
			toast.success('Product updated'); // Show success toast notification
			refetch(); // Refetch product details to update UI
			navigate('/admin/productlist'); // Navigate back to product list page
		} catch (err) {
			toast.error(err?.data?.message || err.error); // Show error toast notification
		}
	};

	// Update form fields with product data once product details are fetched
	useEffect(() => {
		if (product) {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setBrand(product.brand);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		}
	}, [product]);

	// Handle file upload for product image
	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]); // Append selected file to FormData
		try {
			const res = await uploadProductImage(formData).unwrap(); // Unwrap the Promise to handle potential rejection
			toast.success(res.message); // Show success toast notification
			setImage(res.image); // Update image state with uploaded image URL
		} catch (err) {
			toast.error(err?.data?.message || err.error); // Show error toast notification
		}
	};

	// Render the product edit form with conditional loading and error handling
	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				{' '}
				{/* Form container component */}
				<h1>Edit Product</h1> {/* Page title */}
				{loadingUpdate && <Loader />} {/* Show loader while updating product */}
				{isLoading ? ( // Show loader while fetching product details
					<Loader />
				) : error ? ( // Show error message if there's an error fetching product details
					<Message variant='danger'>{error.data.message}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						{' '}
						{/* Product edit form */}
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.Control
								label='Choose File'
								onChange={uploadFileHandler}
								type='file'
							></Form.Control>
							{loadingUpload && <Loader />}{' '}
							{/* Show loader while uploading image */}
						</Form.Group>
						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter countInStock'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button
							type='submit'
							variant='primary'
							style={{ marginTop: '1rem' }}
						>
							Update {/* Submit button label */}
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
