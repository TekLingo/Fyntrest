import React from 'react';

const CourseCard = ({ title, img, index }) => {
	const variantStyles = [
		{
			bg: 'bg-gradient-to-br from-yellow-700 to-orange-700',
			position: '-top-4 -right-6',
		},
		{ bg: 'bg-gradient-to-br from-green-400 to-blue-700', position: '-left-6' },
		{
			bg: 'bg-gradient-to-br from-blue-200 to-violet-500',
			position: '-bottom-5 -left-5',
		},
		{
			bg: 'bg-gradient-to-br from-purple-600 to-purple-950',
			position: '-top-2 -left-2',
		},
	];

	const selectedStyle = variantStyles[index % variantStyles.length];

	return (
		<div className="w-60 h-60 rounded-lg flex flex-col items-center justify-center shadow-lg relative overflow-hidden bg-primary-b cursor-pointer">
			<span
				className={`absolute w-36 h-36 rounded-full blur-2xl opacity-80 ${selectedStyle.bg} ${selectedStyle.position}`}
			></span>
			<div className="flex flex-col items-center gap-4">
				<img src={img} alt={title} className="w-16 h-16 object-cover" />
				<h3 className="text-white text-lg font-semibold text-center">
					{title}
				</h3>
			</div>
		</div>
	);
};

export default CourseCard;
