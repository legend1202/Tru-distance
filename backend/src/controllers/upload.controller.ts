import { Request, Response } from 'express';
import { sendResponse } from '../utils/response.utils';
import { RequestError } from '../utils/globalErrorHandler';
import { processBoeFunc } from '../services/process_pdf/boe_pdf';

export const uploadBoePdf = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new RequestError('files is required', 400);
  }

  const boeFiles = req.files as Express.Multer.File[];

  if (!boeFiles.length)
    throw new RequestError('Please upload your local pdf', 400);

  var fileName: string[] = [];

  if (boeFiles && boeFiles.length) {
    boeFiles.map((file: any) => fileName.push(file.path));
    processBoeFunc(fileName[0]);
  }

  return sendResponse(res, 200, 'Uploaded Boe pdf', { boeFiles: fileName });
};
