import express from 'express';
import authRoutes from './auth.routes';
import uploadRoutes from './upload.routes';
import wbsRoutes from './wbs.routes';
import assignTaskRoutes from './assign.task.routes';
import { sendResponse } from '../utils/response.utils';

const router = express.Router();

router.get('/', (req, res) => sendResponse(res, 200, `API is running`));
router.use('/api/auth', authRoutes);
router.use('/api/upload', uploadRoutes);
router.use('/api/wbs', wbsRoutes);
router.use('/api/approve', assignTaskRoutes);
export default router;
