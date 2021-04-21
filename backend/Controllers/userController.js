import asyncHandler from 'express-async-handler';
import User from '../models/PartnerModel.js';

// @desc    Get User by ID
// @route   GET /api/User/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Get all user
// @route   GET /api/Users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
				phoneNumber: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const count = await User.countDocuments({ ...keyword });
	const users = await User.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

export { getUsers, getUserById };
