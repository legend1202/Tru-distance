import express from 'express';
import verifyToken from '../middleware/auth.middleware';
import { getClin } from '../controllers/clin.controller';
import { errorWrap } from '../utils/error.utils';
import { withTransaction } from '../utils/transactionHelper';

const router = express.Router();

router.get(
  '/getClin',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  withTransaction(errorWrap(getClin, 'Could not get WBS'))
);

export default router;
