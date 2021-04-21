import express from 'express';
const router = express.Router();

import { getList, getListbyid } from '../controllers/listController.js';

import { protect, superadmin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getList);
router.route('/:id').get(protect, getListbyid);

export default router;
