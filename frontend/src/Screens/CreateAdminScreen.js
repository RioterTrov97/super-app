import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createAdmin } from '../actions/adminActions';
import InlineMessage from '../components/InlineMessage';
import InlineSpinner from '../components/InlineSpinner';

const CreateAdminScreen = () => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();

	const adminCreate = useSelector((state) => state.adminCreate);
	const { loading, error, success, adminInfo } = adminCreate;

	const reset = () => {
		setName('');
		setPhone('');
		setPassword('');
	};

	useEffect(() => {
		if (!localStorage.getItem('adminInfo')) {
			history.push('/login');
			return;
		}
		if (adminInfo) {
			reset();
		}
	}, [dispatch, history, adminInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(name, phone, password);
		if (name && phone && password) {
			dispatch(createAdmin(name, phone, password));
		}
	};
	return (
		<div className="loginScreen">
			<div className="adminListScreen__titleBar">
				<i
					className="fas fa-arrow-circle-left"
					onClick={() => history.push('/adminlist')}></i>
				<h1 className="adminListScreen__title">Create Admin</h1>
			</div>
			{error ? <InlineMessage message={error} color="red" /> : null}
			{success ? (
				<InlineMessage
					message={`New admin named as ${adminInfo.name} has been created!`}
					color="green"
				/>
			) : null}
			<label htmlFor="createName">Name</label>
			<input
				id="createName"
				type="text"
				value={name}
				disabled={loading}
				placeholder="Enter admin name"
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor="createPhone">Phone Number</label>
			<input
				id="createPhone"
				type="tel"
				value={phone}
				disabled={loading}
				placeholder="Enter phone number"
				onChange={(e) => setPhone(e.target.value)}
			/>
			<label htmlFor="createPassword">Password</label>
			<input
				id="createPassword"
				type="text"
				value={password}
				disabled={loading}
				placeholder="Enter strong password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				type="submit"
				onClick={(e) => submitHandler(e)}
				disabled={loading}>
				{loading ? <InlineSpinner /> : 'CREATE'}
			</button>
		</div>
	);
};

export default CreateAdminScreen;
