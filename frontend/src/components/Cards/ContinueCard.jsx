import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GirlImg from '../../assets/Images/landing page/after-login/Girl.png';
import axiosInstance from '../../utils/axiosInstance';

const ContinueCard = () => {
	const [userName, setUserName] = useState('');
	const [loading, setLoading] = useState(true);
	const [videoStatus, setVideoStatus] = useState("Let's Start");
	const [videoUrl, setVideoUrl] = useState('');
	const [courseId, setCourseId] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					navigate('/login');
					return;
				}

				// Fetch user details
				const userResponse = await axiosInstance.get('/get-user', {
					headers: { Authorization: `Bearer ${token}` },
				});
				const userData = userResponse.data.user || {};
				setUserName(userData.firstName || 'Guest');

				if (userData.enrolledCourses?.length > 0) {
					const sortedCourses = [...userData.enrolledCourses].sort(
						(a, b) => new Date(a.enrolledAt) - new Date(b.enrolledAt)
					);
					const latestEnrollment = sortedCourses[0];

					let courseData;
					if (typeof latestEnrollment.course === 'object') {
						courseData = latestEnrollment.course;
					} else {
						const courseResponse = await axiosInstance.get(
							`/courses/${latestEnrollment.course}`
						);
						courseData = courseResponse.data;
					}

					setCourseId(courseData._id || latestEnrollment.course);
					console.log('Current Course:', courseData.title || courseData._id);
					console.log(
						'Current Modules:',
						courseData.modules || 'No modules available'
					);

					// Flatten all videos from modules into a single array
					const allVideos = courseData.modules.flatMap(
						(module) => module.videos || []
					);

					if (latestEnrollment.lastWatched?.video) {
						const videoResponse = await axiosInstance.get(
							`/videos/${latestEnrollment.lastWatched.video}`
						);
						const videoData = videoResponse.data;
						console.log('Current Video:', videoData.title || videoData._id);

						const lastWatchedVideoId = latestEnrollment.lastWatched.video;
						const index = allVideos.findIndex(
							(v) => v._id === lastWatchedVideoId
						);

						if (index !== -1) {
							if (
								latestEnrollment.lastWatched.completed &&
								index < allVideos.length - 1
							) {
								setVideoUrl(allVideos[index + 1].url);
								setVideoStatus("Let's Start Next");
							} else {
								setVideoUrl(allVideos[index].url);
								setVideoStatus("Let's Resume");
							}
						} else {
							// Fallback if last watched video isn’t found
							setVideoUrl(allVideos[0]?.url || null);
							setVideoStatus(
								allVideos[0] ? "Let's Start" : 'No videos available'
							);
						}
					} else if (allVideos.length > 0) {
						setVideoUrl(allVideos[0].url);
						setVideoStatus("Let's Start");
					} else {
						setVideoUrl(null);
						setVideoStatus('No videos available');
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

		fetchUserData().catch((err) => console.error('Unhandled error:', err));
	}, [navigate]);

	const handleNavigate = () => {
		if (courseId) {
			navigate(`/logged/course/${courseId}`);
		} else {
			navigate('/logged/home');
		}
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
					className="w-1/3 h-75 cursor-pointer rounded-2xl overflow-hidden bg-purple-300"
					onClick={handleNavigate}
				>
					{videoUrl ? (
						<video
							className="w-full h-full rounded-lg object-cover"
							src={videoUrl}
							controls={false}
							disablePictureInPicture
							onLoadedMetadata={(e) => (e.target.currentTime = 1)} // Seek to 1s for a thumbnail-like effect
							onPlay={(e) => e.preventDefault()} // Prevent playing
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
