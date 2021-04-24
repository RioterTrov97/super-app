
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
import partnerRoutes from './routes/partnerRoutes.js'
import listRoutes from './routes/listRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import express from 'express'
const router = express.Router()


router.route('/admins', adminRoutes)
router.route('/partners', partnerRoutes)
router.route('/users', userRoutes)
router.route('/lists', listRoutes)
router.route('/upload', uploadRoutes)

export default router

