import axios from 'axios';
import {
	PARTNER_LIST_FAIL,
	PARTNER_LIST_SUCCESS,
	PARTNER_LIST_REQUEST,
} from '../constants/partnerConstants';
import { logout } from './adminActions';

export const listPartners = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PARTNER_LIST_REQUEST,
		});

		const {
			adminLogin: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/partners`, config);

		dispatch({
			type: PARTNER_LIST_SUCCESS,
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
			type: PARTNER_LIST_FAIL,
			payload: message,
		});
	}
};
