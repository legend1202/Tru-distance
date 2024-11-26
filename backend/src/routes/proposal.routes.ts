import express from 'express';
import verifyToken from '../middleware/auth.middleware';
import {
  getProposal,
  updateProposal,
} from '../controllers/proposal.controller';
import { errorWrap } from '../utils/error.utils';
import { withTransaction } from '../utils/transactionHelper';
import { verifyAdmin } from '../middleware/role.middleware';

const router = express.Router();

router.get(
  '/getlist',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  withTransaction(errorWrap(getProposal, 'Could not get WBS'))
);

router.post(
  '/updatelist',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  withTransaction(errorWrap(updateProposal, 'Could not get users'))
);

export default router;
