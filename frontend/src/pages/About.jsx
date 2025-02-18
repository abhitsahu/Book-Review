import React from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to MyApp! We are dedicated to providing you with the best book recommendations and reviews.
        Our mission is to help you discover amazing literature that enriches your life.
      </p>
      <p>
        Our team consists of passionate readers and writers who believe in the power of stories to inspire and transform.
        We strive to create a community where book lovers can connect, share, and explore new ideas.
      </p>
      <button className="learn-more-button">Learn More</button>
    </div>
  );
};

export default About;
