import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ProposalDocument extends Document {
  id: string;
  proposalName: string;
  teamLead?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

const ProposalSchema = new Schema<ProposalDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    proposalName: {
      type: String,
    },
    teamLead: {
      type: [String],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const ProposalModel = model<ProposalDocument>(
  'Proposal',
  ProposalSchema
);
