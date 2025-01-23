import React from 'react';

const Breadcrumb = ({ items }) => (
	<div className="flex flex-row items-center justify-start gap-2">
		{items.map((item, index) => (
			<React.Fragment key={index}>
				{index > 0 && <p>{'>'}</p>}
				<p className={index === items.length - 1 ? 'font-bold' : ''}>{item}</p>
			</React.Fragment>
		))}
	</div>
);

export default Breadcrumb;
