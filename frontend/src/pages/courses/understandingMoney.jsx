import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { GoHome } from 'react-icons/go';
import { MdKeyboardArrowRight } from 'react-icons/md';
import basicImg from '../../assets/Images/landing page/course/basicsOfFinLiteracy.png';
import white_logo from '../../assets/Images/landing page/white_logo.png';
import Breadcrumb from '../../components/Breadcrumb';
import UnlockCard from '../../components/Cards/UnlockCard';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const Money = () => {
	const courseContents = ['Understanding Needs and Wants', 'Spending Choices'];

	return (
		<div className="">
			<Navbar />
			<div className="mx-28 text-text-g">
				{/* Breadcrumb Navigation */}
				<Breadcrumb
					items={['Home', 'Course', 'Basics of Financial Literacy']}
				/>

				{/* Heading Section */}
				<div className="w-full my-10">
					<div className="flex col-span-2 gap-32 items-center justify-around">
						<div className="">
							<div className="text-7xl font-bold font-title leading-snug tracking-wide py-8">
								<h1>Basics of Financial Literacy</h1>
							</div>
							<div>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Totam, nesciunt architecto recusandae nemo mollitia quasi a
									modi ipsum dolor molestias quas eos quidem reprehenderit,
									porro tenetur harum doloremque consectetur beatae.
								</p>
							</div>
							<div className="py-4">
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Totam, nesciunt architecto recusandae nemo mollitia quasi a
									modi ipsum dolor molestias quas eos quidem reprehenderit,
									porro tenetur harum doloremque consectetur beatae.
								</p>
							</div>
						</div>
						<div className="">
							<img src={basicImg} alt="Basics of Financial Literacy" />
						</div>
					</div>
				</div>
				{/* Course content */}
				<div className="py-4">
					<div className="mb-12">
						<h2 className="text-4xl font-body font-bold">Glimpse of Course</h2>
					</div>
					<div className="flex flex-col gap-6 py-6">
						{courseContents.map((content, index) => (
							<div
								key={index}
								className="flex justify-between w-full bg-primary_p h-20 rounded-2xl items-center font-body text-xl px-8 cursor-pointer"
							>
								<h1>{content}</h1>
								<MdKeyboardArrowRight className="text-3xl" />
							</div>
						))}
					</div>

					<div className="relative flex flex-col gap-24 items-center justify-center -mt-24 z-9999 py-64 bg-money-gradient backdrop-blur-0">
						<div className="flex flex-col gap-4 text-center">
							<h1 className="text-4xl md:text-6xl font-bold font-body leading-tight tracking-wide">
								Unlock the secrets of money — log in now to start your journey
								to financial freedom!
							</h1>
							<p className="text-xl font-body tracking-wide">
								Ready for the next level? Upgrade your membership to unlock this
								module and more expert insights!
							</p>
						</div>
						<div className="flex flex-col gap-6">
							<li className="flex gap-4 items-center">
								<img src={white_logo} alt="Logo" className="w-6" />
								<h3>
									Track your progress and pick up right where you left off.
								</h3>
							</li>
							<li className="flex gap-4 items-center">
								<img src={white_logo} alt="Logo" className="w-6" />
								<h3>
									Gain access to expert insights and in-depth financial literacy
									lessons.
								</h3>
							</li>
							<li className="flex gap-4 items-center">
								<img src={white_logo} alt="Logo" className="w-6" />
								<h3>
									Engage with quizzes and games designed to enhance your
									understanding.
								</h3>
							</li>
						</div>
						<div className="px-10 py-3 w-fit rounded-lg flex text-black bg-secondary-l shadow-lg">
							<button type="button" className="tracking-widest">
								Login to Upgrade
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Money;
