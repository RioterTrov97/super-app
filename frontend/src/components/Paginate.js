import React from 'react';
import { useHistory } from 'react-router';
import '../styles/paginate.scss';

const Paginate = ({ pages = 1, page = 1, listType, keyword = '' }) => {
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
						onClick={() => {
							console.log('keyword and page: ', keyword, x + 1);
							history.push(
								`/${listType}/${x + 1}${
									keyword ? '/' + keyword : keyword
								}`
							);
						}}>
						<p>{x + 1}</p>
					</div>
				))}
			</div>
		)
	);
};

export default Paginate;
