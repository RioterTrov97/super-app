import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { listPartners } from '../actions/partnerActions';
import Paginate from '../components/Paginate';

const PartnerListScreen = ({ socket, setupSoc }) => {
	const [settingSoc, setSettingSoc] = useState(false);
	const history = useHistory();

	const dispatch = useDispatch();
	const partnerList = useSelector((state) => state.partnerList);
	const { loading, error, partners } = partnerList;

	console.log(partners);

	useEffect(() => {
		console.log('hey');
		if (socket) {
			console.log('socket is here');
			socket.emit('joinRoom', 'partnerListRoom');
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
		dispatch(listPartners());
	}, [dispatch, history]);

	const sendCallData = (e, phoneNumber) => {
		e.preventDefault();
		if (socket) {
			socket.emit('call', 'partnerListRoom', phoneNumber);
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
				<p className="adminListScreen__title">Partner List</p>
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
							{partners?.partners?.map((partner) => (
								<tr key={partner?._id}>
									<td>{partner?._id}</td>
									<td>{partner?.name}</td>
									<td>{partner?.phoneNumber}</td>
									<td
										className="adminListScreen__AdminLink"
										onClick={(e) =>
											sendCallData(
												e,
												partner?.phoneNumber
											)
										}>
										Call
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Paginate
						pages={partners?.pages}
						page={partners?.page}
						listType="partnerlist"
					/>
				</>
			)}
		</div>
	);
};

export default PartnerListScreen;
