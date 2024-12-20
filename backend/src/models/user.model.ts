import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface User extends Document {
  id: string;
  avatar?: string;
  microsoftId: string;
  name: string;
  email: string;
  password: string;
  role?: string[]; // 'ADMIN' | 'Lead' | 'Tech' | 'Material' | 'Travel' | 'Cost';
  bio: string;
  createdAt: Date;
  updateAt: Date;
}

const UserSchema = new Schema<User>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    microsoftId: {
      type: String,
    },
    avatar: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
      type: [String],
    },
    bio: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>('User', UserSchema);
