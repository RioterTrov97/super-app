import axios from 'axios';
import {
	ADMIN_DETAILS_FAIL,
	ADMIN_DETAILS_REQUEST,
	ADMIN_DETAILS_SUCCESS,
	ADMIN_LOGIN_FAIL,
	ADMIN_LOGIN_REQUEST,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGOUT,
	ADMIN_REGISTER_FAIL,
	ADMIN_REGISTER_REQUEST,
	ADMIN_REGISTER_SUCCESS,
	ADMIN_LIST_FAIL,
	ADMIN_LIST_SUCCESS,
	ADMIN_LIST_REQUEST,
	ADMIN_LIST_RESET,
} from '../constants/adminConstants';

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
	dispatch({ type: ADMIN_LIST_RESET });
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

export const register = (name, phoneNumber, password) => async (dispatch) => {
	try {
		dispatch({
			type: ADMIN_REGISTER_REQUEST,
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
			type: ADMIN_REGISTER_SUCCESS,
			payload: data,
		});

		dispatch({
			type: ADMIN_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('adminInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: ADMIN_REGISTER_FAIL,
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
