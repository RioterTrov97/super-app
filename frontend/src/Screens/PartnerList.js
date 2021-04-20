import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { listPartners } from '../actions/partnerActions';

const PartnerList = () => {
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
			<div className="adminListScreen__main">
				<h1 className="adminListScreen__title">Partner List</h1>
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
								<th>SuperAdmin</th>
								<th>Details</th>
							</tr>
						</thead>
						{/* <tbody>
							{partners?.map((partner) => (
								<tr key={partner?._id}>
									<td
										className="AdminListScreen__tableId"
										onClick={() =>
											window.open(
												`/admin/${partner?._id}`
											)
										}>
										{partner?._id}
									</td>
									<td>{partner?.name}</td>
									<td>{partner?.phoneNumber}</td>
									<td>
										{partner?.isSuperAdmin ? (
											<i
												className="fas fa-check"
												style={{ color: 'green' }}></i>
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}></i>
										)}
									</td>
									<td
										className="adminListScreen__tableAdminLink"
										onClick={() =>
											window.open(
												`/admin/${partner?._id}`
											)
										}>
										Edit
									</td>
								</tr>
							))}
						</tbody> */}
					</table>
				)}
			</div>
		</div>
	);
};

export default PartnerList;
