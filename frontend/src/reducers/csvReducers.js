import {
	CSV_UPLOAD_REQUEST,
	CSV_UPLOAD_SUCCESS,
	CSV_UPLOAD_FAIL,
} from '../constants/csvConstants';

export const csvUploadReducer = (state = {}, action) => {
	switch (action.type) {
		case CSV_UPLOAD_REQUEST:
			return { loading: true };
		case CSV_UPLOAD_SUCCESS:
			return { loading: false, csvResult: action.payload };
		case CSV_UPLOAD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
