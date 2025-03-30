import React, { useEffect, useMemo, useState } from 'react';
import { GoHome } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import PracticeTest from '../../components/Cards/PracticeTest';
import FlashcardCarousel from '../../components/FlashcardCarousel';
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import axiosInstance from '../../utils/axiosInstance';

const VideoPage = () => {
	const { moduleId, videoId } = useParams();
	const [moduleData, setModuleData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleClick = () => {
		// Pass moduleId and current videoId as state to Quiz
		navigate(`/logged/quiz/${videoId}`, {
			state: { moduleId, currentVideoId: videoId },
		});
	};

	// Fetch module data only when moduleId changes
	useEffect(() => {
		const fetchModuleData = async () => {
			setLoading(true);
			try {
				const response = await axiosInstance.get(`/modules/${moduleId}`);
				if (response.status === 200 && response.data.success) {
					setModuleData(response.data.data);
					setError(null);
				} else {
					setError('Invalid response from server');
				}
			} catch (err) {
				console.error('Error fetching module data:', err);
				setError('Error fetching video data');
			} finally {
				setLoading(false);
			}
		};

		fetchModuleData();
	}, [moduleId]);

	useEffect(() => {
		if (videoId === 'next' && moduleData && moduleData.videos) {
			const currentIndex = moduleData.videos.findIndex(
				(v) => v._id === videoId
			);
			if (currentIndex !== -1 && currentIndex + 1 < moduleData.videos.length) {
				navigate(
					`/logged/module/${moduleId}/video/${
						moduleData.videos[currentIndex + 1]._id
					}`
				);
			} else {
				setError('No next video available.');
			}
		}
	}, [videoId, moduleData, moduleId, navigate]);

	// Handle clicking an "Up Next" video
	const handleVideoClick = (video) => {
		navigate(`/logged/module/${moduleId}/video/${video._id}`);
	};

	// Memoize mainVideo and upNextVideos
	const { mainVideo, upNextVideos } = useMemo(() => {
		if (!moduleData || !moduleData.videos)
			return { mainVideo: null, upNextVideos: [] };
		const videos = moduleData.videos;
		const videoIndex = videos.findIndex((v) => v._id === videoId);
		if (videoIndex === -1) return { mainVideo: null, upNextVideos: [] };
		return {
			mainVideo: videos[videoIndex],
			upNextVideos: videos.slice(videoIndex + 1),
		};
	}, [moduleData, videoId]);

	// Loading, error, and not-found states
	if (loading) return <div>Loading...</div>;
	if (error)
		return <div className="text-center text-2xl font-bold mt-10">{error}</div>;
	if (!mainVideo)
		return (
			<div className="text-center text-2xl font-bold mt-10">
				Video not found
			</div>
		);

	return (
		<div>
			<Navbar2 />
			<Breadcrumb
				items={[
					<GoHome key="home-icon" className="h-auto w-6" />,
					'User',
					'Video',
				]}
			/>
			<div className="mx-28 text-text-g gap-16 flex flex-col">
				<div className="w-full my-10">
					<div className="flex col-span-2 gap-32 items-center justify-around">
						<div>
							<div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
								<h1>{mainVideo.title}</h1>
							</div>
							<div className="text-md">
								<p>{mainVideo.description || 'No description available'}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-10 w-full h-[520px]">
					{/* Main Video */}
					<div className="w-full overflow-hidden rounded-lg">
						<iframe
							className="w-full h-full"
							src={`${mainVideo.url}?autoplay=0`}
							title={mainVideo.title}
							allowFullScreen
						/>
					</div>
					{/* Up Next Section */}
					<div className="h-full w-[400px] flex-shrink-0">
						<h2 className="text-4xl font-body font-bold mb-8">Up Next</h2>
						<div className="relative w-full h-[445px] overflow-hidden">
							<div className="w-full h-full overflow-y-auto flex flex-col gap-6 pr-2">
								{upNextVideos.map((video) => (
									<div
										key={video._id}
										className="w-full h-32 flex gap-4 items-start group cursor-pointer transition-transform transform hover:scale-105"
										onClick={() => handleVideoClick(video)}
									>
										{/* Thumbnail */}
										<div className="w-1/2 relative rounded-lg overflow-hidden">
											{video.thumbnail ? (
												<img
													src={video.thumbnail}
													alt={video.title}
													className="w-full h-32 object-cover"
												/>
											) : (
												<div className="w-full h-32 bg-gray-200 flex items-center justify-center">
													<span>No Thumbnail</span>
												</div>
											)}
										</div>
										{/* Video Info */}
										<div className="flex-1">
											<h3 className="text-lg font-semibold">{video.title}</h3>
											<p className="text-sm text-gray-500">
												{video.description?.substring(0, 50) ||
													'No description available'}
												{video.description?.length > 50 ? '...' : ''}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<FlashcardCarousel />
				<div className="flex justify-center">
					<button
						className="w-80 h-12 text-xl font-bold bg-purple-700 rounded-3xl"
						onClick={handleClick}
					>
						Start Video Quiz
					</button>
				</div>
				<PracticeTest />
			</div>
			<Footer />
		</div>
	);
};

export default VideoPage;
