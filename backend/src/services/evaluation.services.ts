import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
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
import { FlowDataDocument, FlowDataModel } from '../models/flowData.model';

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

export const handleGetFlowData = async (
  wbsIdString: string,
  taskIdString: string,
  subTaskIndexString: number
) => {
  const flowData = await FlowDataModel.findOne({
    wbsId: wbsIdString,
    taskId: taskIdString,
    subTaskIndex: subTaskIndexString,
  });

  if (!flowData) {
    throw new RequestError(`Task with ID does not exist.`, 404);
  }
  return flowData;
};

export const handleUpdateOrCreateFlowdata = async (
  flowData: FlowDataDocument
) => {
  try {
    if (flowData?.id) {
      // If the flow data already exists, update it
      const updatedFlowData = await findByIdAndUpdateFlowDataDocument(
        flowData.id,
        {
          ...flowData,
        }
      );
      return updatedFlowData;
    } else {
      flowData.id = uuidv4();
      // If the flow data does not exist, create a new one
      const newFlowData = new FlowDataModel(flowData);
      await newFlowData.save();
      return newFlowData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const findByIdAndUpdateFlowDataDocument = async (
  id: string,
  update: UpdateQuery<FlowDataDocument>,
  options?: QueryOptions<FlowDataDocument>
) => {
  return await FlowDataModel.findOneAndUpdate({ id }, update, {
    ...options,
    returnDocument: 'after',
  });
};