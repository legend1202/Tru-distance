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
import { WbsModel } from '../models/wbs.model';
import { FlowDataModel } from '../models/flowData.model';

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
  const approvedData = await ProcessingTaskModel.aggregate([
    {
      $match: { wbsId },
    },
    {
      $lookup: {
        from: WbsModel.collection.name, // The name of the Task collection in MongoDB
        localField: 'wbsId',
        foreignField: 'id',
        as: 'wbsDetails', // The field in the output document where the tasks will be stored
      },
    },
  ]);

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

export const handleUpdateTaskStatus = async (
  wbsId: string,
  taskId: string,
  subTaskIndex: number,
  taskStatus: number,
  session?: ClientSession
) => {
  try {
    const task = await ProcessingTaskModel.findOne({
      wbsId: wbsId,
      id: taskId,
    });

    if (!task) {
      throw new Error('Task not found.');
    }

    const flowData = await FlowDataModel.findOne({
      wbsId,
      taskId,
      subTaskIndex,
    });

    const hours = flowData?.flowData[2]?.children[2]?.hours;
    const periodOfPerformance =
      flowData?.flowData[3].children[3].periodOfPerformance;

    if (task.subtasks[subTaskIndex - 1]) {
      const result = await ProcessingTaskModel.updateOne(
        {
          wbsId: wbsId,
          id: taskId,
        },
        {
          $set: {
            [`subtasks.${subTaskIndex - 1}.status`]: taskStatus,
            [`subtasks.${subTaskIndex - 1}.hours`]: hours,
            [`subtasks.${subTaskIndex - 1}.periodOfPerformance`]:
              periodOfPerformance,
          },
        },
        {
          session: session || undefined,
        }
      );

      if (result.modifiedCount === 0) {
        console.error('Failed to update subtask status.');
        throw new Error('Failed to update subtask status.');
      } else {
        return result;
      }
    } else {
      const result = await ProcessingTaskModel.updateOne(
        {
          wbsId: wbsId,
          id: taskId,
        },
        {
          $set: {
            status: taskStatus,
            hours: hours,
            periodOfPerformance: periodOfPerformance,
          },
        },
        {
          session: session || undefined,
        }
      );

      if (result.modifiedCount === 0) {
        throw new Error('Failed to update task status.');
      } else {
        return result;
      }
    }
  } catch (error) {
    throw error;
  }
};
