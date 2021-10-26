import express from 'express';
const router = express.Router();
import {
  createBooking,
  getBookings,
  deleteBooking,
  deleteMultiBookings,
  updateBooking,
} from '../controller/bookingController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createBooking);
router.route('/').get(protect, getBookings);
router.route('/:id').delete(protect, deleteBooking).put(protect, updateBooking);
router.route('/delete').post(protect, deleteMultiBookings);

export default router;
