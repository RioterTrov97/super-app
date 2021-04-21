import axios from 'axios';
import {
	CSV_UPLOAD_REQUEST,
	CSV_UPLOAD_SUCCESS,
	CSV_UPLOAD_FAIL,
} from '../constants/csvConstants';
import { logout } from './adminActions';

export const uploadFileHandler = (file, type) => async (dispatch) => {
	try {
		dispatch({
			type: CSV_UPLOAD_REQUEST,
		});
		const formData = new FormData();
		formData.append('csv', file);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		const { data } = await axios.post(
			`/api/upload/${type}`,
			formData,
			config
		);
		console.log(data);

		dispatch({
			type: CSV_UPLOAD_SUCCESS,
			payload: { data, type },
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(logout());
		}
		dispatch({
			type: CSV_UPLOAD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
