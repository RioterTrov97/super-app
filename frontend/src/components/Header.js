import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/adminActions';
import '../styles/Header.scss';

const Header = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header className="header__container">
			<div className="header__main">
				<div className="header__left">
					<i className="fab fa-speakap"></i> Super App Support
				</div>
				<div className="header__right" onClick={logoutHandler}>
					<i className="fab fa-sign-out-alt"></i>
					<p>Logout</p>
				</div>
			</div>
		</header>
	);
};

export default Header;
