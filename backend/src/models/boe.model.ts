import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Boe extends Document {
  id: string;
  name: string;
  title: string;
  proposalName: string;
  createdBy: string;
  periodOfPerformance: {
    start: Date;
    end: Date;
  };
  description: string;
  spreadTotals: {
    hours: {
      year: number;
      monthly: [number];
    };
    dollars: {
      year: number;
      monthly: [number];
    };
  };
  createdAt: Date;
  updateAt: Date;
}

const BoeSchema = new Schema<Boe>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    proposalName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    periodOfPerformance: {
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
    },
    description: {
      type: String,
    },
    spreadTotals: {
      hours: {
        year: {
          type: Number,
        },
        monthly: {
          type: [Number],
        },
      },
      dollars: {
        year: {
          type: Number,
        },
        monthly: {
          type: [Number],
        },
      },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const BoeModel = model<Boe>('Boe', BoeSchema);
