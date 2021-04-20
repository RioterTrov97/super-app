import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../actions/adminActions';
import '../styles/Header.scss';

const Header = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header className="header__container">
			<div className="header__main">
				<div className="header__left" onClick={() => history.push('/')}>
					<i className="fab fa-speakap"></i> Super App Support
				</div>
				<div className="header__right" onClick={logoutHandler}>
					Logout
				</div>
			</div>
		</header>
	);
};

export default Header;
