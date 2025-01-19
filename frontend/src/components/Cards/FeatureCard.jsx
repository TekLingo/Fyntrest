import React from 'react';

const FeatureCard = ({ title, desc, img }) => {
	return (
		<div className="w-4/5 flex justify-around items-center mx-auto mt-12">
			<div className="w-7/12">
				<div className="text-4xl font-bold font-tittle">
					<h2>{title}</h2>
				</div>
				<div className="text-lg mt-8">
					<p>{desc}</p>
				</div>
			</div>
			<div className="">
				<img src={img} className="w-96 h-auto" alt="" />
			</div>
		</div>
	);
};

export default FeatureCard;
