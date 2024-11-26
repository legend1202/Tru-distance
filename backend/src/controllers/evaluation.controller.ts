import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import { handleGetTotalTaskDataByProposalId } from '../services/evaluation.services';

export const getTotalTaskDataByProposalId = async (
  req: Request,
  res: Response
) => {
  const { proposalId } = req.query;
  const proposalIdString =
    typeof proposalId === 'string' ? proposalId : undefined;
  try {
    if (proposalIdString) {
      const apprvedData =
        await handleGetTotalTaskDataByProposalId(proposalIdString);
      return sendResponse(res, 200, 'Get Assigned tasks', {
        apprvedData,
      });
    }
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
