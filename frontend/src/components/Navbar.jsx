import React, { useState } from 'react';
import { IoIosClose, IoIosMenu } from 'react-icons/io';
import logo from '../assets/Images/Color Logo.png';
import Hamburger from './Hamburger';

const Navbar = () => {
	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<div className="bg-transparent flex justify-between items-center py-10 px-16 relative z-50">
			{/* Hamburger Button */}
			<div
				onClick={handleNav}
				className={`cursor-pointer ${nav ? 'text-white' : 'text-gray-400'}`}
			>
				{nav ? (
					<IoIosClose size={40} className="z-99" />
				) : (
					<IoIosMenu size={40} className="z-99" />
				)}
			</div>

			{/* Logo */}
			<img
				src={logo}
				className="w-28 h-auto absolute left-1/2 transform -translate-x-1/2"
				alt="Logo"
			/>

			{/* Get Started Button */}
			<button
				type="button"
				className="bg-text-g w-28 rounded-full h-8 hidden md:block"
			>
				Get Started
			</button>

			{/* Slide-In Hamburger Menu */}
			{nav && <Hamburger />}
		</div>
	);
};

export default Navbar;
