import mongoose, { Document, Schema, Model } from 'mongoose';

// Define TypeScript interface for User
export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

// Define Mongoose schema with type
const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

// Create Mongoose model with the interface
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema) || mongoose.model<IUser>('User', UserSchema);

export default User;
