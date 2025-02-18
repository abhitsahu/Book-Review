import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './UpdateProfileModal.css';

const UpdateProfileModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/profile/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      onUpdate(response.data);
      toast.success('Profile updated successfully!');
      onClose();
      window.location.reload(); // Refresh the page after successful update
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="modal">
    <ToastContainer />
      <div className="modal-content">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn">Save Changes</button>
            <button type="button" className="btn cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateProfileModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateProfileModal; 