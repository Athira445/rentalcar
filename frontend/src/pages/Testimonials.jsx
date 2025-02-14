import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      message:
        "We rented a car from this website and had an amazing experience! The booking was easy and the rental rates were very affordable.",
      name: "Mary Potter",
      photo: "person1.png", // Replace with actual image link or local image
    },
    {
      id: 2,
      message:
        "The car was in great condition and made our trip even better. Highly recommend for this car rental website!",
      name: "Ron Reizley",
      photo: "person2.png", // Replace with actual image link or local image
    },
  ];

  return (
    <div className="testimonial-section">
      <h1>Reviewed by People</h1>
      <h2>Client's Testimonials</h2>
      <p>
        Discover the positive impact we've made on our clients by reading through their testimonials. Our clients have experienced our service and results, and they're eager to share their positive experiences with you.
      </p>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div className="testimonial" key={testimonial.id}>
            <p>"{testimonial.message}"</p>
            <div className="client-info">
              <img src={testimonial.photo} alt="Client" />
              <span>{testimonial.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;