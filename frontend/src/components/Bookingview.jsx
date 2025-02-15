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

  // Handle status change from the dropdown
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // Send a PUT request to update the status.
      await axios.put(`http://localhost:4000/api/payments/status/${bookingId}`, { status: newStatus });
      // Update local state accordingly.
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId
            ? { ...booking, status: newStatus, isConfirmed: newStatus === 'confirmed' }
            : booking
        )
      );
      alert("Booking status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating booking status");
    }
  };
  

  return (
    <div className="admin-bookings-container">
      <h2>Bookings for Confirmation</h2>
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
              
              <th>Current Status</th>
              <th>Change Status</th>
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
                <td className={booking.isConfirmed ? "confirmed" : "pending"}>
                  {booking.status.toUpperCase()}
                </td>
                <td>
                  <select
                    value={booking.status.toLowerCase()}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookingview;
