import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { listUsers } from '../actions/userActions';
import Paginate from '../components/Paginate';

const UserListScreen = ({ socket, setupSoc, match }) => {
	const pageNumber = match.params.pageNumber||1
	const history = useHistory();
	const [settingSoc, setSettingSoc] = useState(false);

	const dispatch = useDispatch();
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	console.log(users);


	useEffect(() => {
		if (socket) {
			console.log('socket is here');
			socket.on('newCall', (data) => {
				console.log(`Call Started for User: ${data}`);
			});
		} else {
			console.log('setting up socket again');
			setSettingSoc(!settingSoc);
			setupSoc();
		}

		// eslint-disable-next-line
	}, [settingSoc]);

	useEffect(() => {
		if (!localStorage.getItem('adminInfo')) {
			history.push('/login');
			return;
		}
		dispatch(listUsers(pageNumber));
	}, [dispatch, history,pageNumber]);

	const sendCallData = (e, phoneNumber) => {
		e.preventDefault();
		if (socket) {
			socket.emit('call', phoneNumber);
		} else {
			console.log('no socket');
		}
	};

	return (
		<div className="adminListScreen">
			<div className="adminListScreen__titleBar">
				<i
					className="fas fa-arrow-circle-left"
					onClick={() => history.push('/')}></i>
				<p className="adminListScreen__title">User List</p>
			</div>
			{error ? <Message message={error} color="red" /> : null}
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					<table className="adminListScreen__table">
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Phone Number</th>
								<th>Details</th>
							</tr>
						</thead>
						<tbody>
							{users?.users?.map((user) => (
								<tr key={user?._id}>
									<td>{user?._id}</td>
									<td>{user?.name}</td>
									<td>{user?.phoneNumber}</td>
									<td
										className="adminListScreen__AdminLink"
										onClick={(e) =>
											sendCallData(e, user?.phoneNumber)
										}>
										Call
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Paginate
						pages={users?.pages}
						page={users?.page}
						listType="partnerlist"
					/>
				</>
			)}
		</div>
	);
};

export default UserListScreen;