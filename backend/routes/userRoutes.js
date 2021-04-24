import express from 'express'
const router = express.Router()

import { 
    getUsers,
    getUserById 
    } from '../controllers/userController.js'

    import { protect, superadmin } from '../middleware/authMiddleware.js'

    router.route('/').get(protect, getUsers )
    router.route('/:id').get(protect, getUserById  )
    
    export default router