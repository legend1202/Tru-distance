import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface FlowDataItemChildMoveOptionDocument extends Document {
  title: string;
  next: number[];
}

const FlowDataItemChildMoveOptionSchema =
  new Schema<FlowDataItemChildMoveOptionDocument>({
    title: { type: String },
    next: { type: [Number] },
  });

interface FactorDocument extends Document {
  complexityValue: string;
  complexityConcur: string;
  complexityNonConcur: string;
  riskValue: string;
  riskConcur: string;
  riskNonConcur: string;
  curveValue: string;
  curveConcur: string;
  curveNonConcur: string;
}

const FactorSchema = new Schema<FactorDocument>({
  complexityValue: { type: String },
  complexityConcur: { type: String },
  complexityNonConcur: { type: String },
  riskValue: { type: String },
  riskConcur: { type: String },
  riskNonConcur: { type: String },
  curveValue: { type: String },
  curveConcur: { type: String },
  curveNonConcur: { type: String },
});

interface FactorJustificationDocument extends Document {
  complexity: string;
  risk: string;
  curve: string;
}

const FactorJustificationSchema = new Schema<FactorJustificationDocument>({
  complexity: { type: String },
  risk: { type: String },
  curve: { type: String },
});

interface FlowDataItemChildDocumnet extends Document {
  status1: number; // 0 not start, 1: correct, 2: not correct
  status2: number; // 0 not start, 1: correct, 2: not correct
  answer: number; // Make answer optional
  intro: string; // Make intro1 optional
  question1: string;
  question2: string; // Make question2 optional
  question3: string; // Make question2 optional
  question4: string; // Make question2 optional
  description1: string;
  description2: string; // Make description2 optional
  description3: string; // Make description2 optional
  description4: string; // Make description2 optional
  moveOptions: FlowDataItemChildMoveOptionDocument[];
  selectOptions: string[];
  factor: FactorDocument;
  factorJustification: FactorJustificationDocument;
  yes1: number[];
  no1: number[];
  yes2: number[]; // Make yes2 optional
  no2: number[]; // Make no2 optional
  next: number[];
  prev: number[];
}

const FlowDataItemChildSchema = new Schema<FlowDataItemChildDocumnet>({
  status1: { type: Number }, // 0 not start, 1: correct, 2: not correct
  status2: { type: Number }, // 0 not start, 1: correct, 2: not correct
  answer: { type: Number }, // Make answer optional
  intro: { type: String }, // Make intro1 optional
  question1: { type: String },
  question2: { type: String }, // Make question2 optional
  question3: { type: String }, // Make question2 optional
  question4: { type: String }, // Make question2 optional
  description1: { type: String },
  description2: { type: String }, // Make description2 optional
  description3: { type: String }, // Make description2 optional
  description4: { type: String }, // Make description2 optional
  moveOptions: { type: [FlowDataItemChildMoveOptionSchema] },
  selectOptions: { type: [String] },
  factor: { type: FactorSchema },
  factorJustification: { type: FactorJustificationSchema },
  yes1: { type: [Number] },
  no1: { type: [Number] },
  yes2: { type: [Number] }, // Make yes2 optional
  no2: { type: [Number] }, // Make no2 optional
  next: { type: [Number] },
  prev: { type: [Number] },
});

interface FlowDataItemDocument extends Document {
  type: string;
  status: number; // 0 not start, 1: correct, 2: not correct
  title: string;
  children: FlowDataItemChildDocumnet[];
}

const FlowDataItemSchema = new Schema<FlowDataItemDocument>({
  type: { type: String },
  status: { type: Number },
  title: { type: String },
  children: { type: [FlowDataItemChildSchema] },
});

export interface FlowDataDocument extends Document {
  id: string;
  wbsId: string;
  taskId: string; // 0 not start, 1: correct, 2: not correct
  subTaskIndex?: number;
  userId: string;
  flowData: FlowDataItemDocument[];

  createdAt?: Date;
  updatedAt?: Date;
}

const FlowDataSchema = new Schema<FlowDataDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    wbsId: { type: String },
    taskId: { type: String },
    subTaskIndex: { type: Number },
    flowData: { type: [FlowDataItemSchema] },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const FlowDataModel = model<FlowDataDocument>(
  'FlowData',
  FlowDataSchema
);
