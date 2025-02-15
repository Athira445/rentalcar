import express from 'express';
import Booking from '../models/Booking.js';
const router = express.Router();

// Route to confirm booking
router.post('/api/payments', async (req, res) => {
  const {
    userId,
    fullName,
    email,
    phone,
    
    carBrand,
    pricePerDay,
    days,
    totalPrice,
    bookingDate,
  } = req.body;

  try {
    // Create a new booking instance with the provided data
    const newBooking = new Booking({
      userId,
      fullName,
      email,
      phone,
     
      carBrand,
      pricePerDay,
      days,
      totalPrice,
      bookingDate,
    });

    // Save the booking to the database
    await newBooking.save();

    // Send confirmation response with the booking ID
    res.status(201).json({ message: 'Booking confirmed', bookingId: newBooking._id });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Error confirming booking', error });
  }
});

export default router;
