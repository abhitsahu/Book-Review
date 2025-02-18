import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookDetails from '../pages/BookDetails';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books/book`); // Adjust the URL as necessary
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-list-container">
      <h2>Book List</h2>
      {books.length > 0 ? (
        books.map((book) => (
          <BookDetails key={book._id} book={book} />
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookList;