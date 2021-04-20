import React from 'react';
import '../styles/loadingSpinner.scss';

const LoadingSpinner = () => {
	return (
		<div className="loader">
			<div className="face">
				<div className="circle"></div>
			</div>
			<div className="face">
				<div className="circle"></div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
