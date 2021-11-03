import express from 'express';
import {
  createBooking,
  getBookings,
  deleteBooking,
  deleteMultiBookings,
  updateBooking,
  getBookingsByClinic,
} from '../controller/bookingController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, createBooking);
router.route('/').get(protect, getBookings);
router.route('/:id').get(getBookingsByClinic);
router.route('/:id').delete(protect, deleteBooking).put(protect, updateBooking);
router.route('/delete').post(protect, deleteMultiBookings);

export default router;
