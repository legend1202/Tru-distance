import express from 'express';
import verifyToken from '../middleware/auth.middleware';
import {
  getTotalTaskDataByProposalId,
  updateFlowData,
  getFlowdata,
} from '../controllers/evaluation.controller';
import { errorWrap } from '../utils/error.utils';
import { withTransaction } from '../utils/transactionHelper';
import { verifyAdmin } from '../middleware/role.middleware';

const router = express.Router();

router.get(
  '/getTotalTaskDataByProposalId',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  withTransaction(errorWrap(getTotalTaskDataByProposalId, 'Could not get WBS'))
);

router.get(
  '/getFlowdata',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  withTransaction(errorWrap(getFlowdata, 'Could not get WBS'))
);

router.post(
  '/updateFlowdata',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  withTransaction(errorWrap(updateFlowData, 'Could not get users'))
);

export default router;
