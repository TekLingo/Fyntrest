import React from 'react';
import FactImg from '../../assets/Images/landing page/after-login/Fact15.png';
import WordImg from '../../assets/Images/landing page/after-login/word15.png';
import Right from '../../assets/Images/landing page/right.png';
import Game from '../../assets/Images/landing page/try out/game.png';
import Knowledge from '../../assets/Images/landing page/try out/knowledge.png';
import Quiz from '../../assets/Images/landing page/try out/quiz.png';
import ContinueCard from '../../components/Cards/ContinueCard';
import Journey from '../../components/Cards/Journey';
import PracticeTest from '../../components/Cards/PracticeTest';
import Footer from '../../components/Footer';
import Navbar2 from '../../components/Navbar2';
import TryOutSection from '../../components/TryOutSection';

const LoggedLandingPage = () => {
	return (
		<div>
			<Navbar2 />
			<div className="mx-[4%] gap-16 flex flex-col">
				{/* Welcome Section */}
				<ContinueCard />
				{/* Daily Section */}
				<div className="flex flex-col text-text-g h-auto justify-center gap-16">
					<div className="bg-primary-fp h-64 w-3/5 shadow-custom2 rounded-2xl flex col-span-2 items-center justify-around p-4">
						<div className="">
							<img src={FactImg} alt="" className="w-auto h-52" />
						</div>
						<div className="w-2/3 flex flex-col gap-4">
							<div className="font-title text-3xl">
								<h1>Fact of the Day</h1>
							</div>
							<div>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Cupiditate blanditiis impedit vel dolore similique repudiandae
									illum saepe ad excepturi quaerat, quidem alias ex incidunt eum
									dignissimos, aliquam voluptate a nulla. Lorem ipsum, dolor sit
									amet consectetur adipisicing elit. Excepturi obcaecati maxime
									quasi voluptatibus tenetur dolorem saepe pariatur.
								</p>
							</div>
						</div>
					</div>
					<div className="bg-primary-fp h-64 w-3/5 shadow-custom rounded-2xl flex col-span-2 items-center justify-around place-self-end p-4">
						<div className="w-2/3 flex flex-col gap-4 justify-start">
							<div className="font-title text-3xl">
								<h1>Today's Word</h1>
							</div>
							<div>
								<h4 className="font-body font-bold text-xl">Savings</h4>
							</div>
							<div>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Cupiditate blanditiis impedit vel dolore similique repudiandae
									illum saepe ad excepturi quaerat, quidem alias ex incidunt eum
									dignissimos, aliquam voluptate a nulla. Lorem ipsum, dolor sit
									amet consectetur adipisicing elit. Excepturi obcaecati maxime
									quasi voluptatibus tenetur dolorem saepe pariatur.
								</p>
							</div>
						</div>
						<div className="">
							<img src={WordImg} alt="" className="w-auto h-52" />
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
