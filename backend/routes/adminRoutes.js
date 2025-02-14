import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const router = express.Router();

// Hardcoded admin credentials (in a real-world scenario, you would store these in a database)
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD; // Should be hashed in production

// Admin Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === adminEmail && password === adminPassword) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({
            success: true,
            token,
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

export default router;
