import React, { useEffect, useState } from 'react';
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
import CreateAdminScreen from './screens/CreateAdminScreen';
import csvUploadScreen from './screens/csvUploadScreen';
import { io } from 'socket.io-client';

const App = () => {
	const [socket, setSocket] = useState(null);

	const dispatch = useDispatch();
	const adminLogin = useSelector((state) => state.adminLogin);
	const { loading, adminInfo } = adminLogin;

	useEffect(() => {
		if (localStorage.getItem('adminInfo')) {
			dispatch(verifyAdmin());
		}
	}, [dispatch]);

	const setupSocket = () => {
		const token = adminInfo?.token;
		console.log('token', token);
		if (token && !socket) {
			const newSocket = io.connect('/', {
				query: {
					token: adminInfo?.token,
				},
			});

			newSocket.on('disconnect', () => {
				setSocket(null);
				setTimeout(setupSocket, 6000);
			});

			newSocket.on('connect', () => {
				console.log('Success: Socket Connected!');
			});

			setSocket(newSocket);
		}
	};

	useEffect(() => {
		setupSocket();
		// eslint-disable-next-line
	}, [adminLogin]);

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
									path="/partnerlist"
									render={() => (
										<PartnerListScreen
											setupSoc={setupSocket}
											socket={socket}
										/>
									)}
								/>
								<Route
									exact
									path="/userlist"
									render={() => (
										<UserListScreen
											setupSoc={setupSocket}
											socket={socket}
										/>
									)}
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
