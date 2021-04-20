import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const HomeScreen = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const adminLogin = useSelector((state) => state.adminLogin);
	const { adminInfo } = adminLogin;

	useEffect(() => {
		if (!adminInfo) {
			history.push('/login');
			return;
		}
	}, [dispatch, history, adminInfo]);
	return (
		<div>
			This is HomeScreen
			<button onClick={() => history.push('/adminlist')}>
				Get Admin List
			</button>
		</div>
	);
};

export default HomeScreen;
