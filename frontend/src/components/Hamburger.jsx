import React from 'react';

const Hamburger = () => {
	return (
		<div className="absolute -top-24 left-0 w-full h-96 bg-Menu bg-no-repeat bg-cover z-10 flex justify-center items-center transition-transform transform ease-in-out duration-500">
			{/* Menu Items */}
			<ul className="text-white text-xl flex gap-40">
				<li className="py-4 hover:underline cursor-pointer">Home</li>
				<li className="py-4 hover:underline cursor-pointer">Courses</li>
				<li className="py-4 hover:underline cursor-pointer">Blogs</li>
				<li className="py-4 hover:underline cursor-pointer">About</li>
				<li className="py-4 hover:underline cursor-pointer">Contact</li>
			</ul>
		</div>
	);
};

export default Hamburger;
