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
import { BoeDocument, BoeModel } from '../models/boe.model';

export const handleGetBoe = async (
  session?: ClientSession
): Promise<BoeDocument[]> => {
  const boe = await BoeModel.find();

  //   const boe = await BoeModel.aggregate([
  //     {
  //       $lookup: {
  //         from: OriginTaskModel.collection.name, // The name of the Task collection in MongoDB
  //         localField: 'id',
  //         foreignField: 'wbsId',
  //         as: 'tasks', // The field in the output document where the tasks will be stored
  //       },
  //     },
  //   ]);

  return boe;
};
