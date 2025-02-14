import express from "express";
import User from "../models/UserModel.js"; // Adjust path according to your project

const router = express.Router();


// Fetch users with the userType 'renter'
// Fetch users with the userType 'renters'
router.get("/users", async (req, res) => {
  try {
    // Fetch users where userType is 'renters'
    const renters = await User.find({ userType: "renters" }, "username email userType");

    if (!renters || renters.length === 0) {
      return res.status(404).json({ message: "No renters found" });
    }

    // Send the renters data as a JSON response
    res.status(200).json(renters);
  } catch (error) {
    console.error("Error fetching renters:", error);
    res.status(500).json({ message: "Error retrieving renters", error: error.message });
  }
});
router.delete('/users/delete', async (req, res) => {
  try {
    const { userId } = req.body; // Get user ID from request body

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error while deleting user" });
  }
});



export default router;
