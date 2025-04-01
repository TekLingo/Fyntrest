import React, { useEffect, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuArrowLeft } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import CompletedNullImg from '../../assets/Images/landing page/after-login/broken-piggy-bank.png';
import SavedNullImg from '../../assets/Images/landing page/after-login/cloud-book.png';
import ProfileImg from '../../assets/Images/landing page/after-login/profile.png';
import VideoNullImg from '../../assets/Images/landing page/features/personalised.png';
import Navbar2 from '../../components/Navbar2';
import axiosInstance from '../../utils/axiosInstance';

const LoggedProfilePage = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);
	const [videos, setVideos] = useState([]);
	const [activeSection, setActiveSection] = useState(null);
	const [hasOngoingVideos, setHasOngoingVideos] = useState(false);
	const [hasCompletedVideos, setHasCompletedVideos] = useState(false);
	const [hasSavedVideos, setHasSavedVideos] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axiosInstance.get('/get-user');
				setUserData(response.data.user);
				setVideos(response.data.videos || []);
				setHasOngoingVideos(response.data.videos?.ongoing?.length > 0);
				setHasCompletedVideos(response.data.videos?.completed?.length > 0);
				setHasSavedVideos(response.data.videos?.saved?.length > 0);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData();
	}, []);

	const handleClick = (section) => {
		setActiveSection(activeSection === section ? null : section);
	};

	const handleEditProfileClick = () => {
		navigate('/logged/profile-detail');
	};

	const handleBackClick = () => {
		navigate(-1); // Navigates to the previous page
	};

	return (
		<div>
			<Navbar2 />
			<div className="flex flex-col gap-16 justify-center text-text-g">
				<div className="mx-40 flex gap-20">
					<LuArrowLeft
						className="text-text-g w-auto h-8 cursor-pointer"
						onClick={handleBackClick}
					/>
					<div className="flex gap-10 w-96">
						<img
							src={userData?.profileImage || ProfileImg}
							alt=""
							className="w-auto h-24"
						/>
						<div className="flex flex-col gap-4">
							<h2 className="font-title text-3xl">
								{userData?.firstName || 'First Name'}{' '}
								{userData?.lastName || 'Last Name'}
							</h2>
							<div className="flex gap-6 text-xl">
								<div>
									Class{' '}
									<span className="font-bold">{userData?.class || '-'}</span>
								</div>
								<div className="font-bold">
									{userData?.school || 'School Name'}
								</div>
							</div>
							<div className="flex gap-4 items-center text-sm">
								<button
									className="bg-primary-fp p-2 rounded-xl w-1/2"
									onClick={handleEditProfileClick}
								>
									Edit Profile
								</button>
								<button className="bg-primary-fp p-2 rounded-xl w-32">
									Your Activity
								</button>
								<IoSettingsOutline className="text-text-g w-auto h-8 cursor-pointer" />
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="flex justify-center items-center">
						<div className="flex flex-col items-center">
							<div
								className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer  font-body ${
									activeSection === 'ongoing'
										? 'border-secondary-lt text-text-g border-b-4'
										: 'border-[#787878] text-[#787878]'
								}`}
								onClick={() => handleClick('ongoing')}
							>
								<p className="">Ongoing Videos</p>
							</div>
						</div>
						<div className="flex flex-col items-center">
							<div
								className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-body ${
									activeSection === 'completed'
										? 'border-secondary-lt text-text-g border-b-4'
										: 'border-[#787878] text-[#787878]'
								}`}
								onClick={() => handleClick('completed')}
							>
								<p className="">Completed</p>
							</div>
						</div>
						<div className="flex flex-col items-center">
							<div
								className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-body ${
									activeSection === 'saved'
										? 'border-secondary-lt text-text-g border-b-4'
										: 'border-[#787878] text-[#787878]'
								}`}
								onClick={() => handleClick('saved')}
							>
								<p className="">Saved</p>
							</div>
						</div>
					</div>
					<div className="w-3/4 flex justify-start p-6 rounded-lg">
						{activeSection === 'ongoing' && (
							<div className="w-full">
								{hasOngoingVideos ? (
									<div className="flex gap-4 p-4">
										{videos.ongoing.map((video, index) => (
											<div
												key={index}
												className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl"
											>
												<div className="bg-secondary-d w-96 h-60 rounded-xl">
													<iframe
														className="w-full h-full rounded-xl"
														src={video.url}
														title={video.title}
														allowFullScreen
													/>
												</div>
												<div>
													<p className="text-lg font-semibold">{video.title}</p>
													<p>{video.module}</p>
													<p>{video.course}</p>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
										<div>
											<img src={VideoNullImg} alt="" className="h-40 w-auto" />
										</div>
										<div className="text-white flex flex-col justify-center items-center text-xl">
											<p>Keep making smart money moves!</p>
											<p>Start watching and continue your journey from here.</p>
										</div>
										<div>
											<button className="rounded-lg h-10 w-32 bg-secondary-lt text-text-d">
												Get Started
											</button>
										</div>
									</div>
								)}
							</div>
						)}
						{activeSection === 'completed' && (
							<div className="w-full">
								{hasCompletedVideos ? (
									<div className="p-4 hover:bg-primary_p w-full rounded-xl flex flex-col gap-2">
										{videos.completed.map((video, index) => (
											<div
												key={index}
												className="flex gap-4 p-2 hover:bg-secondary-dt rounded-xl"
											>
												<div className="bg-secondary-d w-96 h-60 rounded-xl">
													<iframe
														className="w-full h-full rounded-xl"
														src={video.url}
														title={video.title}
														allowFullScreen
													/>
												</div>
												<div>
													<p className="text-lg font-semibold">
														{video.module}
													</p>
													<p>{video.course}</p>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
										<div>
											<img
												src={CompletedNullImg}
												alt=""
												className="h-40 w-auto"
											/>
										</div>
										<div className="text-white flex flex-col justify-center items-center text-xl">
											<p>From piggy banks to digital wallets.</p>
											<p>Unlock the secrets of money together!</p>
										</div>
										<div>
											<button className="rounded-lg h-10 w-32 bg-secondary-lt text-text-d">
												Get Started
											</button>
										</div>
									</div>
								)}
							</div>
						)}
						{activeSection === 'saved' && (
							<div className="w-full">
								{hasSavedVideos ? (
									<div className="flex flex-col gap-2">
										{videos.saved.map((video, index) => (
											<div
												key={index}
												className="p-4 hover:bg-primary_p w-auto rounded-xl flex flex-col gap-2"
											>
												<h2 className="font-semibold text-xl">{video.type}</h2>
												<div className="flex gap-4">
													<div className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl">
														<div className="bg-secondary-d w-96 h-60 rounded-xl">
															<iframe
																className="w-full h-full rounded-xl"
																src={video.url}
																title={video.title}
																allowFullScreen
															/>
														</div>
														<div>
															<p className="text-lg font-semibold">
																{video.title}
															</p>
															<p>{video.module}</p>
															<p>{video.course}</p>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
										<div>
											<img src={SavedNullImg} alt="" className="h-40 w-auto" />
										</div>
										<div className="text-white flex flex-col justify-center items-center text-xl">
											<p>Hit play now!</p>
											<p>
												Watch, save, and come back anytime to master your money
												moves!
											</p>
										</div>
										<div>
											<button className="rounded-lg h-10 w-32 bg-secondary-lt text-text-d">
												Get Started
											</button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoggedProfilePage;
