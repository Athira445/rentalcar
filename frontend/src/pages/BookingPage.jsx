import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css';

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { car, user } = state || {}; // Get car and user details from navigation state
  const [days, setDays] = useState(1); // Default days to 1
  const [totalPrice, setTotalPrice] = useState(car ? car.price : 0); // Initial total price
  const [method, setMethod] = useState('stripe'); // Default payment method
  const [renterInfo, setRenterInfo] = useState({
    fullName: user ? user.fullName : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    bookingDate: '',
  });

  if (!car) {
    return <div>No car selected. Please go back and select a car.</div>;
  }

  const handleDaysChange = (e) => {
    const selectedDays = parseInt(e.target.value) || 1;
    setDays(selectedDays);
    setTotalPrice(car.price * selectedDays);
  };

  const handleInputChange = (e) => {
    setRenterInfo({ ...renterInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      userId: user ? user.userId : '', // Include user ID in the backend request
      ...renterInfo,
      days,
      carName: car.name,
      carBrand: car.brand,
      pricePerDay: car.price,
      totalPrice,
      paymentMethod: method === 'cod' ? 'Pay on Arrival' : method,
    };

    if (method === 'stripe') {
      navigate('/payment', { state: { car, renterInfo, totalPrice,days, userId: user?.userId } });
    } else if (method === 'razorpay') {
      alert('Razorpay integration is not implemented in this demo.');
    } else if (method === 'cod') {
      try {
        const response = await axios.post('http://localhost:4000/api/bookings', bookingData);
        const { bookingId } = response.data;
        navigate('/booking-collection', { state: { bookingId } });
      } catch (error) {
        console.error('Error confirming booking:', error);
        alert('Failed to confirm booking. Please try again.');
      }
    }
  };

  return (
    <div className="booking-page-container">
      <div className="booking-form-container">
        <form onSubmit={handleSubmit} className="booking-form">
          <h3>Booking Information for {car.name}</h3>
          <label>
            Full Name:
            <input type="text" name="fullName" value={renterInfo.fullName} onChange={handleInputChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={renterInfo.email} onChange={handleInputChange} required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone" value={renterInfo.phone} onChange={handleInputChange} required />
          </label>
          <label>
            Booking Date:
            <input type="date" name="bookingDate" value={renterInfo.bookingDate} onChange={handleInputChange} required />
          </label>
          <label>
            Number of Days:
            <input type="number" name="days" min="1" value={days} onChange={handleDaysChange} required />
          </label>
          <button type="submit" className="book-now-btn">
            Book Now for Rs. {totalPrice}
          </button>
        </form>
      </div>

      <div className="payment-methods-container">
        <h3>Select Payment Method</h3>
        <div className="payment-methods">
          <div onClick={() => setMethod('stripe')} className={`payment-option ${method === 'stripe' ? 'selected' : ''}`}>
            <img className="payment-logo" src="stripe.png" alt="Stripe Logo" />
            <p>Stripe</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
