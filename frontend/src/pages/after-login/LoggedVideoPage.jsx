import React, { useEffect, useState } from 'react';
import { GoHome } from 'react-icons/go';
import { MdOutlinePlayCircle } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import PracticeTest from '../../components/Cards/PracticeTest';
import FlashcardCarousel from '../../components/FlashcardCarousel';
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import axiosInstance from '../../utils/axiosInstance';

const VideoPage = () => {
	const { moduleId, videoId } = useParams(); // Ensure these match the route parameters
	const [moduleData, setModuleData] = useState(null);
	const [mainVideo, setMainVideo] = useState(null);
	const [upNextVideos, setUpNextVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchModuleData = async () => {
			try {
				const response = await axiosInstance.get(`/modules/${moduleId}`);
				if (response.status === 200 && response.data.success) {
					const module = response.data.data;
					setModuleData(module);
					const videos = module.videos || [];
					const videoIndex = videos.findIndex((v) => v._id === videoId);
					if (videoIndex !== -1) {
						setMainVideo(videos[videoIndex]);
						setUpNextVideos(videos.slice(videoIndex + 1));
					} else {
						setError('Video not found in module');
					}
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
	}, [moduleId, videoId]);

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
								<p>{mainVideo.description}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-10 w-full h-[520px]">
					<div className="w-full overflow-hidden rounded">
						<iframe
							className="w-full h-full"
							src={mainVideo.url}
							title={mainVideo.title}
							allowFullScreen
						/>
					</div>
					<div className="h-full w-[400px] flex-shrink-0">
						<h2 className="text-4xl font-body font-bold mb-8">Up Next</h2>
						<div className="w-full flex flex-col gap-6">
							{upNextVideos.map((video, index) => (
								<div
									key={index}
									className="w-full h-32 flex gap-4 items-start group"
								>
									<div className="w-1/2 relative rounded-lg overflow-hidden">
										<div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center text-text-g opacity-0 group-hover:opacity-100 transition-opacity">
											<MdOutlinePlayCircle className="text-3xl" size={60} />
										</div>
										<iframe
											className="w-full h-32"
											src={video.url}
											title={video.title}
											allowFullScreen
										/>
									</div>
									<div className="flex-1">
										<h3 className="text-lg font-semibold">{video.title}</h3>
										<p className="text-sm text-gray-500">{video.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<FlashcardCarousel />
				<PracticeTest />
			</div>
			<Footer />
		</div>
	);
};

export default VideoPage;
