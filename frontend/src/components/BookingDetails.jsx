import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingDetails = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) {
    return <div>No booking details available</div>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Full Name: {booking.fullName}</p>
      <p>Email: {booking.email}</p>
      <p>Phone: {booking.phone}</p>
      <p>Car Name: {booking.carName}</p>
      <p>Car Brand: {booking.carBrand}</p>
      <p>Price Per Day: ${booking.pricePerDay}</p>
      <p>Number of Days: {booking.days}</p>
      <p>Total Price: ${booking.totalPrice}</p>
      <p>Booking Date: {booking.bookingDate}</p>
    </div>
  );
};

export default BookingDetails;
