import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';

import {
  handleAssignedTaskCreation,
  handleGetAssignedTask,
} from '../services/assign.task.services';

export const assignedTaskcreate = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const { approveData } = req.body;
    const updatedData = await handleAssignedTaskCreation(approveData, session);
    return sendResponse(res, 201, 'Assigned Task Successfully', updatedData);
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const getAssignedTask = async (req: Request, res: Response) => {
  const { wbsId } = req.query;
  const wbsIdString = typeof wbsId === 'string' ? wbsId : undefined;
  try {
    if (wbsIdString) {
      const apprvedData = await handleGetAssignedTask(wbsIdString);
      return sendResponse(res, 200, 'Get Assigned tasks', {
        apprvedData,
      });
    }
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
