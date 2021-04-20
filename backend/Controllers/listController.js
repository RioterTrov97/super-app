  
import asyncHandler from 'express-async-handler'
import List from '../models/Listmodel.js'


// @desc    Create new list
// @route   POST /api/list
// @access  Private

// const addList = asyncHandler(async (req, res) => {

// const list = new List({
//     Users,
//     Partners
//   })

//   const createdList = await list.save()

//   res.status(201).json(createdList)

// })

// @desc    get list 
// @route   get /api/list
// @access  Private

const getList = asyncHandler(async(req,res) => {
    const lists = await List.find({})
    res.json(lists)
})

// @desc    get list 
// @route   get /api/list
// @access  Private

const getListbyid = asyncHandler(async(req,res) => {
    const list = await List.findById(req.params.id)
    res.json(list)
})



export {
    getList,
    getListbyid

}
