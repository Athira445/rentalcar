import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { registerUser, loginUser } from './controllers/authController.js';
import carRoutes from './routes/carRoutes.js';
import bookings from './routes/bookings.js'; 
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from "./routes/userroutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import { processPayment } from './controllers/paymentController.js';



dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

// Authentication Routes
app.post('/register', registerUser);
// app.post('/login', loginUser);
app.post('/api/login', loginUser);
// app.use('/api/admin', adminRoutes);


// Car Routes - Now accessible under /api/cars
app.use('/public', express.static('public'));
app.use('/api', carRoutes);  
app.use('/api/payments', paymentRoutes); 
app.use("/api", bookingRoutes); 
app.use("/api", userRoutes);


// ✅ Use Payment Routes

app.post('/api/complete-payment', processPayment);

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in the smallest currency unit (e.g., paise for INR)
      currency: 'inr',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

// API route to fetch users
app.get('/api/users', async (req, res) => {
  try {
    const users = await users.find();
    console.log("Fetched Users:", users); // Debugging log
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
// Route to get all renters
app.delete('/api/users/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});





// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
