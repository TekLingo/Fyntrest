import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GirlImg from '../../assets/Images/landing page/after-login/Girl.png';

const ContinueCard = () => {
	const [userName, setUserName] = useState('');
	const vidStatus = ["Let's Start", "Let's Resume"];
	const Video = [
		'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M',
	];
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserName = async () => {
			try {
				const response = await fetch('/api/user', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});

				if (!response.ok) {
					throw new Error('Failed to fetch user data');
				}

				const data = await response.json();
				setUserName(data.firstName);
			} catch (error) {
				console.error('Error fetching user data:', error);
				// Optional: Set default value or handle error
				setUserName('User');
			}
		};

		fetchUserName();
	}, []);

	const handleNavigate = () => {
		navigate('/logged/course');
	};

	return (
		<div>
			<div className="text-primary-fp text-6xl font-bold font-title h-40">
				<h1>Welcome {userName}</h1>
			</div>
			{/* Video Section */}
			<div className="h-96 flex justify-around items-center">
				<div className="bg-bg-color w-auto text-text-g flex font-body">
					<div>
						<img src={GirlImg} alt="" className="w-auto h-64" />
					</div>
					<div className="flex text-3xl pt-8" onClick={handleNavigate}>
						<p>{vidStatus[1]}</p>
					</div>
				</div>
				<div className="w-1/3 h-60 cursor-pointer">
					<iframe
						className="w-full h-full rounded-2xl"
						src={Video[0]}
						title="Course Video Thumbnail"
						allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						sandbox="allow-scripts allow-same-origin"
					/>
				</div>
			</div>
		</div>
	);
};

export default ContinueCard;
