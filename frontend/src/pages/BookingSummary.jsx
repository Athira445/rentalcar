import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
 // Optional: Add styles

const BookingSummary = () => {
  const location = useLocation();
  const { bookingId } = location.state; // Retrieve bookingId from route state

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/bookings/${bookingId}`);
        setBooking(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching booking details');
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="booking-summary-container">
      <h2>Booking Summary</h2>
      <div className="booking-details">
       
        <p><strong>Car Brand:</strong> {booking.carBrand}</p>
        <p><strong>Full Name:</strong> {booking.fullName}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Phone:</strong> {booking.phone}</p>
        <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
        <p><strong>Number of Days:</strong> {booking.days}</p>
        <p><strong>Price Per Day:</strong> ${booking.pricePerDay}</p>
        <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
      </div>
    </div>
  );
};

export default BookingSummary;
