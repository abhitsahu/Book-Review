import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/books'); // Redirect to the signup page
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to MyApp</h1>
        <p>Your journey to discover amazing books starts here.</p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;