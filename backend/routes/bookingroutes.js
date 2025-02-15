import express from "express";
import Booking from "../models/Booking.js"; 
import Payment from "../models/Payment.js";


import { getAllBookings } from '../controllers/bookingController.js'; // Adjust the path based on your directory structure

const router = express.Router();

// Fetch all bookings
router.get('/api/payments/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

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
// ✅ Fetch all bookings from `payments` collection
router.get('/', async (req, res) => {
  try {
    const bookings = await Payment.find(); // ✅ Fetch from `payments`
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});



// ✅ Admin confirms booking
router.put('/confirm/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const updatedBooking = await Payment.findByIdAndUpdate(
      bookingId,
      { isConfirmed: true, status: 'confirmed' }, // ✅ Mark as confirmed
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking confirmed successfully', updatedBooking });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Failed to confirm booking' });
  }
});

// ✅ Admin cancels booking
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
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
});





router.get('/payments',  getAllBookings);

export default router;
