import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to Users collection
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  carBrand: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  days: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
