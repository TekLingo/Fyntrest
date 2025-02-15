import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumb = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Generate breadcrumb items from the current URL path
	const pathnames = location.pathname.split('/').filter((x) => x);

	const handleClick = (index) => {
		const path = '/' + pathnames.slice(0, index + 1).join('/');
		navigate(path);
	};

	return (
		<div className="flex flex-row items-center justify-start gap-2 md:mx-28 mx-5 text-text-g">
			{/* Home breadcrumb */}
			<p className="cursor-pointer font-semibold" onClick={() => navigate('/')}>
				Home
			</p>
			{pathnames.map((item, index) => (
				<React.Fragment key={index}>
					<p>{'>'}</p>
					<p
						className={`cursor-pointer ${
							index === pathnames.length - 1 ? 'font-bold' : ''
						}`}
						onClick={() => handleClick(index)}
					>
						{item}
					</p>
				</React.Fragment>
			))}
		</div>
	);
};

export default Breadcrumb;
