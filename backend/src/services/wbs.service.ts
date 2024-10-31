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
import { Wbs, WbsModel } from '../models/wbs.model';

export const handleGetWbs = async (session?: ClientSession): Promise<Wbs[]> => {
  const wbs = await WbsModel.find();

  return wbs;
};
