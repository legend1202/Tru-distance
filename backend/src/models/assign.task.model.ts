import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  PeriodOfPerformanceDocument,
  PeriodOfPerformanceSchema,
} from './boe.model';

interface Subtask {
  subtaskCode: string;
  name: string;
  description: string;
  hours: number | 0;
  cost: number | 0;
  checked: boolean;
}

interface TaskDocument extends Document {
  wbsId: string;
  name: string;
  taskCode: string;
  periodOfPerformance: PeriodOfPerformanceDocument;
  description: string;
  hours: number | 0;
  cost: number | 0;
  checked: boolean;
  subtasks: Subtask[];
}

export interface AssignedTaskDocument {
  id: string;
  wbsId: string;
  userId: string;
  tasks: TaskDocument[];
}

const SubtaskSchema = new Schema<Subtask>({
  subtaskCode: { type: String },
  name: { type: String },
  description: { type: String },
  hours: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  checked: { type: Boolean, default: false },
});

const TaskSchema = new Schema<TaskDocument>(
  {
    wbsId: {
      type: String,
    },
    taskCode: { type: String },
    name: { type: String },
    periodOfPerformance: { type: PeriodOfPerformanceSchema },
    description: { type: String, default: 'TBD' },
    hours: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    checked: { type: Boolean, default: false },
    subtasks: [SubtaskSchema],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

const AssignedTaskSchema = new Schema<AssignedTaskDocument>(
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
    userId: { type: String },
    tasks: { type: [TaskSchema] },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const AssignedTaskModel = model<AssignedTaskDocument>(
  'AssignedTask',
  AssignedTaskSchema
);
