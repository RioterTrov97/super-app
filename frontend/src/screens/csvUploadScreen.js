import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/csvUploadScreen.scss';
import { uploadFile } from '../actions/csvActions';
import InlineSpinner from '../components/InlineSpinner';
import axios from 'axios';
import InlineMessage from '../components/InlineMessage';

const CsvUploadScreen = () => {
	const dispatch = useDispatch();
	const [successMessage, setSuccessMessage] = useState(null);

	const csvUpload = useSelector((state) => state.csvUpload);
	const { loading, error, csvResult } = csvUpload;

	const uploadFileHandler = async (e, type) => {
		dispatch(uploadFile(e.target.files[0], type));
		e.target.value = '';
	};

	useEffect(() => {
		if (csvResult) {
			setSuccessMessage('Your file has been uploaded');
		}
	}, [csvResult]);

	console.log(csvResult);

	return (
		<div className="csvUploadScreen">
			<div className="csvUploadScreen__card">
				<label htmlFor="uploadPartner">Upload Partner CSV file</label>
				<input
					id="uploadPartner"
					placeholder="Upload partner Files"
					type="file"
					disabled={loading}
					onChange={(e) => uploadFileHandler(e, 'partner')}
				/>
			</div>

			<div className="csvUploadScreen__card">
				<label htmlFor="uploadUser">Upload User CSV file</label>
				<input
					id="uploadUser"
					placeholder="Upload user Files"
					type="file"
					disabled={loading}
					onChange={(e) => uploadFileHandler(e, 'user')}
				/>
			</div>

			<div className="csvUploadScreen__card">
				<label htmlFor="uploadList">
					Upload User & Partner CSV file
				</label>
				<input
					id="uploadList"
					placeholder="Upload partner Files"
					type="file"
					disabled={loading}
					onChange={(e) => uploadFileHandler(e, 'list')}
				/>
			</div>

			<div className="csvUploadScreen__status">
				{successMessage && csvResult?.type === 'partner' ? (
					<InlineMessage
						message={`Your ${csvResult.type} file has been uploaded`}
						color="green"
					/>
				) : null}
				{loading && csvResult?.type === 'partner' ? (
					<InlineSpinner />
				) : null}
				{successMessage && csvResult?.type === 'user' ? (
					<InlineMessage
						message={`Your ${csvResult.type} file has been uploaded`}
						color="green"
					/>
				) : null}
				{loading && csvResult?.type === 'user' ? (
					<InlineSpinner />
				) : null}
				{successMessage && csvResult?.type === 'list' ? (
					<InlineMessage
						message={`Your ${csvResult.type} file has been uploaded`}
						color="green"
					/>
				) : null}
				{loading && csvResult?.type === 'list' ? (
					<InlineSpinner />
				) : null}
			</div>
		</div>
	);
};

export default CsvUploadScreen;
