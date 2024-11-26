import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface WbsDocument extends Document {
  id: string;
  proposalId: string;
  wbsNumber: string;
  wbsTitle: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const WbsSchema = new Schema<WbsDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    proposalId: { type: String },
    wbsNumber: { type: String },
    wbsTitle: { type: String },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const WbsModel = model<WbsDocument>('Wbs', WbsSchema);
