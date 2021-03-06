import Admin from '../models/AdminModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
// @desc    Auth admin & get token
// @route   POST /api/admins/login
// @access  Public

// const authAdmin = asyncHandler(async (req, res) => {
//   const {  phoneNumber, password } = req.body

//   const admin = await Admin.findOne({phoneNumber })

//   if (admin && (await admin.matchPassword(password))) {
//     res.json({
//       _id: admin._id,
//       name: admin.name,
//       phoneNumber: admin. phoneNumber,
//       isActive: admin.isActive,
//       isSuperAdmin: admin. isSuperAdmin,
//       token: generateToken(admin._id),
//     })
//     } else {
//       res.status(401)
//       throw new Error('Invalid phoneNumber or password')
//     }
//   })

const authAdmin = asyncHandler(async (req, res) => {
	const { phoneNumber, password } = req.body;

	const admin = await Admin.findOne({ phoneNumber });

	if (admin && (await admin.matchPassword(password))) {
		if (admin.isActive) {
			res.json({
				name: admin.name,
				phoneNumber: admin.phoneNumber,
				isActive: admin.isActive,
				isSuperAdmin: admin.isSuperAdmin,
				token: generateToken(admin._id),
			});
		} else {
			res.status(403);
			throw new Error('admin in deactivate');
		}
	} else {
		res.status(401);
		throw new Error('Invalid phoneNumber or password');
	}
});

// @desc    Get admin profile with token
// @route   GET /api/admins/verify
// @access  Private
const verifyAdminWithToken = asyncHandler(async (req, res) => {
	if (req.admin) {
		res.json({
			_id: req.admin._id,
			name: req.admin.name,
			phoneNumber: req.admin.phoneNumber,
			isSuperAdmin: req.admin.isSuperAdmin,
			token: generateToken(req.admin._id),
		});
	} else {
		res.status(404);
		throw new Error('Not authorized, token failed');
	}
});

// @desc    Register a Admin
// @route   POST /api/admins
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
	const { name, phoneNumber, password } = req.body;

	const adminExists = await Admin.findOne({ phoneNumber });

	if (adminExists) {
		res.status(400);
		throw new Error('Admin already exists');
	}

	const admin = await Admin.create({
		name,
		phoneNumber,
		password,
	});

	if (admin) {
		res.status(201).json({
			_id: admin._id,
			name: admin.name,
			phoneNumber: admin.phoneNumber,
			isSuperAdmin: admin.isSuperAdmin,
			token: generateToken(admin._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid admin data');
	}
});

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private/Admin
const getAdmins = asyncHandler(async (req, res) => {
	const admins = await Admin.find({});
	res.json(admins);
});

// @desc    Get admin by ID
// @route   GET /api/admins/:id
// @access  Private/Admin
const getAdminById = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.params.id);

	if (admin) {
		res.json(admin);
	} else {
		res.status(404);
		throw new Error('admin not found');
	}
});

export {
	registerAdmin,
	authAdmin,
	getAdmins,
	getAdminById,
	verifyAdminWithToken,
};
