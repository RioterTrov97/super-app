import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { list } from '../actions/listActions';
import Paginate from '../components/Paginate';
import SearchBox from '../components/SearchBox';

const ListScreen = ({ socket, setupSoc }) => {
	const { keyword, pageNumber } = useParams();

	console.log('keyword n Num: ', keyword, pageNumber);

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
		dispatch(list(keyword, pageNumber));
	}, [dispatch, history, pageNumber, keyword]);

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
				<SearchBox type="list" />
			</div>
			{error ? (
				<Message
					message={`Search results for "${keyword}"`}
					color="red"
				/>
			) : null}
			{keyword ? (
				<Message
					message={`Search results for "${keyword}"`}
					color="green"
				/>
			) : null}
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
									<td>{list?.name}</td>
									<td>{list?.phoneNumber}</td>
									<td
										className="adminListScreen__AdminLink"
										onClick={(e) =>
											sendCallData(e, list?.phoneNumber)
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
						keyword={keyword ? keyword : ''}
						listType="list"
					/>
				</>
			)}
		</div>
	);
};

export default ListScreen;
