import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import { handleGetClin } from '../services/clin.services';

export const getClin = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const clins = await handleGetClin(session);
    return sendResponse(res, 200, 'Get Clin', {
      clins,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
