import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import { handleDeleteFile, handleGetBoe, handleGetFileList } from '../services/boe.services';

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

export const getFilelist = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const filelist = await handleGetFileList(session);
    return sendResponse(res, 200, 'Get filelist', {
      filelist,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const deleteFilelist = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const { fileId } = req.body;
    const deletedFile = await handleDeleteFile(
      fileId,
    );
    return sendResponse(res, 201, 'Role assigned', {
      deletedFile,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};