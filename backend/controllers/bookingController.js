import Booking from '../models/Booking.js'; // Your Booking model
import Car from '../models/Car.js'; // Your Car model (assuming you have a Car model)

// Controller to get all bookings
const getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings, optionally populating car details
    const bookings = await Booking.find().populate('carDetails'); // Assuming 'carDetails' is the reference to the car model
    
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    // Return the bookings as a response
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getAllBookings,
};
