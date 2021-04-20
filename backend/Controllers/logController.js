import asyncHandler from 'express-async-handler'
import Logcall from '../models/logModel.js'


// @desc    Create a log
// @route   POST /api/logs
// @access  Private/Admin
const createLog = asyncHandler(async (req, res) => {

  let to = req.body.userId;
  let userType = req.body.userType;

  let file = "";
  if(req.file) {
    file = ""; 
  }

  let onModel = "Partner"

  if(userType == "User") {
    onModel = "User"
  }

    const log = new Logcall({
      from: req.admin.id,
      to: to,
      onModel:  onModel,
      duration: {},
      audio: file,
      topic: {},
      details: {},
    })

    const createdLog = await log.save()
    res.status(201).json(createdLog)
  })

// @desc    Get callLog by ID
// @route   GET /api/Logs/:id
// @access  Private
const getLogById = asyncHandler(async (req, res) => {
  const Log = await Logcall.findById(req.params.id).populate(
    
  )

  if (Log) {
    res.json()
  } else {
    res.status(404)
    throw new Error('Id not found')
  }
})

// @desc    Get callLog 
// @route   GET /api/Logs
// @access  Private
const getLog = asyncHandler(async (req, res) => {
  const Log = await Logcall.find({})

  if (Log) {
    res.json()
  } else {
    res.status(404)
    throw new Error('Log not found')
  }
})


export {
    createLog,
    getLogById,
    getLog
}