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

				// Fetch user data (assumed to populate enrolledCourses with course details if available)
				const userResponse = await axiosInstance.get('/get-user', {
					headers: { Authorization: `Bearer ${token}` },
				});
				const userData = userResponse.data.user || {};
				setUserName(userData.firstName || 'Guest');

				if (userData.enrolledCourses && userData.enrolledCourses.length > 0) {
					// Get the latest enrollment
					const latestEnrollment =
						userData.enrolledCourses[userData.enrolledCourses.length - 1];

					// Check if the course details are populated
					let courseData = null;
					if (
						latestEnrollment.course &&
						typeof latestEnrollment.course === 'object'
					) {
						courseData = latestEnrollment.course;
					} else {
						// If not, fetch course details using the course ID
						const courseResponse = await axiosInstance.get(
							`/courses/${latestEnrollment.course}`
						);
						courseData = courseResponse.data;
					}
					// Set the course ID (whether populated or not)
					setCourseId(courseData._id || latestEnrollment.course);

					// Determine video URL:
					// If there's lastWatched info, try to use that video
					if (
						latestEnrollment.lastWatched &&
						latestEnrollment.lastWatched.video
					) {
						let videoData = null;
						if (typeof latestEnrollment.lastWatched.video === 'object') {
							videoData = latestEnrollment.lastWatched.video;
						} else {
							// Otherwise, fetch the video details by ID
							const videoResponse = await axiosInstance.get(
								`/videos/${latestEnrollment.lastWatched.video}`
							);
							videoData = videoResponse.data;
						}
						setVideoUrl(videoData.videoUrl);
						setVideoStatus("Let's Resume");
					} else {
						// No last watched info – use the course's default video URL
						setVideoUrl(courseData.videoUrl);
						setVideoStatus("Let's Start");
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
		if (courseId) {
			// Redirect to the course page, where further logic can resume at the proper module/video.
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
					className="w-1/3 h-60 cursor-pointer rounded-2xl overflow-hidden bg-purple-300"
					onClick={handleNavigate}
				>
					{videoUrl ? (
						<ReactPlayer
							url={videoUrl}
							playing={false}
							controls={true}
							width="100%"
							height="100%"
							className="object-cover w-full h-full"
							config={{
								file: {
									attributes: {
										controlsList: 'nodownload',
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
