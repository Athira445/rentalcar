import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Route to register a user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

export default router;
