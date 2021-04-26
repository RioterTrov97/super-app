import axios from 'axios';
import {
	LIST_FAIL, 
	LIST_SUCCESS,
	LIST_REQUEST,
} from '../constants/listConstants';
import { logout } from './adminActions';

export const list = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: LIST_REQUEST,
		});

		
		const {
			adminLogin: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/lists`, config);

		dispatch({
			type:LIST_SUCCESS,
			payload: data,
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
			type: LIST_FAIL,
			payload: message,
		});
	}
};
