import express from 'express';
import { processPayment, getPaymentStatus } from '../controllers/paymentController.js';

import Payment from '../models/Payment.js';

const router = express.Router();

// Route to process payment
router.post('/api/complete-payment', async (req, res) => {
  try {
    // Destructure all required fields from the request body
    const { userId, amount, paymentMethodId, carDetails, renterDetails } = req.body;
    
    // Check if the necessary data is provided
    if (!userId || !amount || !paymentMethodId || !carDetails || !renterDetails) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // Process payment logic (e.g., Stripe) using the helper function.
    // The processPayment function should accept these parameters and return an object with a success flag and optionally a clientSecret.
    const paymentResponse = await processPayment(userId, amount, paymentMethodId, carDetails, renterDetails);
    
    if (paymentResponse.success) {
      // Save payment details to the database if successful
      const payment = new Payment({
        userId,
        amount,
        paymentMethodId,
        carDetails,
        renterDetails,
        status: 'success'
      });
      await payment.save();
      
      return res.status(200).json({
        success: true,
        message: 'Payment completed successfully',
        clientSecret: paymentResponse.clientSecret // optional, if you use clientSecret on the frontend
      });
    } else {
      return res.status(500).json({ success: false, message: 'Payment processing failed' });
    }
  } catch (error) {
    console.error('Payment Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
  }
});
  
// ✅ Route to get all payments for a specific user
router.get('/:userId', async (req, res) => { // ✅ No need to repeat '/api/payments'
  try {
    const { userId } = req.params;

    console.log(`Fetching payments for userId: ${userId}`); // ✅ Debugging log

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const payments = await Payment.find({ userId });

    if (!payments.length) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

router.put('/api/payments/confirm/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { isConfirmed: true, status: 'confirmed' }, // ✅ Mark as confirmed
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ message: 'Booking confirmed successfully', updatedPayment });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Failed to confirm booking' });
  }
});
router.get('/', async (req, res) => {
  try {
    const bookings = await Payment.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
});
// Confirm a booking
router.put('/confirm/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updatedBooking = await Payment.findByIdAndUpdate(
      bookingId,
      { isConfirmed: true, status: 'confirmed' },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking confirmed successfully', updatedBooking });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Failed to confirm booking', error: error.message });
  }
});

// Cancel a booking
router.delete('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deletedBooking = await Payment.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
});
router.put('/status/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    // Optionally, validate that 'status' is one of the allowed values.
    const updatedBooking = await Payment.findByIdAndUpdate(
      bookingId,
      { status, isConfirmed: status === 'confirmed' },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking status updated successfully', updatedBooking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Failed to update booking status', error: error.message });
  }
});




// Route to get payment status (optional, if needed)
router.get('/payment-status/:transactionId', getPaymentStatus);



export default router;
