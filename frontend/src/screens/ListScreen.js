import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { list } from '../actions/listActions';
import Paginate from '../components/Paginate';

const ListScreen = ({ socket, setupSoc }) => {
	const [settingSoc, setSettingSoc] = useState(false);
	const history = useHistory();

	const dispatch = useDispatch();

	const List = useSelector((state) => state.List);
	const { loading, error, lists } = List;

	console.log(lists);

	useEffect(() => {
		if (socket) {
			console.log('socket is here');
			socket.on('newCall', (data) => {
				console.log(`Call Started for List: ${data}`);
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
		dispatch(list());
	}, [dispatch, history]);

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
				<p className="adminListScreen__title">List</p>
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
							{lists?.lists?.map((list) => (
								<tr key={list?._id}>
									<td>{list?._id}</td>
									<td>{list?.userName}</td>
									<td>{list?.userPhoneNumber}</td>
									<td
										className="adminListScreen__AdminLink"
										onClick={(e) =>
											sendCallData(
												e,
												list?.userPhoneNumber
											)
										}>
										Call
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Paginate
						pages={lists?.pages}
						page={lists?.page}
						listType="list"
					/>
				</>
			)}
		</div>
	);
};

export default ListScreen;
