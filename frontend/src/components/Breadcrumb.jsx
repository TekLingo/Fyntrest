import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
	const navigate = useNavigate();

	// If items are provided, use them instead of generating from the URL.
	if (items && items.length > 0) {
		return (
			<div className="flex flex-row items-center justify-start gap-2 mx-28 text-text-g">
				{items.map((item, index) => (
					<React.Fragment key={index}>
						{/* Only show separator for items after the first */}
						{index > 0 && <p>{'>'}</p>}
						<span
							className={
								index === items.length - 1 ? 'font-bold' : 'cursor-pointer'
							}
							onClick={() => {
								// For example, let the home icon (first item) navigate to the root.
								if (index === 0) {
									navigate('/');
								}
								// Add navigation for other items if needed.
							}}
						>
							{item}
						</span>
					</React.Fragment>
				))}
			</div>
		);
	}

	// Fallback: if no items prop is provided, generate breadcrumbs from the URL.
	const location = useLocation();
	const pathnames = location.pathname.split('/').filter((x) => x);

	const handleClick = (index) => {
		const path = '/' + pathnames.slice(0, index + 1).join('/');
		navigate(path);
	};

	return (
<<<<<<< HEAD
		<div className="flex flex-row items-center justify-start gap-2 mx-28 text-text-g">
=======
		<div className="flex flex-row items-center justify-start gap-2 md:mx-28 mx-5 text-text-g">
			{/* Home breadcrumb */}
>>>>>>> 224da3e96effd613734761e7bab4c96896b788a8
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
