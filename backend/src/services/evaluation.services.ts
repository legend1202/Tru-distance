import { Document } from 'mongoose';
import {
  ClientSession,
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';

import { ProcessingTaskModel } from '../models/process.task.model';
import { WbsModel } from '../models/wbs.model';

export const handleGetTotalTaskDataByProposalId = async (
  proposalId: string
) => {
  const tasksData = await WbsModel.aggregate([
    {
      $match: { proposalId: proposalId },
    },
    {
      $lookup: {
        from: ProcessingTaskModel.collection.name, // The name of the Task collection in MongoDB
        localField: 'id',
        foreignField: 'wbsId',
        as: 'tasks', // The field in the output document where the tasks will be stored
      },
    },
  ]);
  if (!tasksData) {
    throw new RequestError(`Task with ID does not exist.`, 404);
  }
  return tasksData;
};
