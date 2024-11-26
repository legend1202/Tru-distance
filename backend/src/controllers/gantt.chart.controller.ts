import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import { handleGetGanttData } from '../services/gantt.data.services';

export const getGanttData = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const ganttData = await handleGetGanttData(session);
    return sendResponse(res, 200, 'Get WBS', {
        ganttData,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
