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

export const handleGetWbs = async (
  session?: ClientSession
): Promise<WbsDocument[]> => {
  /* const wbs = await WbsModel.find(); */

  const wbsWithTasks = await WbsModel.aggregate([
    {
      $lookup: {
        from: OriginTaskModel.collection.name, // The name of the Task collection in MongoDB
        localField: 'id',
        foreignField: 'wbsId',
        as: 'tasks', // The field in the output document where the tasks will be stored
      },
    },
  ]);

  return wbsWithTasks;
};
