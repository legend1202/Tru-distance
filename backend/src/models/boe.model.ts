import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface BoeDocument extends Document {
  id: string;
  proposalId: string;
  wbsId: string;
  clinId: string;
  boeStartDate: string;
  boeEnddate: string;
  boeTitle: string;
  component: string;
  boeAuthor: string;
  sowReference: string[];
  boeDescription: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const BoeSchema = new Schema<BoeDocument>(
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
    boeStartDate: { type: String },
    boeEnddate: { type: String },
    boeTitle: { type: String },
    component: { type: String },
    boeAuthor: { type: String },
    sowReference: { type: [String] },
    boeDescription: { type: String },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const BoeModel = model<BoeDocument>('Boe', BoeSchema);
