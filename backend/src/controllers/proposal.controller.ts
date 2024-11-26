import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import { handleGetProposal, handleProposalUpdate } from '../services/proposal.services';

export const getProposal = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const proposals = await handleGetProposal(session);
    return sendResponse(res, 200, 'Get WBS', {
      proposals,
    });
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const updateProposal = async (req: Request, res: Response) => {
  const session: ClientSession = req.session!;

  try {
    const { approveData } = req.body;
    const updatedData = await handleProposalUpdate(approveData, session);
    return sendResponse(res, 201, 'Assigned Task Successfully', updatedData);
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
