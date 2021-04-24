import express from 'express'
const router = express.Router()


import { 
    createLog,
    getLogById,
    getLog
    } from '../controllers/logController.js'

    import { protect, superadmin } from '../middleware/authMiddleware.js'

    router.route('/').get(protect, getLog)
    router.route('/:id').get(protect, getLogById )
    
    export default router