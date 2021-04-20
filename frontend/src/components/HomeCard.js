import React from 'react';
import { useHistory } from 'react-router';
import '../styles/homeCard.scss';

function HomeCard({ listTitle, listDesc, listPic, listLink }) {
	const history = useHistory();
	return (
		<div className="listItem">
			<img className="listPic" src={listPic} alt="" />
			<p className="listTitle">{listTitle}</p>
			<div className="listDesc">{listDesc}</div>

			<button
				className="listButton"
				onClick={(e) => {
					e.preventDefault();
					history.push(listLink);
				}}>
				View List
			</button>
		</div>
	);
}

export default HomeCard;
