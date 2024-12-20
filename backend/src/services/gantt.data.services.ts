import { ClientSession } from 'mongoose';
import { OriginTaskModel } from '../models/origin.task.model';
import { ProcessingTaskModel } from '../models/process.task.model';
import { WbsModel } from '../models/wbs.model';

export const handleGetGanttData = async (
  session?: ClientSession
): Promise<any> => {
  /* const wbs = await WbsModel.find(); */

  // const originData = await OriginTaskModel.aggregate([
  //   {
  //     $lookup: {
  //       from: 'clins', // Collection name for ClinModel
  //       localField: 'wbsId', // Field in TaskModel that relates to Clin
  //       foreignField: 'proposalId', // Field in ClinModel that relates to Task
  //       as: 'clinDetails',
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'wbs', // Collection name for WbsModel
  //       localField: 'wbsId', // Field in TaskModel that relates to Wbs
  //       foreignField: 'id', // Field in WbsModel that relates to Task
  //       as: 'wbsDetails',
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: '$clinDetails',
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: '$wbsDetails',
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $project: {
  //       id: 1,
  //       proposalId: 1,
  //       wbsId: 1,
  //       clinId: 1,
  //       name: 1,
  //       taskCode: 1,
  //       description: 1,
  //       spread_totals:1,
  //       hours: 1,
  //       cost: 1,
  //       travel: 1,
  //       material: 1,
  //       subtasks: 1,
  //       clinDetails: {
  //         clinNumber: 1,
  //         clinTitle: 1,
  //       },
  //       wbsDetails: {
  //         wbsNumber: 1,
  //         wbsTitle: 1,
  //       },
  //     },
  //   },
  // ]);

  // const evaluationData = await ProcessingTaskModel.aggregate([
  //   {
  //     $lookup: {
  //       from: 'clins', // Collection name for ClinModel
  //       localField: 'wbsId', // Field in TaskModel that relates to Clin
  //       foreignField: 'proposalId', // Field in ClinModel that relates to Task
  //       as: 'clinDetails',
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'wbs', // Collection name for WbsModel
  //       localField: 'wbsId', // Field in TaskModel that relates to Wbs
  //       foreignField: 'id', // Field in WbsModel that relates to Task
  //       as: 'wbsDetails',
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: '$clinDetails',
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: '$wbsDetails',
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $project: {
  //       id: 1,
  //       proposalId: 1,
  //       wbsId: 1,
  //       clinId: 1,
  //       name: 1,
  //       taskCode: 1,
  //       description: 1,
  //       periodOfPerformance: 1,
  //       hours: 1,
  //       cost: 1,
  //       travel: 1,
  //       material: 1,
  //       subtasks: 1,
  //       assignedUsers: 1,
  //       status: 1,
  //       clinDetails: {
  //         clinNumber: 1,
  //         clinTitle: 1,
  //       },
  //       wbsDetails: {
  //         wbsNumber: 1,
  //         wbsTitle: 1,
  //       },
  //     },
  //   },
  // ]);

  const originData = await WbsModel.aggregate([
    {
      $sort: { id: 1 }, // Sort by 'wbsNumber' in ascending order (1 for ascending, -1 for descending)
    },
    {
      $lookup: {
        from: OriginTaskModel.collection.name, // The name of the Task collection in MongoDB
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

  const evaluationData = await WbsModel.aggregate([
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

  return { originData, evaluationData };
};
