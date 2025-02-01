import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/login');
	};

	return (
		<div className="flex justify-center min-w-36">
			<button
				type="button"
				className="bg-text-g w-28 rounded-full h-8 select-none justify-center flex items-center font-body font-medium"
				onClick={handleNavigate}
			>
				Get Started
			</button>
		</div>
	);
};

export default GetStarted;
