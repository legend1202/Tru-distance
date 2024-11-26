import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ClinDocument extends Document {
  id: string;
  proposalId: string;
  clinNumber: string;
  clinTitle: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const Clinchema = new Schema<ClinDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    proposalId: { type: String },
    clinNumber: { type: String },
    clinTitle: { type: String },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const ClinModel = model<ClinDocument>('Clin', Clinchema);
