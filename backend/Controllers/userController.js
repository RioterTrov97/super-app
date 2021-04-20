import asyncHandler from 'express-async-handler'
import User from '../models/PartnerModel.js'



// @desc    Get User by ID
// @route   GET /api/User/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)


  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all user
// @route   GET /api/Users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })

  export {getUsers,getUserById  }