import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/InlineMessage';
import '../styles/adminListScreen.scss';
import { uploadFileHandler } from '../actions/csvActions';



const csvUploadScreen = () => {

	// const [csv, setcsv] = useState('')
	// const [uploading, setUploading] = useState(false)
	// const dispatch = useDispatch()
	
	const csvUpload = useSelector((state) => state.csvUpload);
	const { loading, error, success} = csvUpload;




	const file = e.target.files[0]
	formData.append('image', file)
	return (
		<div className="csvUploadScreen">
			<button
			className="Button"
			type="file"
			value={selectedFile}
			onChange={(e) => setSelectedFile(e.target.files[0])}
			onClick={() => {
			dispatch({ type: ADMIN_CREATE_RESET });
							history.push('/createadmin');
			}}>
			Upload List files
		    </button>
			<button>Upload Partner files</button>
			<button>Upload Mixed files</button>
		</div>
	);
};



export default csvUploadScreen;
