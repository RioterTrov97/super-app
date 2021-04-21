import {
	ADMIN_LIST_FAIL,
	ADMIN_LIST_REQUEST,
	ADMIN_LIST_RESET,
	ADMIN_LIST_SUCCESS,
	ADMIN_LOGIN_FAIL,
	ADMIN_LOGIN_REQUEST,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGOUT,
	ADMIN_CREATE_FAIL,
	ADMIN_CREATE_REQUEST,
	ADMIN_CREATE_SUCCESS,
	ADMIN_CREATE_RESET,
} from '../constants/adminConstants';

export const adminLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_LOGIN_REQUEST:
			return { loading: true };
		case ADMIN_LOGIN_SUCCESS:
			return { loading: false, adminInfo: action.payload };
		case ADMIN_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case ADMIN_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const adminCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_CREATE_REQUEST:
			return { loading: true };
		case ADMIN_CREATE_SUCCESS:
			return { loading: false, success: true, adminInfo: action.payload };
		case ADMIN_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case ADMIN_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const adminListReducer = (state = { admins: [] }, action) => {
	switch (action.type) {
		case ADMIN_LIST_REQUEST:
			return { loading: true };
		case ADMIN_LIST_SUCCESS:
			return { loading: false, admins: action.payload };
		case ADMIN_LIST_FAIL:
			return { loading: false, error: action.payload };
		case ADMIN_LIST_RESET:
			return { admins: [] };
		default:
			return state;
	}
};
