import React, { useEffect, useState } from 'react';
import { GoHome } from 'react-icons/go';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import ModuleLogin from '../../components/Cards/ModuleLogin';
import PracticeTest from '../../components/Cards/PracticeTest';
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import axiosInstance from '../../utils/axiosInstance';

const LoggedModulePage = () => {
	const { moduleId } = useParams();
	const [moduleData, setModuleData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchModuleData = async () => {
			try {
				const response = await axiosInstance.get(`/modules/${moduleId}`);
				setModuleData(response.data);
			} catch (err) {
				console.error('Error fetching module data:', err);
				setError('Error fetching module data');
			} finally {
				setLoading(false);
			}
		};

		fetchModuleData();
	}, [moduleId]);

	if (loading) return <div>Loading...</div>;
	if (error)
		return <div className="text-center text-2xl font-bold mt-10">{error}</div>;
	if (!moduleData)
		return (
			<div className="text-center text-2xl font-bold mt-10">
				No module found
			</div>
		);

	return (
		<div>
			<Navbar2 />
			{/* Breadcrumb Navigation */}
			<Breadcrumb
				items={[
					<GoHome className="h-auto w-6" />,
					// Use course name if available; otherwise, a default string.
					moduleData.courseName || 'Course',
					moduleData.title,
				]}
			/>
			<div className="mx-28 text-text-g gap-16 flex flex-col">
				{/* Heading Section */}
				<div className="w-full my-10">
					<div className="flex flex-col md:flex-row gap-32 items-center justify-around">
						<div>
							<div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
								<h1>{moduleData.title}</h1>
							</div>
							<div>
								<p>{moduleData.description}</p>
							</div>
						</div>
						<div>
							<img src={moduleData.image} alt={moduleData.title} />
						</div>
					</div>
				</div>
				{/* Topics Covered - Showing video titles */}
				<div className="py-4 max-w-[60%]">
					<div className="flex flex-col gap-4">
						<div>
							<h1 className="uppercase text-2xl mb-4">What All is Covered?</h1>
						</div>
						{moduleData.videos && moduleData.videos.length > 0 ? (
							moduleData.videos.map((video, index) => (
								<div key={index} className="flex items-center gap-4">
									<IoCheckmarkOutline className="w-8 h-auto text-secondary-lt" />
									<p className="text-md">{video.title}</p>
								</div>
							))
						) : (
							<p>No videos available</p>
						)}
					</div>
				</div>
				{/* Glimpse of Module - Showing all videos */}
				{moduleData.videos && moduleData.videos.length > 0 && (
					<div className="flex flex-col gap-6 py-6">
						<h2 className="text-4xl font-body font-bold mb-12">
							Glimpse of Module
						</h2>
						{moduleData.videos.map((video, index) => (
							<ModuleLogin
								key={index}
								videoId={video._id}
								thumbnail={video.url}
								title={video.title}
								description={video.description}
							/>
						))}
					</div>
				)}
				<PracticeTest />
			</div>
			<Footer />
		</div>
	);
};

export default LoggedModulePage;
