import { Document } from 'mongoose';
import {
  ClientSession,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';

import {
  ProcessingTaskDocument,
  ProcessingTaskModel,
} from '../models/process.task.model';

export const handleAssignedTaskCreation = async (
  approveData: Partial<ProcessingTaskDocument[]> & Document[],
  session?: ClientSession
) => {
  const approvedTask = await approveTask(approveData, session);

  return approvedTask;
};

export const handleGetAssignedTask = async (
  wbsId: string
): Promise<ProcessingTaskDocument[]> => {
  const approvedData = await ProcessingTaskModel.find({ wbsId });

  if (!approvedData) {
    throw new RequestError(`Task with ID does not exist.`, 404);
  }
  return approvedData;
};

export async function findOneAssignedTask(
  filter?: FilterQuery<ProcessingTaskDocument>,
  projection?: ProjectionType<ProcessingTaskDocument>,
  options?: QueryOptions<ProcessingTaskDocument>
): Promise<ProcessingTaskDocument | null> {
  return await ProcessingTaskModel.findOne(filter, projection, options);
}

export const approveTask = async (
  approveData: Partial<ProcessingTaskDocument[]>,
  session?: ClientSession
) => {
  if (approveData.length > 0) {
    approveData.forEach(async (task) => {
      if (task?.id) {
        await findByIdAndUpdateAssignTaskDocument(task.id, {
          ...task,
        });
      } else {
        throw new RequestError(`Task with ID ${task?.id} does not exist.`, 404);
      }
    });
  } else {
    throw new RequestError(`Task with ID  does not exist.`, 404);
  }
};

export const findByIdAndUpdateAssignTaskDocument = async (
  id: string,
  update: UpdateQuery<ProcessingTaskDocument>,
  options?: QueryOptions<ProcessingTaskDocument>
) => {
  return await ProcessingTaskModel.findOneAndUpdate({ id }, update, {
    ...options,
    returnDocument: 'after',
  });
};
