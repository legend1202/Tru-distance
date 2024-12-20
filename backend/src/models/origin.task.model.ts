import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface PeriodOfPerformanceDocument {
  start: string;
  end: string;
}
export interface MoqDocument {
  description?: string;
  equation?: string;
  moqType?: string;
  relation?: {
    description: string;
    actualHours: string;
    chargeNumber: string;
    contractNumber: string;
    periodOfPerformance?: PeriodOfPerformanceDocument;
    reportName: string;
    dataCollectedDate: string;
    additionalSortFields: string[];
    additionalNotes: string;
  };
}

export interface Subtask {
  subtaskCode: string;
  name: string;
  description: string;
  hours: number;
  hoursDesc?: string;
  periodOfPerformance?: PeriodOfPerformanceDocument;
  cost: number;
  costdesc?: string;
  material: number;
  materialDesc?: string;
  travel: number;
  travelDesc?: string;
  moq: MoqDocument;
}

export interface OriginTaskDocument extends Document {
  id: string;
  proposalId: string;
  wbsId: string;
  clinId: string;
  boeId: string;

  name: string;
  taskCode: number;
  periodOfPerformance?: PeriodOfPerformanceDocument;
  description: string;
  spread_totals: any;

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
}

export const PeriodOfPerformanceSchema =
  new Schema<PeriodOfPerformanceDocument>({
    start: { type: String },
    end: { type: String },
  });

export const MoqSchema = new Schema<MoqDocument>({
  description: { type: String },
  equation: { type: String },
  moqType: { type: String },
  relation: {
    description: { type: String },
    actualHours: { type: String },
    chargeNumber: { type: String },
    contractNumber: { type: String },
    periodOfPerformance: { type: PeriodOfPerformanceSchema },
    reportName: { type: String },
    dataCollectedDate: { type: String },
    additionalSortFields: { type: [String] },
    additionalNotes: { type: String },
  },
});

const SubtaskSchema = new Schema<Subtask>({
  subtaskCode: { type: String },
  name: { type: String },
  description: { type: String },
  hours: { type: Number },
  hoursDesc: { type: String },
  periodOfPerformance: { type: PeriodOfPerformanceSchema },
  cost: { type: Number },
  costdesc: { type: String },
  material: { type: Number },
  materialDesc: { type: String },
  travel: { type: Number },
  travelDesc: { type: String },
});

export const OriginTaskSchema = new Schema<OriginTaskDocument>(
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
    taskCode: { type: Number },
    periodOfPerformance: { type: PeriodOfPerformanceSchema },
    description: { type: String },

    spread_totals: { type: Schema.Types.Mixed }, // Fixed here

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
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const OriginTaskModel = model<OriginTaskDocument>(
  'OriginTask',
  OriginTaskSchema
);
