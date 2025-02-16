import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleLogin = ({ videoId, thumbnail, title, description }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		// Navigate to the video page with the videoId
		navigate(`/logged/video/${videoId}`);
	};

	return (
		<div
			className="flex items-center justify-between rounded-2xl p-4 bg-bg-color max-w-3xl min-w-full h-80 cursor-pointer"
			onClick={handleClick}
		>
			{/* Thumbnail */}
			<div className="w-1/3 h-full mr-4 relative rounded-lg overflow-hidden">
				<iframe
					className="w-full h-full"
					src={thumbnail}
					title="Course Video Thumbnail"
					allowFullScreen
				/>
			</div>

			{/* Title and Description */}
			<div className="w-3/5 flex flex-col gap-6">
				<h2 className="text-3xl font-bold mb-2 font-body text-text-g">
					{title}
				</h2>
				<p className="text-text-g text-md font-body leading-relaxed">
					{description}
				</p>
			</div>
		</div>
	);
};

export default ModuleLogin;
