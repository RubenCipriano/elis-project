import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env['MONGO_URI'] as string;

    if (!mongoURI) {
      throw new Error('MONGO_URI não está definido no arquivo .env');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro de conexão com MongoDB:', err);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
