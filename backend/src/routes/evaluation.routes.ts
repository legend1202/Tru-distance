import express from 'express';
import verifyToken from '../middleware/auth.middleware';
import {
    getTotalTaskDataByProposalId,
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


export default router;
