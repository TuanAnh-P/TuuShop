import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message'; // Assuming Message component is defined in '../../components/Message'
import Loader from '../../components/Loader'; // Assuming Loader component is defined in '../../components/Loader'
import Paginate from '../../components/Paginate'; // Assuming Paginate component is defined in '../../components/Paginate'
import {
	useGetProductsQuery,
	useDeleteProductMutation,
	useCreateProductMutation,
} from '../../slices/productsApiSlice'; // Assuming hooks and mutations are imported from productsApiSlice
import { toast } from 'react-toastify'; // Assuming react-toastify is imported and used for notifications

// Define a functional component for displaying a list of products
const ProductListScreen = () => {
	const { pageNumber } = useParams(); // Get pageNumber from URL parameters

	// Fetch products data using useGetProductsQuery hook from productsApiSlice
	const { data, isLoading, error, refetch } = useGetProductsQuery({
		pageNumber,
	});

	// Define deleteProduct mutation and loading state
	const [deleteProduct, { isLoading: loadingDelete }] =
		useDeleteProductMutation();

	// Handle deletion of a product
	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure')) {
			try {
				await deleteProduct(id); // Delete product using deleteProduct mutation
				refetch(); // Refetch products data to update UI
			} catch (err) {
				toast.error(err?.data?.message || err.error); // Show error toast notification
			}
		}
	};

	// Define createProduct mutation and loading state
	const [createProduct, { isLoading: loadingCreate }] =
		useCreateProductMutation();

	// Handle creation of a new product
	const createProductHandler = async () => {
		if (window.confirm('Are you sure you want to create a new product?')) {
			try {
				await createProduct(); // Create product using createProduct mutation
				refetch(); // Refetch products data to update UI
			} catch (err) {
				toast.error(err?.data?.message || err.error); // Show error toast notification
			}
		}
	};

	// Render the product list screen with conditional loading and error handling
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1> {/* Page title */}
				</Col>
				<Col className='text-end'>
					<Button className='my-3' onClick={createProductHandler}>
						<FaPlus /> Create Product {/* Create product button */}
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />} {/* Show loader while creating product */}
			{loadingDelete && <Loader />} {/* Show loader while deleting product */}
			{isLoading ? ( // Show loader while fetching products data
				<Loader />
			) : error ? ( // Show error message if there's an error fetching products data
				<Message variant='danger'>{error.data.message}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						{/* Product table */}
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data.products.map(
								(
									product // Map through products to display each product row
								) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>
											{/* Edit and delete buttons */}
											<Button
												as={Link}
												to={`/admin/product/${product._id}/edit`}
												variant='light'
												className='btn-sm mx-2'
											>
												<FaEdit />
											</Button>
											<Button
												variant='danger'
												className='btn-sm'
												onClick={() => deleteHandler(product._id)}
											>
												<FaTrash style={{ color: 'white' }} />
											</Button>
										</td>
									</tr>
								)
							)}
						</tbody>
					</Table>
					<Paginate pages={data.pages} page={data.page} isAdmin={true} />{' '}
					{/* Pagination component */}
				</>
			)}
		</>
	);
};

export default ProductListScreen;
