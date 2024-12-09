import express from 'express';
import verifyToken from '../middleware/auth.middleware';
import { getBoe } from '../controllers/boe.controller';
import { errorWrap } from '../utils/error.utils';
import { withTransaction } from '../utils/transactionHelper';
import { verifyAdmin } from '../middleware/role.middleware';

const router = express.Router();

router.get(
  '/boeLists',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  errorWrap(verifyAdmin, `Admin can get WBS only. This user can't get WBS`),
  withTransaction(errorWrap(getBoe, 'Could not get WBS'))
);

export default router;
