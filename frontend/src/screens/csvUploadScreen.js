import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { uploadFile } from '../actions/csvActions';
import InlineSpinner from '../components/InlineSpinner';
import axios from 'axios';

const CsvUploadScreen = () => {
	const dispatch = useDispatch();

	const csvUpload = useSelector((state) => state.csvUpload);
	const { loading, error, csvResult } = csvUpload;

	const uploadFileHandler = async (e, type) => {
		/* console.log(type);
		console.log(e.target.files[0]);
		dispatch(uploadFile(e.target.files[0], type)); */
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append('csv', file);

			const { data } = await axios.post(
				'http://localhost:4000/api/upload/partner',
				formData,
				config
			);
			console.log(data);
			console.log(formData);
			e.target.value = '';
		} catch (error) {
			console.log(error);
			e.target.value = '';
		}
	};

	console.log(csvResult);

	return (
		<div className="csvUploadScreen">
			<input
				style={{ background: 'none', marginTop: '-20px' }}
				id="uploadPartner"
				placeholder="Upload partner Files"
				type="file"
				disabled={loading}
				onChange={(e) => uploadFileHandler(e, 'partner')}
			/>
			{loading && csvResult?.type === 'partner' ? (
				<InlineSpinner />
			) : null}
			<button>Upload Partner files</button>
			<button>Upload Mixed files</button>
		</div>
	);
};

export default CsvUploadScreen;
