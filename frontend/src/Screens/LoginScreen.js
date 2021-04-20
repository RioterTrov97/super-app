import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import '../styles/loginScreen.scss';
import InlineSpinner from '../components/InlineSpinner';
import InlineMessage from '../components/InlineMessage';
import { login } from '../actions/adminActions';

const LoginScreen = () => {
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const dispatch = useDispatch();
	const adminLogin = useSelector((state) => state.adminLogin);
	const { loading, error, adminInfo } = adminLogin;

	useEffect(() => {
		if (adminInfo) {
			history.push('/');
		}
	}, [history, adminInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(phone, password));
	};

	return (
		<div className="loginScreen">
			<h1 className="loginScreen__title">Login</h1>
			{error ? <InlineMessage message={error} color="red" /> : null}
			<label htmlFor="loginPhone">Phone Number</label>
			<input
				id="loginPhone"
				type="tel"
				disabled={loading}
				placeholder="Enter phone number"
				onChange={(e) => setPhone(e.target.value)}
			/>
			<label htmlFor="loginPassword">Password</label>
			<input
				id="loginPassword"
				type="text"
				disabled={loading}
				placeholder="Enter strong password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" onClick={submitHandler} disabled={loading}>
				{loading ? <InlineSpinner /> : 'SIGN IN'}
			</button>
		</div>
	);
};

export default LoginScreen;
