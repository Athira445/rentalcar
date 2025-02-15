import Car from "../models/Car.js";

// Fetch all cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all cars from the database
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Error fetching cars!" });
  }
};

// Delete a car by ID
export const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByIdAndDelete(id);
    if (car) {
      res.status(200).json({ message: "Car deleted successfully!" });
    } else {
      res.status(404).json({ message: "Car not found!" });
    }
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Error deleting car!" });
  }
};
