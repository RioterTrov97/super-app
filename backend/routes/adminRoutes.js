import express from 'express'

const router = express.Router()

import { 
    authAdmin,
    registerAdmin,
    getAdmins,
    getAdminById,
    } from '../controllers/adminController.js'

 import { protect, superadmin } from '../middleware/authMiddleware.js'

 router.route('/').post(registerAdmin).get(protect,superadmin, getAdmins)
 router.post('/login', authAdmin);
 router.route('/:id').get(protect, superadmin, getAdminById)
 
 export default router






