import mongoose from 'mongoose';

// Define the schema for the user
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['admin','owner', 'renters'],  
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
