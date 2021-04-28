import mongoose from 'mongoose';

const listSchema = mongoose.Schema(
	{
		userName: {
			type: String,
			required: false,
			trim: true,
		},

		userPhoneNumber: {
			type: String,
			required: false,
			trim: true,
		},
		// partnerName: {
		//   type: String,
		//   required: false,
		//   trim: true,
		// },

		// partnerPhoneNumber: {
		//   type: Number,
		//   required:false,
		//   trim: true,
		// },

		// activation: {
		//   type: String,
		//   required:false,
		//   trim: true,
		// },

		// activationDate: {
		//   type: Date,
		//   required:false,
		//   trim: true,
		// },
	},
	{ timestamp: true }
);

const List = mongoose.models.List || mongoose.model('List', listSchema);

export default List;
