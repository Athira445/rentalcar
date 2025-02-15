import React from 'react';
import './About.css'; // Import the CSS for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2>About Company</h2>
        <h3>You start the engine and your adventure begins</h3>
        <p>
        You start the engine, and your adventure begins. Whether you're exploring new cities, heading on a business trip, or planning a weekend getaway, our car rental service ensures a smooth and hassle-free experience. With a diverse fleet of well-maintained vehicles and a seamless booking process, we make travel effortless. Drive with confidence, knowing that comfort, reliability, and affordability are at the heart of our service. Wherever the road takes you, we’re here to get you there.
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