import { Request, Response } from 'express';
import { sendResponse } from '../utils/response.utils';
import { RequestError } from '../utils/globalErrorHandler';
import { processBoeFunc } from '../services/process_pdf/boe_pdf';
import { processBoeModule } from '../services/process_boe';
import { ProposalModel } from '../models/proposal.model';
import { saveFilepath } from '../services/process_pdf/file_save';

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
    // processBoeFunc(fileName[0]);
    await processBoeModule(fileName[0]);
  }

  return sendResponse(res, 200, 'Uploaded Boe pdf', { boeFiles: fileName });
};

export const uploadCbom = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new RequestError('files is required', 400);
  }

  const cbomFiles = req.files as Express.Multer.File[];

  if (!cbomFiles.length)
    throw new RequestError('Please upload your local pdf', 400);

  var fileName: string[] = [];

  if (cbomFiles && cbomFiles.length) {
    cbomFiles.map((file: any) => fileName.push(file.path));
    const proposal = await ProposalModel.findOne();
    if (proposal) {
      await saveFilepath(proposal.id, fileName[0], 1);
    }
  }

  return sendResponse(res, 200, 'Uploaded Boe pdf', { boeFiles: fileName });
};

export const uploadTravel = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new RequestError('files is required', 400);
  }

  const travelFiles = req.files as Express.Multer.File[];

  if (!travelFiles.length)
    throw new RequestError('Please upload your local pdf', 400);

  var fileName: string[] = [];

  if (travelFiles && travelFiles.length) {
    travelFiles.map((file: any) => fileName.push(file.path));
    const proposal = await ProposalModel.findOne();
    if (proposal) {
      await saveFilepath(proposal.id, fileName[0], 2);
    }
  }

  return sendResponse(res, 200, 'Uploaded Boe pdf', { boeFiles: fileName });
};

export const uploadSow = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new RequestError('files is required', 400);
  }

  const sowFiles = req.files as Express.Multer.File[];

  if (!sowFiles.length)
    throw new RequestError('Please upload your local pdf', 400);

  var fileName: string[] = [];

  if (sowFiles && sowFiles.length) {
    sowFiles.map((file: any) => fileName.push(file.path));
    const proposal = await ProposalModel.findOne();
    if (proposal) {
      await saveFilepath(proposal.id, fileName[0], 3);
    }
  }

  return sendResponse(res, 200, 'Uploaded Boe pdf', { boeFiles: fileName });
};

export const uploadGra = async (req: Request, res: Response) => {
  if (!req.files) {
    throw new RequestError('files is required', 400);
  }

  const graFiles = req.files as Express.Multer.File[];

  if (!graFiles.length)
    throw new RequestError('Please upload your local pdf', 400);

  var fileName: string[] = [];

  if (graFiles && graFiles.length) {
    graFiles.map((file: any) => fileName.push(file.path));
    const proposal = await ProposalModel.findOne();
    if (proposal) {
      await saveFilepath(proposal.id, fileName[0], 4);
    }
  }

  return sendResponse(res, 200, 'Uploaded Boe pdf', { boeFiles: fileName });
};
