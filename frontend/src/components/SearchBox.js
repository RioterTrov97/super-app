import React, { useState } from 'react';
import { useHistory } from 'react-router';
import '../styles/SearchBox.scss';

const SearchBox = ({ type }) => {
	const history = useHistory();
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/${type}/1/${keyword}`);
		} else {
			console.log('Phone Number is not found');
		}
	};

	return (
		<div className="SearchBox">
			<input
				className="SearchBox__input"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<i
				className="SearchBox__search fas fa-search"
				onClick={submitHandler}></i>
		</div>
	);
};

export default SearchBox;
