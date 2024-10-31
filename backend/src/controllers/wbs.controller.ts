import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import { handleGetWbs } from '../services/wbs.service';

export const getWbs = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const wbs = await handleGetWbs(session);
    return sendResponse(res, 200, 'Get WBS', {
      wbs,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
