import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ReviewForm from '../components/ReviewForm';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = ({ book }) => {
  const user = useSelector((state) => state.auth.user);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state

  // Fetch reviews
  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${book._id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [book._id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="book-details-container">
      <div className="book-card">
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author}</p>
        <p>{book.description}</p>

        {user && (
          <div>
            <button className="review-button" onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? 'Hide Review Form' : 'Post a Review'}
            </button>
            {showReviewForm && <ReviewForm bookId={book._id} />}
          </div>
        )}

        {/* Show "View All Reviews" Button */}
        {reviews.length > 0 && (
          <button className="view-reviews-button" onClick={() => setShowModal(true)}>
            View All Reviews ({reviews.length})
          </button>
        )}
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>All Reviews</h3>
            <button className="close-modal" onClick={() => setShowModal(false)}>✖</button>
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review._id} className="review-item">
                  <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                  <p><strong>Comment:</strong> {review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
BookDetails.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default BookDetails;
