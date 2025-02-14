import bcrypt from 'bcrypt';  // For password hashing
import User from '../models/UserModel.js';  // User model
import jwt from 'jsonwebtoken';  // For creating JWT tokens
import dotenv from 'dotenv';  // To use environment variables

dotenv.config();  // Load environment variables from .env file

// Function to create JWT token
const createToken = (userId, userType) => {
    return jwt.sign(
        { userId, userType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password, userType } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            userType,
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = createToken(newUser._id, newUser.userType);

        // Respond with success message and the token
        res.status(201).json({
            message: "Registration successful!",
            user: {
                username: newUser.username,
                email: newUser.email,
                userType: newUser.userType,
                token,
            },
        });
    } catch (error) {
        console.error("Error during registration:", error);
        if (error.code === 11000) {
            // Handle duplicate email error
            return res.status(400).json({ message: "Email is already registered" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

// Unified Login Function (Handles both Admin & User login)
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the login is for Admin
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = createToken(email, "admin");
            return res.json({
                success: true,
                message: "Admin login successful",
                user: { email, userType: "admin", token },
            });
        }

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = createToken(user._id, user.userType);

        // Send back user data and token
        res.json({
            success: true,
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email,
                userType: user.userType,
                token,
            },
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

