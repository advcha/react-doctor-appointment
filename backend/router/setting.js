import express from 'express';
import {
  createSetting,
  getSettings,
  deleteSetting,
  deleteMultiSettings,
  updateSetting,
} from '../controller/settingController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, createSetting);
// router.route('/').get(protect, getSettings);
router.route('/').get(getSettings);
router.route('/:id').delete(protect, deleteSetting).put(protect, updateSetting);
router.route('/delete').post(protect, deleteMultiSettings);

export default router;
