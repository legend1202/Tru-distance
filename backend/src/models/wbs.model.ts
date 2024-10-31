import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
  taskCode: string;
  name: string;
  periodOfPerformance: {
    start: Date;
    end: Date;
  };
  description: string;
  methodology: string;
  hoursDistribution: {
    yearly: number | null;
    monthly: number | null;
  };
  costDistribution: {
    yearly: number | null;
    monthly: number | null;
  };
}

export interface Wbs extends Document {
  id: string;
  boeId: string;
  title: string;
  wbsCode: string;
  hoursTotal: number;
  dollarsTotal: number;
  resourceSummary: {
    resourceId: string;
    hours: number;
    matSubIWTA: number;
    other: number;
  };
  tasks: Task[]; // Add tasks array
  createdAt: Date;
  updateAt: Date;
}

const TaskSchema = new Schema<Task>({
  taskCode: { type: String },
  name: { type: String },
  periodOfPerformance: {
    start: { type: Date },
    end: { type: Date },
  },
  description: { type: String, default: 'TBD' },
  methodology: { type: String, default: '' },
  hoursDistribution: {
    yearly: { type: Number, default: null },
    monthly: { type: Number, default: null },
  },
  costDistribution: {
    yearly: { type: Number, default: null },
    monthly: { type: Number, default: null },
  },
});

const WbsSchema = new Schema<Wbs>(
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
    hoursTotal: {
      type: Number,
    },
    dollarsTotal: {
      type: Number,
    },
    resourceSummary: {
      resourceId: {
        type: String,
      },
      hours: {
        type: Number,
      },
      matSubIWTA: {
        type: Number,
      },
      other: {
        type: Number,
      },
    },
    tasks: [TaskSchema], // Embed tasks as an array of TaskSchema
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const WbsModel = model<Wbs>('Wbs', WbsSchema);
