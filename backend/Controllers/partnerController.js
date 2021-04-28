import asyncHandler from 'express-async-handler';
import Partner from '../models/PartnerModel.js';

// @desc    Get Partner by ID
// @route   GET /api/Partner/:id
// @access  Private/Admin
const getPartnerById = asyncHandler(async (req, res) => {
	const partner = await Partner.findById(req.params.id);
	if (partner) {
		res.json(partner);
	} else {
		res.status(404);
		throw new Error('Partner not found');
	}
});

// @desc    Get all partner
// @route   GET /api/orders
// @access  Private/Admin
const getPartner = asyncHandler(async (req, res) => {
	const pageSize = Number(req.query.pageSize) || 20;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				phoneNumber: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const count = await Partner.countDocuments({ ...keyword });
	const partners = await Partner.find({ ...keyword })
		.skip(pageSize * (page - 1))
		.limit(pageSize);

	res.json({ partners, page, pages: Math.ceil(count / pageSize) });
});

export { getPartner, getPartnerById };
