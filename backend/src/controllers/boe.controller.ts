import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import { handleGetBoe } from '../services/boe.services';

export const getBoe = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const boe = await handleGetBoe(session);
    return sendResponse(res, 200, 'Get Boe', {
      boe,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
