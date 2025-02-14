import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bookingview.css';

const Bookingview = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  // Fetch all bookings from the payments collection
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/payments');
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="admin-bookings-container">
      <h2>Bookings</h2>
      {error && <p className="error">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Car Brand</th>
              <th>Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.renterDetails?.fullName || "N/A"}</td>
                <td>{booking.carDetails?.brand || "N/A"}</td>
                <td>
                  {booking.renterDetails && booking.renterDetails.bookingDate
                    ? new Date(booking.renterDetails.bookingDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>Rs. {booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookingview;
