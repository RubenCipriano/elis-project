import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Function to connect to MongoDB
const connectDB = async (): Promise<void> => {
  await mongoose.connect("mongodb://localhost:27017/elis-database");
  console.log('MongoDB conectado');
};

export default connectDB;