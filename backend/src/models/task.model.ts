import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { PeriodOfPerformanceDocument,  PeriodOfPerformanceSchema} from './origin.task.model';

export interface Subtask {
  subtaskCode: string;
  name: string;
  description: string;
  hours: number | 0;
  cost: number | 0;
}

export interface TaskDocument extends Document {
  id: string;
  wbsId: string;
  name: string;
  taskCode: string;
  periodOfPerformance: PeriodOfPerformanceDocument;
  description: string;
  hours: number | 0;
  cost: number | 0;
  subtasks: Subtask[];
}

const SubtaskSchema = new Schema<Subtask>({
  subtaskCode: { type: String },
  name: { type: String },
  description: { type: String },
  hours: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
});

export const TaskSchema = new Schema<TaskDocument>(
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
    taskCode: { type: String },
    name: { type: String },
    periodOfPerformance: { type: PeriodOfPerformanceSchema },
    description: { type: String, default: 'TBD' },
    hours: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    subtasks: [SubtaskSchema],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const TaskModel = model<TaskDocument>('Task', TaskSchema);
