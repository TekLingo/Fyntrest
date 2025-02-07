import React from 'react';
import { useNavigate } from 'react-router-dom';
import white_logo from '../../assets/Images/landing page/white_logo.png';

const UnlockCard = ({ marginTop }) => {
	const navigate = useNavigate();

	const handleLoginClick = () => {
		navigate('/login');
	};

	return (
		<div
			className="relative flex flex-col gap-24 items-center justify-center z-50 py-64 bg-money-gradient"
			style={{ marginTop: `-${marginTop}px` }}
		>
			<div className="flex flex-col gap-4 text-center">
				<h1 className="text-3xl md:text-6xl font-bold font-body leading-tight tracking-wide">
					Unlock the secrets of money — log in now to start your journey to
					financial freedom!
				</h1>
				<p className="text-xl font-body tracking-wide">
					Ready for the next level? Upgrade your membership to unlock this
					module and more expert insights!
				</p>
			</div>
			<div className="flex flex-col gap-6">
				<li className="flex gap-4 items-center">
					<img src={white_logo} alt="Logo" className="w-6" />
					<h3>Track your progress and pick up right where you left off.</h3>
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
			<div className="px-10 py-3 w-fit rounded-lg flex text-black bg-secondary-l shadow-lg ">
				<button
					type="button"
					className="text-lg font-semibold"
					onClick={handleLoginClick}
				>
					Login to Upgrade
				</button>
			</div>
		</div>
	);
};

export default UnlockCard;
