import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Import toast for notifications
import './AddBook.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedDate: '',
  });

  // const user = useSelector((state) => state.auth.user); 
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/books/addbook`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      });
      toast.success('Book added successfully!'); // Show success toast
      // Optionally, reset the form
      setFormData({
        title: '',
        author: '',
        description: '',
      });
      navigate('/books')
    } catch (error) {
      // console.error('Error adding book:', error);
      toast.error(error,'Failed to add book. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="add-book">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;