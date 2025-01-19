import React from 'react';

const CourseCard = ({ title }) => {
	return (
		<div className="CourseCard w-48 h-48 bg-gradient-to-br from-purple-700 to-blue-500 rounded-lg flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
			{/* Decorative Span for Blur Effect */}
			<span className="absolute w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-30 -top-5 -left-5"></span>
			<span className="absolute w-28 h-28 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-2xl opacity-30 -bottom-5 -right-5"></span>

			{/* Icon Placeholder */}
			<span className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
				{/* Use an emoji or custom icon as placeholder */}
				💰
			</span>

			{/* Card Title */}
			<h3 className="text-white text-lg font-semibold text-center">{title}</h3>
		</div>
	);
};

export default CourseCard;
