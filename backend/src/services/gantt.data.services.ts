import { ClientSession } from 'mongoose';
import { OriginTaskModel } from '../models/origin.task.model';
import { ProcessingTaskModel } from '../models/process.task.model';

export const handleGetGanttData = async (
  session?: ClientSession
): Promise<any> => {
  /* const wbs = await WbsModel.find(); */

  const originData = await OriginTaskModel.aggregate([
    {
      $lookup: {
        from: 'clins', // Collection name for ClinModel
        localField: 'wbsId', // Field in TaskModel that relates to Clin
        foreignField: 'proposalId', // Field in ClinModel that relates to Task
        as: 'clinDetails',
      },
    },
    {
      $lookup: {
        from: 'wbs', // Collection name for WbsModel
        localField: 'wbsId', // Field in TaskModel that relates to Wbs
        foreignField: 'id', // Field in WbsModel that relates to Task
        as: 'wbsDetails',
      },
    },
    {
      $unwind: {
        path: '$clinDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: '$wbsDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        id: 1,
        proposalId: 1,
        wbsId: 1,
        clinId: 1,
        name: 1,
        taskCode: 1,
        description: 1,
        hours: 1,
        cost: 1,
        travel: 1,
        material: 1,
        subtasks: 1,
        clinDetails: {
          clinNumber: 1,
          clinTitle: 1,
        },
        wbsDetails: {
          wbsNumber: 1,
          wbsTitle: 1,
        },
      },
    },
  ]);

  const evaluationData = await ProcessingTaskModel.aggregate([
    {
      $lookup: {
        from: 'clins', // Collection name for ClinModel
        localField: 'wbsId', // Field in TaskModel that relates to Clin
        foreignField: 'proposalId', // Field in ClinModel that relates to Task
        as: 'clinDetails',
      },
    },
    {
      $lookup: {
        from: 'wbs', // Collection name for WbsModel
        localField: 'wbsId', // Field in TaskModel that relates to Wbs
        foreignField: 'id', // Field in WbsModel that relates to Task
        as: 'wbsDetails',
      },
    },
    {
      $unwind: {
        path: '$clinDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: '$wbsDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        id: 1,
        proposalId: 1,
        wbsId: 1,
        clinId: 1,
        name: 1,
        taskCode: 1,
        description: 1,
        periodOfPerformance: 1,
        hours: 1,
        cost: 1,
        travel: 1,
        material: 1,
        subtasks: 1,
        assignedUsers: 1,
        status: 1,
        clinDetails: {
          clinNumber: 1,
          clinTitle: 1,
        },
        wbsDetails: {
          wbsNumber: 1,
          wbsTitle: 1,
        },
      },
    },
  ]);

  return { originData, evaluationData };
};
