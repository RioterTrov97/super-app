import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { listAdmins } from '../actions/adminActions';

const AdminList = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const adminList = useSelector((state) => state.adminList);
	const { loading, error, admins } = adminList;

	console.log(admins);

	useEffect(() => {
		if (!localStorage.getItem('adminInfo')) {
			history.push('/login');
			return;
		}
		dispatch(listAdmins());
	}, [dispatch, history]);

	return (
		<div className="adminListScreen">
			<div className="adminListScreen__main">
				<h1 className="adminListScreen__title">Admin List</h1>
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
						<tbody>
							{admins?.map((admin) => (
								<tr key={admin?._id}>
									<td
										className="AdminListScreen__tableId"
										onClick={() =>
											window.open(`/admin/${admin?._id}`)
										}>
										{admin?._id}
									</td>
									<td>{admin?.name}</td>
									<td>{admin?.phoneNumber}</td>
									<td>
										{admin?.isSuperAdmin ? (
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
											window.open(`/admin/${admin?._id}`)
										}>
										Edit
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default AdminList;
