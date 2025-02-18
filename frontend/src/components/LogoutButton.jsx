import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('userId'); // Remove user ID from session storage
    alert('You have logged out successfully.');
  };

  // Check if user ID exists in session storage
  const userId = sessionStorage.getItem('userId');
  if (!userId) return null; // Don't render the button if the user is not logged in

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton; 