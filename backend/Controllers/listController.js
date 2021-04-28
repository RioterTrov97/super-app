import asyncHandler from 'express-async-handler';
import List from '../models/Listmodel.js';

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

const getList = asyncHandler(async (req, res) => {
	const pageSize = Number(req.query.pageSize) || 20;
	const page = Number(req.query.pageNumber) || 1;

	console.log(page, req.query.keyword);

	const keyword = req.query.keyword
		? {
				phoneNumber: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const count = await List.countDocuments({ ...keyword });
	const lists = await List.find({ ...keyword })
		.skip(pageSize * (page - 1))
		.limit(pageSize);

	res.json({ lists, page, pages: Math.ceil(count / pageSize) });
});

// @desc    get list  by id
// @route   get /api/list:id
// @access  Private

const getListbyid = asyncHandler(async (req, res) => {
	const list = await List.findById(req.params.id);
	res.json(list);
});

export { getList, getListbyid, mongoPush };
