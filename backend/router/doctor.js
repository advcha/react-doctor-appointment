import express from 'express';
import {
  createDoctor,
  getDoctors,
  deleteDoctor,
  deleteMultiDoctors,
  updateDoctor,
} from '../controller/doctorController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, createDoctor);
// router.route('/').get(protect, getDoctors);
router.route('/').get(getDoctors);
router.route('/:id').delete(protect, deleteDoctor).put(protect, updateDoctor);
router.route('/delete').post(protect, deleteMultiDoctors);

export default router;
