import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GirlImg from '../../assets/Images/landing page/after-login/Girl.png';
import axiosInstance from '../../utils/axiosInstance';

const ContinueCard = () => {
	const [userName, setUserName] = useState('');
	const [loading, setLoading] = useState(true);
	const vidStatus = ["Let's Start", "Let's Resume"];
	const videoUrl =
		'https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M';
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserName = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					navigate('/login');
					return;
				}

				const response = await axiosInstance.get('/api/get-user', {
					headers: { Authorization: `Bearer ${token}` },
				});

				const userData = response.data;
				console.log('User Data:', userData);
				setUserName(
					userData?.user?.firstName || userData?.firstName || 'Guest'
				);
			} catch (error) {
				console.error('Error fetching user:', error);

				if (error.response?.status === 401) {
					localStorage.removeItem('token');
					navigate('/login');
				} else {
					setUserName('Guest');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchUserName();
	}, [navigate]);

	const handleNavigate = () => {
		navigate('/logged/course');
	};

	if (loading) {
		return <div>Loading...</div>; // Add proper loader component if available
	}

	return (
		<div>
			{/* User Greeting */}
			<div className="text-primary-fp text-6xl font-bold font-title h-40">
				<h1>{`Welcome ${userName}`}</h1>
			</div>

			{/* Video & Navigation Section */}
			<div className="h-96 flex justify-around items-center">
				<div className="bg-bg-color w-auto text-text-g flex font-body">
					{/* Image Section */}
					<div>
						<img
							src={GirlImg}
							alt="Girl Illustration"
							className="w-auto h-64"
						/>
					</div>
					{/* Navigation Button */}
					<div
						className="flex text-3xl pt-8 cursor-pointer"
						onClick={handleNavigate}
					>
						<p>{vidStatus[1]}</p>
					</div>
				</div>

				{/* Video Section */}
				<div className="w-1/3 h-60 cursor-pointer">
					<iframe
						className="w-full h-full rounded-2xl"
						src={videoUrl}
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
