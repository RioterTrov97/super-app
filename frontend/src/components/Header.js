import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../actions/adminActions';
import '../styles/Header.scss';
import SearchBox from './SearchBox';

const Header = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const adminLogin = useSelector((state) => state.adminLogin);
	const { adminInfo } = adminLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header className="header__container">
			<div className="header__main">


				<div
					className="header__left"
					onClick={() =>
						history.push(`${adminInfo ? '/' : '/login'}`)
					}>
					<i className="fab fa-speakap"></i> Super App Support
				</div>
				<Route render={({ history }) => <SearchBox history={history} />} />
				{adminInfo ? (
					<div className="header__right" onClick={logoutHandler}>
						Logout
					</div>
				) : null}
			</div>
		</header>
	);
};

export default Header;
