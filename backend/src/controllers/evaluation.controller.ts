import { sendResponse } from '../utils/response.utils';
import { Request, Response } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import { RequestError } from '../utils/globalErrorHandler';
import {
  handleGetTotalTaskDataByProposalId,
  handleUpdateOrCreateFlowdata,
  handleGetFlowData,
} from '../services/evaluation.services';
import { FlowDataDocument } from '../models/flowData.model';
import { handleUpdateTaskStatus } from '../services/assign.task.services';

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

export const getFlowdata = async (req: Request, res: Response) => {
  const { wbsId, taskId, subTaskIndex } = req.query;
  const wbsIdString = typeof wbsId === 'string' ? wbsId : undefined;
  const taskIdString = typeof taskId === 'string' ? taskId : undefined;
  const subTaskIndexString =
    typeof subTaskIndex === 'number' ? subTaskIndex : 0;
  try {
    if (wbsIdString && taskIdString) {
      const flowData = await handleGetFlowData(
        wbsIdString,
        taskIdString,
        subTaskIndexString
      );
      return sendResponse(res, 200, 'Get Assigned tasks', {
        flowData,
      });
    }
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const updateFlowData = async (req: Request, res: Response) => {
  const { flowData } = req.body;
  try {
    if (flowData) {
      const apprvedData = await handleUpdateOrCreateFlowdata(flowData);
      return sendResponse(res, 200, 'Flow data updated successfully', {
        apprvedData,
      });
    } else {
      throw new RequestError('flowData is required', 400);
    }
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { wbsId, taskId, subTaskIndex, taskStatus } = req.body;
  try {
    if (taskStatus) {
      const apprvedData = await handleUpdateTaskStatus(
        wbsId,
        taskId,
        subTaskIndex,
        taskStatus
      );
      return sendResponse(res, 200, 'Flow data updated successfully', {
        apprvedData,
      });
    } else {
      throw new RequestError('flowData is required', 400);
    }
  } catch (error) {
    throw new RequestError(`${error}`, 500);
  }
};
