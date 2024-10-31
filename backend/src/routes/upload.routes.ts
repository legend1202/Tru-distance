import express from 'express';
import multer from '../services/multer.services';
import verifyToken from '../middleware/auth.middleware';

import { errorWrap } from '../utils/error.utils';
import { uploadBoePdf } from '../controllers/upload.controller';

const router = express.Router();

router.post(
  '/boe',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  multer.array('boe'),
  errorWrap(uploadBoePdf, 'Could not upload Boe pdf')
);

export default router;
