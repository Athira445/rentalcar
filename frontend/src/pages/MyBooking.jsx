import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyBooking.css';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    console.log('Fetching bookings for userId:', userId);

    axios.get(`http://localhost:4000/api/payments/${userId}`)
      .then((response) => {
        if (response.data.length === 0) {
          console.warn('No bookings found for this user.');
        }
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error.response ? error.response.data : error.message);
      });
  }, [userId]);

  const handleViewDetails = (booking) => {
    navigate('/booking-details', { state: { booking } }); // Send booking data to details page
  };

  if (!userId) {
    return <div className="no-bookings-message">Please log in to view your bookings.</div>;
  }

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings-message">No bookings found.</p>
      ) : (
        <div className="booking-cards">
          {bookings.map((booking) => {
            // Format the booking date from the bookingDate field (if available)
            const formattedDate = booking.bookingDate 
              ? new Date(booking.bookingDate).toLocaleDateString() 
              : 'N/A';
              const totalDays = booking.renterDetails?.days || booking.days || 'N/A';
            return (
              <div className="booking-card" key={booking._id}>
                <div className="card-header">
                  <h3>{booking.carDetails?.brand || 'Unknown Brand'}</h3>
                  <span className={`status ${booking.isConfirmed ? 'confirmed' : 'pending'}`}>
                    {booking.isConfirmed ? "CONFIRMED" : "PROCESSING"}
                  </span>
                </div>
                <div className="card-body">
                  <p><strong>Full Name:</strong> {booking.renterDetails?.fullName || 'N/A'}</p>
                  <p><strong>Booking Date:</strong> {booking.renterDetails?.bookingDate}</p>
                  <p><strong>Contact Numer:</strong> {booking.renterDetails?.phone || 'N/A'}</p>
                  <p><strong>Total Price:</strong> Rs. {booking.amount}</p>
                </div>
                <div className="card-footer">
                  <button className="view-details-btn" onClick={() => handleViewDetails(booking)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
