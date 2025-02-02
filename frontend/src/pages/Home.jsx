import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import Course from '../assets/Images/landing page/features/courses.png';
import Curriculam from '../assets/Images/landing page/features/curriculam.png';
import Learn from '../assets/Images/landing page/features/personalised.png';
import Tracking from '../assets/Images/landing page/features/tracking.png';
import Right from '../assets/Images/landing page/right.png';
import Game from '../assets/Images/landing page/try out/game.png';
import Knowledge from '../assets/Images/landing page/try out/knowledge.png';
import Quiz from '../assets/Images/landing page/try out/quiz.png';
import FeatureCard from '../components/Cards/FeatureCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CourseCarousel from './CourseCarousel';

const Home = () => {
	const isLoggedIn = localStorage.getItem('isLoggedIn');
	return (
		<div className="w-full">
			{/* Hero */}
			<div className="w-full h-screen bg-cover bg-no-repeat flex flex-col bg-Hero">
				<Navbar />
				<div className="w-full mx-auto text-center flex flex-col mt-40 text-text-g gap-10">
					<h1 className="font-title text-6xl uppercase">fyntrest</h1>
					<h6 className="text-4xl">Financial Education Made Easy</h6>
					<button className="flex gap-4 mx-auto justify-center items-center text-black bg-secondary-d rounded-lg w-52 h-14 hover:scale-105 duration-300">
						Play to discover
						<FaChevronRight />
					</button>
				</div>
			</div>

			{/* Courses */}
			<div className="w-full flex flex-col gap-10 text-text-g">
				<h1 className="font-body text-6xl text-center font-bold mt-24">
					Courses
				</h1>
				<CourseCarousel isLoggedIn={isLoggedIn} />
			</div>

			{/* Features */}
			<div className="w-full flex flex-col gap-10 text-text-g">
				<h1 className="font-body text-6xl text-center font-bold mt-24">
					Features
				</h1>
				<FeatureCard
					title="Personalised Learning"
					desc="Gamified, interactive courses tailored to each child's pace and
								style, featuring quizzes, challenges, and real-world financial
								scenarios to build money management skills."
					img={Learn}
					inverted={false}
				/>
				<FeatureCard
					title="Courses Vetted By Educators"
					desc="Ensure high-quality content aligned with educational standards.
								Our courses are verified by industry experts eg. CAs, CFAs,
								Educators."
					img={Course}
					inverted={true}
				/>
				<FeatureCard
					title="Progress Tracking"
					desc="Real-time updates, reports, and parental controls to monitor
								achievements, set goals, and ensure a safe learning experience."
					img={Tracking}
					inverted={false}
				/>
				<FeatureCard
					title="Curriculam Integration"
					desc="Aligned with the CBSE curriculum for 8th grade and above,
								offering practical lessons on saving, budgeting, and money
								management."
					img={Curriculam}
					inverted={true}
				/>
			</div>

			{/* Tryout Section */}
			<div className="w-full text-text-g py-20">
				{/* Section Title */}
				<h1 className="font-body text-6xl text-center font-bold mb-20">
					TryOut
				</h1>

				{/* Grid Layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 w-4/5 mx-auto items-stretch">
					{/* Left Column */}
					<div className="flex flex-col justify-between gap-8">
						{/* Knowledge Button */}
						<button className="flex items-center justify-between bg-gradient-to-r from-secondary-lt to-secondary-dt rounded-2xl p-6 shadow-lg h-48 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-l">
							<p className="text-text-d font-normal text-2xl font-body w-40 text-start">
								Test your knowledge
							</p>
							<img
								src={Knowledge}
								className="w-60 h-auto"
								alt="Knowledge Icon"
							/>
							<img src={Right} className="w-8 h-auto" alt="right arrow" />
						</button>

						{/* Quiz Button */}
						<button className="flex items-center justify-between rounded-2xl p-6 shadow-lg h-48 bg-gradient-to-r from-secondary-lt to-secondary-dt hover:scale-105 duration-300 hover:bg-gradient-to-l">
							<img src={Quiz} className="w-60 h-auto" alt="Quiz Icon" />
							<p className="text-text-d font-normal text-2xl font-body">
								Quick Quizzes
							</p>
							<img src={Right} className="w-8 h-auto" alt="right arrow" />
						</button>
					</div>

					{/* Right Column */}
					<div>
						<button className="flex flex-col items-center justify-center bg-gradient-to-r from-secondary-lt to-secondary-dt w-full h-full rounded-2xl p-6 shadow-lg relative hover:scale-105 duration-300 hover:bg-gradient-to-l">
							<div>
								<img
									src={Game}
									className="w-80 h-auto flex flex-col items-center justify-center mb-8 relative top-5 left-12"
									alt="Game Icon"
								/>
							</div>
							<div className="w-11/12 flex justify-between items-center absolute bottom-10">
								<p className="text-text-d font-normal text-2xl font-body">
									Learn through Games
								</p>
								<img src={Right} className="w-8 h-auto" alt="right arrow" />
							</div>
						</button>
					</div>
				</div>
			</div>
			{/* Footer Section */}
			<Footer />
		</div>
	);
};

export default Home;
