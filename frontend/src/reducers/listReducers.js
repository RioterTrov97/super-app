import {
	LIST_FAIL,
	LIST_REQUEST,
	LIST_RESET,
	LIST_SUCCESS,
} from '../constants/listConstants';

export const ListReducer = (state = { lists: [] }, action) => {
	switch (action.type) {
		case LIST_REQUEST:
			return { loading: true };
		case LIST_SUCCESS:
			return { loading: false, lists: action.payload };
		case LIST_FAIL:
			return { loading: false, error: action.payload };
		case LIST_RESET:
			return { lists: [] };
		default:
			return state;
	}
};