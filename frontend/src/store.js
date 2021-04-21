import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	adminCreateReducer,
	adminListReducer,
	adminLoginReducer,
} from './reducers/adminReducers';
import { userListReducer } from './reducers/userReducers';
import { partnerListReducer } from './reducers/partnerReducers';

const reducer = combineReducers({
	adminLogin: adminLoginReducer,
	adminCreate: adminCreateReducer,
	adminList: adminListReducer,
	partnerList: partnerListReducer,
	userList: userListReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
