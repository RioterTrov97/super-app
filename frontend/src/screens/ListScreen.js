import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { list } from '../actions/listActions';
import Paginate from '../components/Paginate';

const ListScreen = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const List = useSelector((state) => state.List);
	const { loading, error, lists } = List;

	console.log(lists);

	useEffect(() => {
		if (!localStorage.getItem('adminInfo')) {
			history.push('/login');
			return;
		}
		dispatch(list());
	}, [dispatch, history]);

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
									<td>{list?.name}</td>
									<td>{list?.phoneNumber}</td>
									<td className="adminListScreen__AdminLink">
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
