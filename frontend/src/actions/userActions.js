import axios from 'axios';
import {
	USER_LIST_FAIL,
	USER_LIST_SUCCESS,
	USER_LIST_REQUEST,
} from '../constants/userConstants';
import { logout } from './adminActions';

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});

		const {
			adminLogin: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users`, config);

		dispatch({
			type: USER_LIST_SUCCESS,
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
			type: USER_LIST_FAIL,
			payload: message,
		});
	}
};
