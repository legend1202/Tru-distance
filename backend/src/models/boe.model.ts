import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface PeriodOfPerformanceDocument {
  start: Date;
  end: Date;
}

export interface BoeDocument extends Document {
  id: string;
  name: string;
  title: string;
  proposalName: string;
  createdBy: string;
  periodOfPerformance: PeriodOfPerformanceDocument;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const PeriodOfPerformanceSchema =
  new Schema<PeriodOfPerformanceDocument>({
    start: { type: Date },
    end: { type: Date },
  });

const BoeSchema = new Schema<BoeDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    name: { type: String },
    title: { type: String },
    proposalName: { type: String },
    createdBy: { type: String },
    periodOfPerformance: { type: PeriodOfPerformanceSchema },
    description: { type: String },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const BoeModel = model<BoeDocument>('Boe', BoeSchema);
