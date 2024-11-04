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
import { RequestError, AuthenticationError } from '../utils/globalErrorHandler';
import { User, UserModel } from '../models/user.model';
import { Roles } from '../utils/constants';
import { WBSDocument, WbsModel } from '../models/wbs.model';

export const handleGetWbs = async (
  session?: ClientSession
): Promise<WBSDocument[]> => {
  /* const wbs = await WbsModel.find(); */

  const wbsWithTasks = await WbsModel.aggregate([
    {
      $lookup: {
        from: 'tasks', // The name of the Task collection in MongoDB
        localField: 'id',
        foreignField: 'wbsId',
        as: 'tasks', // The field in the output document where the tasks will be stored
      },
    },
  ]);

  return wbsWithTasks;
};
