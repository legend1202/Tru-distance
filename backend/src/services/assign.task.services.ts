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
import { haveCommonItem } from '../utils/common';
import {
  AssignedTaskDocument,
  AssignedTaskModel,
} from '../models/assign.task.model';

export const handleAssignedTaskCreation = async (
  approveData: Partial<AssignedTaskDocument> & Document,
  session?: ClientSession
): Promise<AssignedTaskDocument> => {
  const approvedTask = await approveTask(approveData, session);

  return approvedTask;
};

export const handleGetAssignedTask = async (
  wbsId: string,
  userId: string
): Promise<AssignedTaskDocument | null> => {
  const approvedData = await findOneAssignedTask({ wbsId, userId });
  if (!approvedData) {
    return null; // Return null instead of an empty object
  }
  return approvedData;
};

export async function findOneAssignedTask(
  filter?: FilterQuery<AssignedTaskDocument>,
  projection?: ProjectionType<AssignedTaskDocument>,
  options?: QueryOptions<AssignedTaskDocument>
): Promise<AssignedTaskDocument | null> {
  return await AssignedTaskModel.findOne(filter, projection, options);
}

export const approveTask = async (
  approveData: Partial<AssignedTaskDocument> & Document,
  session?: ClientSession
): Promise<AssignedTaskDocument> => {
  const { id, ...rest } = approveData;
  if (id) {
    const existingTask = await AssignedTaskModel.findOne({ id });
    if (existingTask) {
      const updateAssignedTask = await findByIdAndUpdateAssignTaskDocument(id, {
        ...rest,
      });
      return (
        updateAssignedTask ||
        Promise.reject(new RequestError(`There is not ${id} user.`, 500))
      );
    } else {
      throw new RequestError(`Task with ID ${id} does not exist.`, 404);
    }
  } else {
    const newAssignedTask = new AssignedTaskModel({
      ...rest,
    });
    await newAssignedTask.save();
    return newAssignedTask;
  }
};

export const findByIdAndUpdateAssignTaskDocument = async (
  id: string,
  update: UpdateQuery<AssignedTaskDocument>,
  options?: QueryOptions<AssignedTaskDocument>
) => {
  return await AssignedTaskModel.findOneAndUpdate({ id }, update, {
    ...options,
    returnDocument: 'after',
  });
};
