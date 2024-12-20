import fs from 'fs';
import {
  ClientSession,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { WbsDocument, WbsModel } from '../models/wbs.model';
import { OriginTaskModel } from '../models/origin.task.model';
import { BoeDocument, BoeModel } from '../models/boe.model';
import { FileListDocument, FileListModel } from '../models/file.list.model';
import { ProposalModel } from '../models/proposal.model';

export const handleGetBoe = async (
  session?: ClientSession
): Promise<BoeDocument[]> => {
  const boe = await BoeModel.find();

  //   const boe = await BoeModel.aggregate([
  //     {
  //       $lookup: {
  //         from: OriginTaskModel.collection.name, // The name of the Task collection in MongoDB
  //         localField: 'id',
  //         foreignField: 'wbsId',
  //         as: 'tasks', // The field in the output document where the tasks will be stored
  //       },
  //     },
  //   ]);

  return boe;
};

export const handleGetFileList = async (
  session?: ClientSession
): Promise<FileListDocument[]> => {
  const filelist = await FileListModel.aggregate([
    {
      $lookup: {
        from: ProposalModel.collection.name, // The name of the Task collection in MongoDB
        localField: 'proposalId',
        foreignField: 'id',
        as: 'proposalDetails', // The field in the output document where the tasks will be stored
      },
    },
  ]);

  return filelist;
};

export const handleDeleteFile = async (id: string) => {
  const fileData = await FileListModel.findOne({ id });
  if (fileData) {
    fs.unlink(fileData.filepath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
      } else {
        console.log('File deleted successfully');
      }
    });
    return await FileListModel.deleteOne({ id });
  }
};
