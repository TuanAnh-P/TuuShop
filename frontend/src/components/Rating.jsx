import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Define a functional component for displaying star ratings
const Rating = ({ value, text, color }) => {
	return (
		<div className='rating'>
			{' '}
			{/* Container for the rating */}
			<span>
				{' '}
				{/* First star */}
				{value >= 1 ? ( // Full star if value is 1 or more
					<FaStar />
				) : value >= 0.5 ? ( // Half star if value is between 0.5 and 1
					<FaStarHalfAlt />
				) : (
					// Empty star if value is less than 0.5
					<FaRegStar />
				)}
			</span>
			<span>
				{' '}
				{/* Second star */}
				{value >= 2 ? (
					<FaStar />
				) : value >= 1.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span>
				{' '}
				{/* Third star */}
				{value >= 3 ? (
					<FaStar />
				) : value >= 2.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span>
				{' '}
				{/* Fourth star */}
				{value >= 4 ? (
					<FaStar />
				) : value >= 3.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span>
				{' '}
				{/* Fifth star */}
				{value >= 5 ? (
					<FaStar />
				) : value >= 4.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span className='rating-text'>{text && text}</span>{' '}
			{/* Optional text for rating */}
		</div>
	);
};

// Default props for the Rating component
Rating.defaultProps = {
	color: '#f8e825', // Default color for stars
};

export default Rating;
