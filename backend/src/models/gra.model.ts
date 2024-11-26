import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface GraDocument extends Document {
  id: string;
  proposalId: string;
  wbsId: string;
  clinId: string;
  boeId: string;
  description: string;
  status: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

const GraSchema = new Schema<GraDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    proposalId: { type: String },
    wbsId: { type: String },
    clinId: { type: String },
    boeId: { type: String },
    description: { type: String },
    status: { type: Boolean },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const GraModel = model<GraDocument>('Gra', GraSchema);
