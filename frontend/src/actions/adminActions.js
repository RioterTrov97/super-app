import axios from '../utils/axios';
import {
	ADMIN_DETAILS_FAIL,
	ADMIN_DETAILS_REQUEST,
	ADMIN_DETAILS_SUCCESS,
	ADMIN_LOGIN_FAIL,
	ADMIN_LOGIN_REQUEST,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGOUT,
	ADMIN_CREATE_FAIL,
	ADMIN_CREATE_REQUEST,
	ADMIN_CREATE_SUCCESS,
	ADMIN_LIST_FAIL,
	ADMIN_LIST_SUCCESS,
	ADMIN_LIST_REQUEST,
	ADMIN_LIST_RESET,
	ADMIN_CREATE_RESET,
} from '../constants/adminConstants';
import { PARTNER_LIST_RESET } from '../constants/partnerConstants';
import { USER_LIST_RESET } from '../constants/userConstants';

export const login = (phoneNumber, password) => async (dispatch) => {
	try {
		dispatch({
			type: ADMIN_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/admins/login',
			{ phoneNumber, password },
			config
		);

		dispatch({
			type: ADMIN_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('adminInfo', JSON.stringify(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(logout());
		}
		dispatch({
			type: ADMIN_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('adminInfo');
	dispatch({ type: ADMIN_LOGOUT });
	dispatch({ type: ADMIN_CREATE_RESET });
	dispatch({ type: ADMIN_LIST_RESET });
	dispatch({ type: PARTNER_LIST_RESET });
	dispatch({ type: USER_LIST_RESET });
	document.location.href = '/login';
};

export const verifyAdmin = () => async (dispatch) => {
	try {
		dispatch({
			type: ADMIN_LOGIN_REQUEST,
		});

		const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/admins/verify`, config);

		dispatch({
			type: ADMIN_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('adminInfo', JSON.stringify(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(logout());
		}
		dispatch({
			type: ADMIN_LOGIN_FAIL,
			payload: message,
		});
	}
};

export const createAdmin = (name, phoneNumber, password) => async (
	dispatch
) => {
	try {
		dispatch({
			type: ADMIN_CREATE_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/admins',
			{ name, phoneNumber, password },
			config
		);

		dispatch({
			type: ADMIN_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getAdminDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADMIN_DETAILS_REQUEST,
		});

		const {
			adminLogin: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/admins/${id}`, config);

		dispatch({
			type: ADMIN_DETAILS_SUCCESS,
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
			type: ADMIN_DETAILS_FAIL,
			payload: message,
		});
	}
};

export const listAdmins = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADMIN_LIST_REQUEST,
		});

		const {
			adminLogin: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/admins`, config);

		dispatch({
			type: ADMIN_LIST_SUCCESS,
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
			type: ADMIN_LIST_FAIL,
			payload: message,
		});
	}
};
