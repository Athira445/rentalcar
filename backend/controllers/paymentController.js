// paymentController.js

import Stripe from 'stripe';
import Payment from '../models/Payment.js'; // Assuming you have a Payment model

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

// Process Payment function
export const processPayment = async (req, res) => {
  const { userId,amount, paymentMethodId, carDetails, renterDetails } = req.body;

  try {
    // Create a Payment Intent on the server
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert the amount to cents
      currency: 'inr', // Your currency
      payment_method: paymentMethodId,
      confirm: false, // Do not confirm immediately, wait for the client to confirm
    });

    // Save the payment details to the database
    const payment = new Payment({
      userId,
      paymentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: amount,
      carDetails: carDetails,
      renterDetails: renterDetails,
    });

    await payment.save(); // Save the payment record in the database

    // Send the client_secret back to the frontend
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret, // Send the client secret to the frontend
    });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again.',
    });
  }
};

// Get Payment Status function
export const getPaymentStatus = async (req, res) => {
  const { transactionId } = req.params;

  try {
    // Find the payment record by transaction ID
    const payment = await Payment.findOne({ paymentId: transactionId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    // Return the payment status and transactionId
    res.status(200).json({
      success: true,
      paymentStatus: payment.status,
      transactionId: payment.paymentId,
    });
  } catch (error) {
    console.error('Payment Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again.',
    });
  }
};
