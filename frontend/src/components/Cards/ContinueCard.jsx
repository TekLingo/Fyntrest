import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import GirlImg from '../../assets/Images/landing page/after-login/Girl.png';
import axiosInstance from '../../utils/axiosInstance';

const ContinueCard = () => {
	const [userName, setUserName] = useState('');
	const [loading, setLoading] = useState(true);
	const [videoStatus, setVideoStatus] = useState("Let's Start");
	const [videoUrl, setVideoUrl] = useState('');
	const navigate = useNavigate();

	const videoBaseUrl = 'http://localhost:8000/uploads/course-videos'; // Video folder path

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					navigate('/login');
					return;
				}

				// Fetch user data
				const userResponse = await axiosInstance.get('/api/get-user', {
					headers: { Authorization: `Bearer ${token}` },
				});

				const userData = userResponse.data.user || {};
				console.log('User Data:', userData);
				setUserName(userData.firstName || 'Guest');

				if (userData.enrolledCourses && userData.enrolledCourses.length > 0) {
					const latestCourse =
						userData.enrolledCourses[userData.enrolledCourses.length - 1];

					if (latestCourse.progress === 0) {
						setVideoStatus("Let's Start");

						// Fetch video list from backend
						const videoResponse = await axiosInstance.get(
							'/api/get-course-videos'
						);
						const videoFiles = videoResponse.data.videos || [];

						if (videoFiles.length > 0) {
							console.log('videoFiles:', videoFiles);
							const randomVideo =
								videoFiles[Math.floor(Math.random() * videoFiles.length)];
							console.log('randomVideo:', randomVideo);
							setVideoUrl(`"${videoBaseUrl}/${randomVideo}"`);
							console.log('Final video URL:', videoUrl);
						} else {
							console.log('videoFiles is empty or null.');
							setVideoUrl('');
						}
					} else {
						setVideoStatus("Let's Resume");
						setVideoUrl(latestCourse.course.videoUrl);
						console.log(latestCourse.course.videoUrl);
					}
				}
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

		fetchUserData();
	}, [navigate]);

	const handleNavigate = () => {
		navigate('/logged/course/');
	};

	if (loading) {
		return <div>Loading...</div>;
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
					<div className="flex text-3xl pt-8">
						<p>{videoStatus}</p>
					</div>
				</div>

				{/* Video Section */}
				<div
					className="w-1/3 h-60 cursor-pointer rounded-2xl overflow-hidden bg-purple-300"
					onClick={handleNavigate}
				>
					{videoUrl ? (
						<ReactPlayer
							// url={videoUrl}
							url="http://localhost:8000/uploads/course-videos/video-1739030282862-574686968.mp4"
							playing={false}
							controls={true}
							width="100%"
							height="100%"
							className="object-cover w-full h-full" // Added width/height classes
							config={{
								file: {
									attributes: {
										controlsList: 'nodownload', // Add if needed
									},
								},
							}}
							onError={(error) => console.error('Video Error:', error)}
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center">
							<p>No video available</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContinueCard;
