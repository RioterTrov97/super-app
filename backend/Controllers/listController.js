  
import asyncHandler from 'express-async-handler'
import List from '../models/Listmodel.js'


// @desc    Create new list
// @route   POST /api/list
// @access  Private

const mongoPush = asyncHandler(async (row) => {
    const list = await List.create({
      userName: row.Username,
      userPhoneNumber: row.UserPhone,
      partnerName: row.PartnerName,
      partnerPhoneNumber: row.PartnerPhone,
      activation: row.Activation,
      activationDate: row.ActivationDate,
    });
   
    if (list) {
      console.log('success');
    } else {
      console.log('fail');
    }
  });

// @desc    get list 
// @route   get /api/list
// @access  Private

const getList = asyncHandler(async(req,res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
        phoneNumber: {
          $regex: req.query.keyword,
          $options: 'i',
        }
      }
    : {}

  const count = await List.countDocuments({ ...keyword })
  const lists = await List.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ lists, page, pages: Math.ceil(count / pageSize) })
})


// @desc    get list  by id 
// @route   get /api/list:id
// @access  Private

const getListbyid = asyncHandler(async(req,res) => {
    const list = await List.findById(req.params.id)
    res.json(list)
})



export {
    getList,
    getListbyid,
    mongoPush

}
