import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  MoqDocument,
  MoqSchema,
  PeriodOfPerformanceDocument,
  PeriodOfPerformanceSchema,
} from './origin.task.model';

export interface Subtask {
  subtaskCode: string;
  name: string;
  description: string;
  hours: number | 0;
  hoursDesc: string;
  cost: number | 0;
  periodOfPerformance?: PeriodOfPerformanceDocument;
  costdesc: string;
  material: string;
  materialDesc: string;
  travel: string;
  travelDesc: string;
  assignedUsers: string[];
  status: number;
}

export interface ProcessingTaskDocument extends Document {
  id: string;
  proposalId: string;
  wbsId: string;
  clinId: string;
  boeId: string;

  name: string;
  taskCode: string;
  periodOfPerformance?: PeriodOfPerformanceDocument;
  description: string;

  hours: number | 0;
  hoursDesc: string;

  cost: number | 0;
  costdesc: string;

  material: string;
  materialDesc: string;

  travel: string;
  travelDesc: string;

  moq: MoqDocument;
  subtasks: Subtask[];
  assignedUsers: string[];

  status: number;
}

const SubtaskSchema = new Schema<Subtask>({
  subtaskCode: { type: String },
  name: { type: String },
  description: { type: String },
  hours: { type: Number },
  hoursDesc: { type: String },
  periodOfPerformance: { type: PeriodOfPerformanceSchema },
  cost: { type: Number },
  costdesc: { type: String },
  material: { type: String },
  materialDesc: { type: String },
  travel: { type: String },
  travelDesc: { type: String },
  assignedUsers: { type: [String] },
  status: { type: Number },
});

export const ProcessingTaskSchema = new Schema<ProcessingTaskDocument>(
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

    name: { type: String },
    taskCode: { type: String },
    periodOfPerformance: { type: PeriodOfPerformanceSchema },
    description: { type: String },

    hours: { type: Number },
    hoursDesc: { type: String },

    cost: { type: Number },
    costdesc: { type: String },

    material: { type: String },
    materialDesc: { type: String },

    travel: { type: String },
    travelDesc: { type: String },

    moq: { type: MoqSchema },
    subtasks: { type: [SubtaskSchema] },

    assignedUsers: { type: [String] },
    status: { type: Number },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const ProcessingTaskModel = model<ProcessingTaskDocument>(
  'ProcessingTask',
  ProcessingTaskSchema
);
