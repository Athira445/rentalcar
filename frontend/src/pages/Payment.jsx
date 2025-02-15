import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Payment.css';
import { CheckCircle } from 'lucide-react'; // For a tick mark icon

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { car, renterInfo, totalPrice,days } = state || {};

  if (!car || !renterInfo) {
    navigate('/booking');
    return null;
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentError('');
    setPaymentSuccess(false);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setIsProcessing(false);
      return;
    }
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setPaymentError("User not logged in");
      setIsProcessing(false);
      return;
    }

    
      const paymentData = {
        userId: localStorage.getItem('userId'), 
        amount: totalPrice,
        paymentMethodId: paymentMethod.id,
        carDetails: car,
        renterDetails: renterInfo,
       
      };
      console.log("Sending Payment Data:", paymentData);
      try {
        // Send a POST request with proper headers
        const response = await axios.post(
          'http://localhost:4000/api/complete-payment',
          paymentData,
          { headers: { 'Content-Type': 'application/json' } }
        );

      

      if (response.data.success) {
        setPaymentSuccess(true);
        setIsProcessing(false);

        setTimeout(() => {
          navigate('/mybooking');
        }, 3000); // Redirect to confirmation page after 3 seconds
      } else {
        setPaymentError('Payment failed. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
      console.error("Payment Error:", err);
      setPaymentError('Payment processing error. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="payment-page-container">
      <div className="payment-details-left">
        <h2>Car Details</h2>
        <p><strong>Brand:</strong> {car.brand}</p>
        <p><strong>Price per Day:</strong> Rs. {car.price}</p>
       
        <p><strong>Total Price:</strong> Rs. {totalPrice}</p>
        <h3>Renter Information</h3>
        <p><strong>Name:</strong> {renterInfo.fullName}</p>
        <p><strong>Email:</strong> {renterInfo.email}</p>
        
        <p><strong>Phone:</strong> {renterInfo.phone}</p>
      </div>

      <div className="payment-details-right">
        <h2>Payment</h2>
        <p><strong>Amount to Pay:</strong> Rs. {totalPrice}</p>

        {paymentSuccess ? (
          <div className="payment-success">
            <CheckCircle color="green" size={48} />
            <p>Payment Successful!</p>
          </div>
        ) : (
          <form onSubmit={handlePayment}>
            <div className="card-input-container">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                placeholder="Enter Card Number"
                maxLength="16"
                type="text"
                className="card-input"
              />
            </div>

            <div className="card-input-container">
              <label>Card Information:</label>
              <CardElement className="card-element" />
            </div>

            {paymentError && <div className="error-message">{paymentError}</div>}

            <button
              type="submit"
              disabled={isProcessing || !stripe || !elements}
              className="pay-now-btn"
            >
              {isProcessing ? 'Processing...' : 'Confirm Payment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;
