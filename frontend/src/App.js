import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { verifyAdmin } from './actions/adminActions';
import LoadingSpinner from './components/LoadingSpinner';
import AdminList from './screens/AdminListScreen';
import Header from './components/Header';
import './App.css';
import PartnerListScreen from './screens/PartnerListScreen';
import UserListScreen from './screens/UserListScreen';
import CreateAdminScreen from './screens/CreateAdminScreen';

const App = () => {
	const dispatch = useDispatch();
	const adminLogin = useSelector((state) => state.adminLogin);
	const { loading } = adminLogin;

	useEffect(() => {
		if (localStorage.getItem('adminInfo')) {
			dispatch(verifyAdmin());
		}
	}, [dispatch]);

	return (
		<Router>
			<Header />
			<main className="contentContainer">
				{!loading ? (
					<>
						<Route exact path="/adminlist" component={AdminList} />
						<Route
							exact
							path="/createadmin"
							component={CreateAdminScreen}
						/>
						<Route
							exact
							path="/partnerlist"
							component={PartnerListScreen}
						/>
						<Route
							exact
							path="/userlist"
							component={UserListScreen}
						/>
						<Route exact path="/login" component={LoginScreen} />
						<Route exact path="/" component={HomeScreen} />
					</>
				) : (
					<LoadingSpinner />
				)}
			</main>
		</Router>
	);
};

export default App;
