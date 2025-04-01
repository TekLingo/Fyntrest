import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hamburger = () => {
	const navigate = useNavigate();
	const isAuthenticated = !!localStorage.getItem('token');

	const handleNavigation = (path) => {
		if (isAuthenticated) {
			// Adjust paths for logged-in users
			if (path === '/semster') navigate('/logged/semester');
			else if (path === '/blogs') navigate('/blog');
			else navigate(path);
		} else {
			// Default paths for logged-out users
			navigate(path);
		}
	};

	return (
		<div className="absolute -top-24 left-0 w-full h-96 bg-Menu bg-no-repeat bg-cover flex justify-center items-center transition-transform transform ease-in-out duration-500 select-none">
			{/* Menu Items */}
			<ul className="text-white text-xl flex gap-40 font-body">
				<li
					className="py-4 hover:underline cursor-pointer"
					onClick={() => handleNavigation('/')}
				>
					Home
				</li>
				<li
					className="py-4 hover:underline cursor-pointer"
					onClick={() => handleNavigation('/semster')}
				>
					Courses
				</li>
				<li
					className="py-4 hover:underline cursor-pointer"
					onClick={() => handleNavigation('/blogs')}
				>
					Blogs
				</li>
				<li
					className="py-4 hover:underline cursor-pointer"
					onClick={() => handleNavigation('/about')}
				>
					About
				</li>
				<li
					className="py-4 hover:underline cursor-pointer"
					onClick={() => handleNavigation('/contact')}
				>
					Contact
				</li>
			</ul>
		</div>
	);
};

export default Hamburger;
