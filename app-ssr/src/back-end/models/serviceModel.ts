import mongoose, { Document, Schema, Model } from 'mongoose';

// Define TypeScript interface for Service
export interface IService extends Document {
  name: string;
  description: string;
}

// Define Mongoose schema
const ServiceSchema: Schema<IService> = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

// Create Mongoose model with the interface
const Service: Model<IService> = mongoose.model<IService>('Service', ServiceSchema) || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
