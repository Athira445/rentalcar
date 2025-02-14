import React from 'react';
import './About.css'; // Import the CSS for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2>About Company</h2>
        <h3>You start the engine and your adventure begins</h3>
        <p>
          Certain but she but shyness why cottage. Guy the put instrument sir entreaties affronting. Pretended exquisite see cordially the you. Weeks quiet do vexed or whose. Motionless if no to affronting imprudence no precaution. My indulged as disposal strongly attended.
        </p>
        <div className="icons">
          <span>🚐</span>
          <span>🏢</span>
          <span>🚛</span>
        </div>
        <p className="contact-text">We are at your service. Feel free to contact.</p>
      </div>
      <div className="about-us-image">
        <img src="About1.png" alt="About Us" />
      </div>
    </div>
  );
};

export default AboutUs;