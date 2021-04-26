import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { verifyAdmin } from './actions/adminActions';
import LoadingSpinner from './components/LoadingSpinner';
import AdminListScreen from './screens/AdminListScreen';
import Header from './components/Header';
import './App.css';
import PartnerListScreen from './screens/PartnerListScreen';
import UserListScreen from './screens/UserListScreen';
import ListScreen from './screens/ListScreen';
import CreateAdminScreen from './screens/CreateAdminScreen';
import csvUploadScreen from './screens/csvUploadScreen';
import { io } from 'socket.io-client';





const App = () => {
	const dispatch = useDispatch();
	const adminLogin = useSelector((state) => state.adminLogin);
	const { loading, adminInfo } = adminLogin;

	
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
						{adminInfo ? (
							<>
								<Route
									exact
									path="/uploadcsv"
									component={csvUploadScreen}
								/>
								<Route
									exact
									path="/adminlist"
									component={AdminListScreen}
								/>
								<Route
									exact
									path="/createadmin"
									component={CreateAdminScreen}
								/>
								<Route
									exact
									path="/list"
									component={ListScreen}
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
							
								<Route exact path="/" component={HomeScreen} />

							
							</>
						) : (
							<Redirect to="/login" />
						)}

						<Route exact path="/login" component={LoginScreen} />
					</>
				) : (
					<LoadingSpinner />
				)}
			</main>
		</Router>
	);
};

export default App;
