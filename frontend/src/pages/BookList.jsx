import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BookDetails from '../pages/BookDetails';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const topRef = useRef(null);

  const fetchBooks = async (pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/books/book?page=${pageNumber}&limit=5`); // Fetch books with pagination
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  useEffect(() => {
    if (books.length > 0) {
      topRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to top when page changes
    }
  }, [books]);

  return (
    <div className="book-list-container">
      <h2 ref={topRef}>Book List</h2>
      {books.length > 0 ? (
        books.map((book) => <BookDetails key={book._id} book={book} />)
      ) : (
        <p>No books available.</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
