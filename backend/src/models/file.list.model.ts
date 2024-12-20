import { Document, model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface FileListDocument extends Document {
  id: string;
  proposalId: string;
  filepath: string;
  fileType: number; // 0 : boe, 1: cbom, 2: travel, 3: sow, 4: gra
  createdAt?: Date;
  updatedAt?: Date;
}

const FileListchema = new Schema<FileListDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    proposalId: { type: String },
    filepath: { type: String },
    fileType: { type: Number },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updateAt',
    },
  }
);

export const FileListModel = model<FileListDocument>('Filelist', FileListchema);
