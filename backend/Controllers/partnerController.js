import asyncHandler from 'express-async-handler'
import Partner from '../models/PartnerModel.js'


// @desc    Get Partner by ID
// @route   GET /api/Partner/:id
// @access  Private/Admin
const getPartnerById = asyncHandler(async (req, res) => {
    const partner = await Partner.findById(req.params.id)
  

    if (partner) {
      res.json(partner)
    } else {
      res.status(404)
      throw new Error('Partner not found')
    }
  })

// @desc    Get all partner
// @route   GET /api/orders
// @access  Private/Admin
const getPartner = asyncHandler(async (req, res) => {
    const partners = await Partner.find({})
    res.json(partners)
  })

  export {getPartner,getPartnerById }