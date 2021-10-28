import express from 'express';
const router = express.Router();
import {
  createClinic,
  getClinics,
  deleteClinic,
  deleteMultiClinics,
  updateClinic,
} from '../controller/clinicController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createClinic);
//router.route('/').get(protect, getClinics);
router.route('/').get(getClinics);
router.route('/:id').delete(protect, deleteClinic).put(protect, updateClinic);
router.route('/delete').post(protect, deleteMultiClinics);

export default router;
