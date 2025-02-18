import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling
import { useDispatch, useSelector } from 'react-redux'
// import { useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { toast } from 'react-toastify'; // Import ToastContainer and toast

const Navbar = () => {

  // const isLogedIn = useSelector((state)=> state.isLogedIn);
  const dispatch = useDispatch(); //useDispatch is use to call the function of redux file
  const user = useSelector((state) => state.auth.user); // Get user from Redux state
  // console.log(isLogedIn);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    sessionStorage.removeItem('userId'); // Remove user ID from session storage
    sessionStorage.removeItem('token');
    toast.success('Logout successful!');

  }
  // console.log(user.role);

  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">Book App</Link>
      </div>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <Link to="/books" onClick={toggleMenu}>Books</Link>
        {!user ? ( // If user is not logged in
          <>
            <Link to="/login" onClick={toggleMenu}>Login</Link>
            <Link to="/register" onClick={toggleMenu}>Register</Link>
            <Link to="/about" onClick={toggleMenu}>About</Link>
          </>
        ) : ( // If user is logged in
          <>
            {user?.role === "admin" && (
                 <Link to="/add-book" onClick={toggleMenu}>Add Book</Link>
             )}
            <Link to="/about" onClick={toggleMenu}>About</Link>
            <Link to="/profile" onClick={toggleMenu}>Profile</Link>
            <Link to="/login" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;