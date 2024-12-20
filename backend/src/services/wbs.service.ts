import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import {
  ClientSession,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { WbsDocument, WbsModel } from '../models/wbs.model';
import { OriginTaskModel } from '../models/origin.task.model';
import { ProcessingTaskModel } from '../models/process.task.model';

export const handleGetWbs = async (
  session?: ClientSession
): Promise<WbsDocument[]> => {
  const wbsWithTasks = await WbsModel.aggregate([
    {
      $sort: { id: 1 }, // Sort by 'wbsNumber' in ascending order (1 for ascending, -1 for descending)
    },
    {
      $lookup: {
        from: ProcessingTaskModel.collection.name, // The name of the Task collection in MongoDB
        localField: 'id', // Reference field in WbsModel
        foreignField: 'wbsId', // Reference field in ProcessingTaskModel
        as: 'tasks', // The field in the output document where the tasks will be stored
      },
    },
    {
      $unwind: { path: '$tasks', preserveNullAndEmptyArrays: true }, // Unwind the 'tasks' array so that you can apply sorting
    },
    {
      $sort: { 'tasks.taskCode': 1 }, // Sort the 'tasks' by 'taskCode' in ascending order
    },
    {
      $group: {
        _id: '$_id',
        wbsTitle: { $first: '$wbsTitle' }, // Keep the first occurrence of 'wbsTitle'
        wbsNumber: { $first: '$wbsNumber' }, // Keep the first occurrence of 'wbsNumber'
        tasks: { $push: '$tasks' }, // Rebuild the 'tasks' array after sorting
      },
    },
  ]);

  return wbsWithTasks;
};
