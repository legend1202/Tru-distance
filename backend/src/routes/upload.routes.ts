import express from 'express';
import multer from '../services/multer.services';
import verifyToken from '../middleware/auth.middleware';

import { errorWrap } from '../utils/error.utils';
import { uploadBoePdf, uploadCbom, uploadGra, uploadSow, uploadTravel } from '../controllers/upload.controller';

const router = express.Router();

router.post(
  '/boe',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  multer.array('boe'),
  errorWrap(uploadBoePdf, 'Could not upload Boe pdf')
);

router.post(
  '/cbom',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  multer.array('cbom'),
  errorWrap(uploadCbom, 'Could not upload Boe pdf')
);

router.post(
  '/travel',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  multer.array('travel'),
  errorWrap(uploadTravel, 'Could not upload Boe pdf')
);

router.post(
  '/sow',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  multer.array('sow'),
  errorWrap(uploadSow, 'Could not upload Boe pdf')
);

router.post(
  '/gra',
  errorWrap(verifyToken, 'Could not verify JWT token'),
  multer.array('gra'),
  errorWrap(uploadGra, 'Could not upload Boe pdf')
);

export default router;
