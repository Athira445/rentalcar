import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  carName: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  imgFile: { type: String, required: true }, // Store the file name
  
});

const Car = mongoose.model('Car', carSchema);

export default Car;
