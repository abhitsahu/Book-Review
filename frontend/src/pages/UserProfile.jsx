import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import UpdateProfileModal from '../components/UpdateProfileModal'; // Import the modal component

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user); // Get user from Redux state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user profile by user ID
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/profile/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token for authentication
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleUpdate = (updatedUser) => {
    setUserDetails(updatedUser); // Update user details with the response
  };

  if (!userDetails) {
    return <div className="loading">Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="user-profile">
      <div className="profile-card">
        <h2>Hey, {userDetails.name}</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          {/* Add more user details as needed */}
        </div>
        <button className="btn update-btn" onClick={() => setIsModalOpen(true)}>Update Profile</button>
      </div>

      {isModalOpen && (
        <UpdateProfileModal 
          user={userDetails} 
          onClose={() => setIsModalOpen(false)} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
};

export default UserProfile; 