import express from 'express';
import verifyToken from '../middleware/auth.middleware';

import { errorWrap } from '../utils/error.utils';
import { withTransaction } from '../utils/transactionHelper';
import {
  assignedTaskcreate,
  getAssignedTask,
} from '../controllers/assign.task.controller';

const router = express.Router();

router.post(
  '/task_assign',
  errorWrap(assignedTaskcreate, 'Could not create user')
);

router.get(
  '/get_assigned_tasks',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  withTransaction(errorWrap(getAssignedTask, 'Could not get users'))
);

export default router;
