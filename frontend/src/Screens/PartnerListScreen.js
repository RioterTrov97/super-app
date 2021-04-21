import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { listPartners } from '../actions/partnerActions';

const PartnerListScreen = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const partnerList = useSelector((state) => state.partnerList);
	const { loading, error, partners } = partnerList;

	console.log(partners);

	useEffect(() => {
		if (!localStorage.getItem('adminInfo')) {
			history.push('/login');
			return;
		}
		dispatch(listPartners());
	}, [dispatch, history]);

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
								<td className="adminListScreen__AdminLink">
									Call
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default PartnerListScreen;
