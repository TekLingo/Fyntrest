import React, { useState } from 'react';
import { MdKeyboardArrowRight, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Glimpse = ({ content, description, topics }) => {
	const [nav, setNav] = useState(false);

	const handleNav = () => setNav((prev) => !prev);

	const navigate = useNavigate();

	const handelClick = () => {
		navigate('/module');
	};

	return (
		<div
			className={`transition-all duration-300 ease-in-out ${
				nav ? 'h-auto items-start' : 'h-20 items-center overflow-hidden'
			} flex flex-col w-full bg-primary_p rounded-2xl font-body text-xl cursor-pointer`}
			onClick={(handleNav, handelClick)}
		>
			<div className="p-6 w-full flex justify-between items-center">
				<h1>{content}</h1>
				<MdKeyboardArrowRight
					className={`text-3xl transition-transform duration-300 ${
						nav ? 'rotate-90' : 'rotate-0'
					}`}
				/>
			</div>
			{nav && (
				<div className="p-6 text-white font-thin">
					<p className="pb-6 text-lg">{description}</p>
					<div className="flex flex-wrap gap-6 py-6">
						{topics.map((topic, index) => (
							<div key={index} className="w-56">
								{/* Locked video container */}
								<div className="relative rounded-lg h-32 overflow-hidden">
									<div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center text-white">
										<MdLock className="text-3xl" />
									</div>
									<iframez
										className="w-full h-full"
										src={topic.videoSrc}
										title={topic.title}
									/>
								</div>
								<p className="text-base mt-2">{topic.title}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Glimpse;
