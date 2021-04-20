import express from 'express'
const router = express.Router()



import { 
    getPartner,
    getPartnerById 
    } from '../controllers/partnerController.js'

    import { protect, superadmin } from '../middleware/authMiddleware.js'

    router.route('/').get(protect, getPartner)
    router.route('/:id').get(protect,  getPartnerById )
    
    export default router