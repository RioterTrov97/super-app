import React from 'react';
import { useHistory } from 'react-router';
import '../styles/paginate.scss';


const Paginate = ({ pages = 1, page = 1, listType }) => {
	const history = useHistory();
	return (
		pages > 1 && (
			<div className="pagination">
				{[...Array(Number(pages)).keys()].map((x) => (
					<div
						className={
							x + 1 === Number(page)
								? 'pagination__page pagination__activePage'
								: 'pagination__page'
						}
						key={x + 1}
						onClick={() =>
							history.push(`/${listType}/page/${x + 1}`)
						}>
						<p>{x + 1}</p>
					</div>
				))}
			</div>
		)
	);
};

export default Paginate;
