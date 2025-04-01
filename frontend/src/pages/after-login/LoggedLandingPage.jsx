import React, { useEffect, useState } from 'react';
import FactImage from '../../assets/Images/landing page/after-login/fact15.png';
import WordImage from '../../assets/Images/landing page/after-login/word15.png';
import ContinueCard from '../../components/Cards/ContinueCard';
import Journey from '../../components/Cards/Journey';
import PracticeTest from '../../components/Cards/PracticeTest';
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import TryOutSection from '../../components/TryOutSection';
import axiosInstance from '../../utils/axiosInstance';

const DEFAULT_FACT_IMAGE = FactImage;
const DEFAULT_WORD_IMAGE = WordImage;

const LoggedLandingPage = () => {
	const [fact, setFact] = useState('');
	const [word, setWord] = useState('');
	const [wordDescription, setWordDescription] = useState('');
	const [loading, setLoading] = useState(true); // Add loading state

	useEffect(() => {
		const fetchDailyContent = async () => {
			try {
				const response = await axiosInstance.get('/daily-content', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				const data = response.data;
				if (data.success) {
					setFact(data.fact.fact || 'No fact available');
					setWord(data.word.word || 'No word available');
					setWordDescription(
						data.word.description || 'No description available'
					);
				} else {
					setError('Failed to fetch daily content');
				}
			} catch (error) {
				console.error('Error fetching daily content:', error);
				setError('Failed to load daily content. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchDailyContent();
	}, []);

	if (loading) {
		return <div>Loading...</div>; // Show loading indicator while fetching
	}

	return (
		<div>
			<Navbar2 />
			<div className="mx-[4%] gap-16 flex flex-col">
				{/* Welcome Section */}
				<ContinueCard />
				{/* Daily Section */}
				<div className="flex flex-col text-text-g h-auto justify-center gap-16">
					<div className="bg-primary-fp h-64 w-3/5 shadow-custom2 rounded-2xl flex col-span-2 items-center justify-around p-4">
						<div>
							<img
								src={DEFAULT_FACT_IMAGE}
								alt="Fact of the Day"
								className="w-auto h-52"
							/>
						</div>
						<div className="w-2/3 flex flex-col gap-4">
							<div className="font-title text-3xl">
								<h1>Fact of the Day</h1>
							</div>
							<div>
								<p>{fact}</p>
							</div>
						</div>
					</div>
					<div className="bg-primary-fp h-64 w-3/5 shadow-custom rounded-2xl flex col-span-2 items-center justify-around place-self-end p-4">
						<div className="w-2/3 flex flex-col gap-4 justify-start">
							<div className="font-title text-3xl">
								<h1>Today's Word</h1>
							</div>
							<div>
								<h4 className="font-body font-bold text-xl">{word}</h4>
							</div>
							<div>
								<p>{wordDescription}</p>
							</div>
						</div>
						<div>
							<img
								src={DEFAULT_WORD_IMAGE}
								alt="Today's Word"
								className="w-auto h-52"
							/>
						</div>
					</div>
				</div>
				{/* Journey Section */}
				<Journey />
				{/* Practice Test Section */}
				<PracticeTest />
				{/* Try Out Section */}
				<TryOutSection />
			</div>
			<Footer />
		</div>
	);
};

export default LoggedLandingPage;
