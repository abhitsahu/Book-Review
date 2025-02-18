import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import PropTypes
import ReviewForm from '../components/ReviewForm'; // Import the ReviewForm component
import './BookDetails.css'; // Import CSS for styling

import axios from 'axios';


// import './BookCard.css'; // Optional: for styling

const BookDetails = ({ book }) => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux state
  const [showReviewForm, setShowReviewForm] = useState(false); // State to toggle review form
  const [reviews,setReviews]=useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${book._id}`); // Adjust the endpoint if needed
        // console.log(response);
        setReviews(response.data); // Assuming the response contains an array of reviews
      } catch (error) {
        console.error("Error fetching reviews:", error.response?.data || error);
      }
    };
  
    fetchReviews();
  }, [])
  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm); // Toggle the review form visibility
  };

  // Use useCallback to memoize the fetchReviews function
  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${book._id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [book._id]); // Dependency on book._id

  useEffect(() => {
    fetchReviews(); // Fetch reviews when the component mounts or when book._id changes
  }, [fetchReviews]); // Include fetchReviews in the dependency array

  return (
    <div className="book-details-container">
      <div className="book-card">
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author}</p>
        <p>{book.description}</p>
        <h4>Reviews:</h4>

        {reviews && reviews.length > 0 ? (

          reviews.map((review) => (
            <div key={review._id} className="review">
              <p><strong>Rating:</strong> {review.rating}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
        {user && ( // Show the button only if the user is logged in
          <div>
            <button className="review-button" onClick={toggleReviewForm}>
              {showReviewForm ? 'Hide Review Form' : 'Post a Review'}
            </button>
            {showReviewForm && <ReviewForm bookId={book._id} />} {/* Conditionally render the ReviewForm */}
          </div>
        )}
      </div>
    </div>
  );
};

// Add prop types validation
BookDetails.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Validate _id
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string,
      })
    ),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookDetails;