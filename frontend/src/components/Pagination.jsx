import React from 'react';

const Pagination = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageClick = (page) => {
		if (page < 1 || page > totalPages) return;
		onPageChange(page);
	};

	return (
		<div className="flex gap-2 items-center">
			<button
				onClick={() => handlePageClick(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-3 py-1 rounded-md bg-primary_p disabled:opacity-50"
			>
				Prev
			</button>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
				<button
					key={page}
					onClick={() => handlePageClick(page)}
					className={`px-3 py-1 rounded-md ${
						currentPage === page ? 'bg-secondary-dt' : 'bg-primary_p'
					}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => handlePageClick(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-3 py-1 rounded-md bg-primary_p disabled:opacity-50"
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
