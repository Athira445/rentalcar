// models/Payment.js
import mongoose from "mongoose";

// Define the schema for storing payment details
const paymentSchema = new mongoose.Schema(
  {

  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    paymentId: { type: String, required: true, unique: true }, // Stripe payment ID
    status: { type: String, required: true }, // Payment status (e.g., succeeded, failed)
    amount: { type: Number, required: true }, 
    
    status: { type: String, default: 'pending' }, // Default to "pending"
  isConfirmed: { type: Boolean, default: false },// Amount in INR
    carDetails: {
     
      brand: { type: String, required: true }, // Car brand
    },
    renterDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      bookingDate: { type: String, required: true }, // Booking date
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model
const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
