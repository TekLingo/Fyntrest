import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
	const navigate = useNavigate();
	const location = useLocation();

	// If items are provided, use them instead of generating from the URL.
	if (items && items.length > 0) {
		return (
			<div className="flex flex-row items-center justify-start gap-2 mx-28 text-text-g">
				{items.map((item, index) => (
					<React.Fragment key={index}>
						{index > 0 && <p>{'>'}</p>}
						<span
							className={
								index === items.length - 1 ? 'font-bold' : 'cursor-pointer'
							}
							onClick={() => {
								if (item.path) {
									navigate(item.path);
								}
							}}
						>
							{item.label || item}
						</span>
					</React.Fragment>
				))}
			</div>
		);
	}

	// Generate breadcrumbs from the URL if no items are provided.
	const pathnames = location.pathname.split('/').filter((x) => x);

	return (
		<div className="flex flex-row items-center justify-start gap-2 mx-28 text-text-g">
			<p className="cursor-pointer font-semibold" onClick={() => navigate('/')}>
				Home
			</p>
			{pathnames.map((item, index) => {
				const path = '/' + pathnames.slice(0, index + 1).join('/');
				return (
					<React.Fragment key={index}>
						<p>{'>'}</p>
						<p
							className={`cursor-pointer ${
								index === pathnames.length - 1 ? 'font-bold' : ''
							}`}
							onClick={() => navigate(path)}
						>
							{decodeURIComponent(item)}
						</p>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default Breadcrumb;
