import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface WBSDocument extends Document {
  id: string;
  boeId: string;
  title: string;
  wbsCode: string;
}

const WbsSchema = new Schema<WBSDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    boeId: {
      type: String,
    },
    title: {
      type: String,
    },
    wbsCode: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const WbsModel = model<WBSDocument>('Wbs', WbsSchema);
