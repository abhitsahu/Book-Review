import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Import toast for notifications
import PropTypes from 'prop-types'; // Import PropTypes
import './ReviewForm.css'; // Import CSS for styling
import axios from 'axios';

const ReviewForm = ({ bookId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from Redux state
  const token = useSelector((state) => state.auth.token);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/`, 
        { book: bookId, rating, comment }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );
    toast.success('Review submitted successfully!');

    // Reset the form
    setRating(0);
    setComment('');
    window.location.reload();
    }
    catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Post a Review</h3>
      <div className="rating">
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="0">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <div className="comment">
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Write your review here..."
        />
      </div>
      <button type="submit" className="submit-button">Submit Review</button>
    </form>
  );
};

// Add prop types validation
ReviewForm.propTypes = {
  bookId: PropTypes.string.isRequired, // Validate bookId
};

export default ReviewForm; 