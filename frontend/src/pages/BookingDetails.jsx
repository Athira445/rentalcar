import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingDetails.css';

const BookingDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { booking } = state || {};

  if (!booking) {
    return <div className="no-details-message">No booking details available.</div>;
  }

  return (
    <div className="booking-details-container">
      <h2>Booking Details</h2>
      <div className="details-card">
        <h3>{booking.carDetails?.brand}</h3>
        <p><strong>Full Name:</strong> {booking.renterDetails?.fullName}</p>
        <p><strong>Contact Number:</strong> {booking.renterDetails?.phone}</p>
        <p><strong>Total Price:</strong> Rs. {booking.amount}</p>
        <p className={`status ${booking.status === 'success' ? 'success' : 'pending'}`}>
          <strong>Status:</strong> {booking.status}
        </p>
      </div>
      
      <button className="back-btn" onClick={() => navigate('/')}>Logout</button>
    </div>
  );
};

export default BookingDetails;
