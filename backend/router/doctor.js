import express from 'express';
const router = express.Router();
import {
  createDoctor,
  getDoctors,
  deleteDoctor,
  deleteMultiDoctors,
  updateDoctor,
} from '../controller/doctorController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createDoctor);
router.route('/').get(protect, getDoctors);
router.route('/:id').delete(protect, deleteDoctor).put(protect, updateDoctor);
router.route('/delete').post(protect, deleteMultiDoctors);

export default router;
