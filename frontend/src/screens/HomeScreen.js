import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import HomeCard from '../components/HomeCard';

import adminImg from '../images/admin.png';
import riderImg from '../images/rider.png';
import userImg from '../images/users.png';
import listImg from '../images/list.png';
import csvImg from '../images/csv.png';

import '../styles/homeScreen.scss';

const HomeScreen = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const adminLogin = useSelector((state) => state.adminLogin);
	const { adminInfo } = adminLogin;

	useEffect(() => {
		if (!adminInfo) {
			history.push('/login');
			return;
		}
	}, [dispatch, history, adminInfo]);

	const capitalizeFirstChar = (str = '') =>
		str.charAt(0).toUpperCase() + str.substring(1);

	return (
		<div className="homeScreen">
			<h1>
				Hi {capitalizeFirstChar(adminInfo?.name)}, What would you like
				to do today?
			</h1>
			<div className="homeScreen__cards">
				{adminInfo?.isSuperAdmin ? (
					<HomeCard
						listPic={adminImg}
						listTitle="Admin List"
						listDesc="This page has details of all the admins of the site. Only superadmin has edit access to this list."
						listLink="/adminlist"
					/>
				) : null}

				<HomeCard
					listPic={riderImg}
					listTitle="Partner List"
					listDesc="This page has details of all the partners of the site. Please follow company policy for any actions."
					listLink="/partnerlist"
				/>

				<HomeCard
					listPic={userImg}
					listTitle="User List"
					listDesc="This page has details of all the users of the site. Please follow company policy for any actions."
					listLink="/userlist"
				/>

				<HomeCard
					listPic={listImg}
					listTitle="User & Partner List"
					listDesc="This page has list of partners and users of the site. Please follow company policy for any actions."
					listLink="/list"
				/>

				<HomeCard
					listPic={csvImg}
					listTitle="Upload CSV"
					listDesc="This page allows you to upload csv files that has user lists or partner lists or the list with both."
					listLink="/uploadcsv"
				/>
			</div>
		</div>
	);
};

export default HomeScreen;