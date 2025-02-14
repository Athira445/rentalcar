import express from 'express';
import multer from 'multer';
import path from 'path';
import Car from '../models/Car.js'; // Import the Car model

const router = express.Router();

// Set up multer storage to save uploaded files in the 'public' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');  // Save the image directly in the public folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));   // Unique name based on timestamp
  }
});

const upload = multer({ storage: storage });

// Route to add a car
router.post('/add-cars', upload.single('imgFile'), async (req, res) => {
  const { brand, carName, model, price } = req.body;
  const imgFile = req.file ? req.file.filename : null;
  console.log('Received data:', { brand, carName, model, price, imgFile });
  console.log('File details:', req.file);  // Get the file name of the uploaded image

  // Check if all required fields are present
  if (!brand || !carName || !model || !price || !imgFile) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Debugging: Log the data being received
    console.log('Received car data:', { brand, carName, model, price, imgFile });

    // Create a new car record
    const car = new Car({
      brand,
      carName,
      model,
      price,
      imgFile, // Save the filename in the database
    });

    // Save the car to the database
    await car.save();
    
    // Respond with success
    res.status(200).json({
      message: 'Car added successfully!',
      carDetails: car,
    });
  } catch (error) {
    // Handle any errors
    console.error('Error saving car:', error);
    res.status(500).json({ message: 'Error adding car!' });
  }
});

// Route to get all cars
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all cars from the database
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Error fetching cars!' });
  }
});

// Route to delete a car
router.delete('/cars/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByIdAndDelete(id); // Find and delete the car by ID

    if (!car) {
      return res.status(404).json({ message: 'Car not found!' });
    }

    res.status(200).json({ message: 'Car deleted successfully!', car });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Error deleting car!' });
  }
});

// Route to update car details
router.put('/cars/:id', upload.single('imgFile'), async (req, res) => {
  const { id } = req.params;
  const { brand, carName, model, price } = req.body;
  const imgFile = req.file ? req.file.filename : null;

  try {
    // Find the car by its ID
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found!' });
    }

    // Update the car's details
    car.brand = brand || car.brand;
    car.carName = carName || car.carName;
    car.model = model || car.model;
    car.price = price || car.price;
    car.imgFile = imgFile || car.imgFile; // Update the image only if a new one is provided

    // Save the updated car details
    await car.save();

    // Respond with the updated car data
    res.status(200).json({
      message: 'Car updated successfully!',
      carDetails: car,
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Error updating car!' });
  }
});

export default router;
