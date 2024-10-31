import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Task extends Document {
  id: string;
  wbsId: string;
  name: string;
  taskCode: string;
  description: string;
  assignedEvaluators: string;
  periodOfPerformance: {
    start: Date;
    end: Date;
  };
  methodOfQuoting: {
    historicalProgramName: string;
    contractNumber: string;
    periodOfPerformanceMonths: number;
    totalHours: number;
  };
  methodology: string;
  hoursDistribution: {
    yearly: number;
    monthly: [number];
  };
  costDistribution: {
    yearly: number;
    monthly: [number];
  };
  evaluation: {
    scope: string;
    methodologyReview: string;
    riskComplexity: string;
    costAnalysis: string;
    recommendation: string;
    status: string;
  };
  createdAt: Date;
  updateAt: Date;
}

const TaskSchema = new Schema<Task>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    wbsId: {
      type: String,
    },
    name: {
      type: String,
    },
    taskCode: {
      type: String,
    },
    description: {
      type: String,
    },
    assignedEvaluators: {
      type: String,
    },
    periodOfPerformance: {
      start: { type: Date },
      end: { type: Date },
    },
    methodOfQuoting: {
      historicalProgramName: { type: String },
      contractNumber: { type: String },
      periodOfPerformanceMonths: { type: Number },
      totalHours: { type: Number },
    },
    methodology: {
      type: String,
    },
    hoursDistribution: {
      yearly: { type: Number },
      monthly: [{ type: Number }],
    },
    costDistribution: {
      yearly: { type: Number },
      monthly: [{ type: Number }],
    },
    evaluation: {
      scope: { type: String },
      methodologyReview: { type: String },
      riskComplexity: { type: String },
      costAnalysis: { type: String },
      recommendation: { type: String },
      status: { type: String },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const TaskModel = model<Task>('Task', TaskSchema);
