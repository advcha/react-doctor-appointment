import express from 'express';
const router = express.Router();
import {
  createSetting,
  getSettings,
  deleteSetting,
  deleteMultiSettings,
  updateSetting,
} from '../controller/settingController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createSetting);
//router.route('/').get(protect, getSettings);
router.route('/').get(getSettings);
router.route('/:id').delete(protect, deleteSetting).put(protect, updateSetting);
router.route('/delete').post(protect, deleteMultiSettings);

export default router;
