import React, { useState } from 'react';
import logo from '../assets/Images/Color Logo.png';
import Hamburger from './Hamburger';
import { IoIosClose, IoIosMenu } from 'react-icons/io';

const Navbar = () => {
	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<>
			{/* <Hamburger /> */}
			<div className="bg-transparent flex justify-between p-6 px-16 items-center">
				<div onClick={handleNav} className="flex">
					{nav ? (
						<div>
              <Hamburger className="absolute top-0 left-0 z-0"/>
							<IoIosClose
								size={40}
								color="#d4cfdb"
								className="hover:cursor-pointer absolute z-10"
							/>
						</div>
					) : (
						<IoIosMenu
							size={40}
							color="#d4cfdb"
							className="hover:cursor-pointer z-9999"
						/>
					)}
				</div>
				<img src={logo} className="w-28 h-auto" alt="/" />
				<button type="button" className="bg-text-g w-28 rounded-full h-8">
					Get Started
				</button>
			</div>
		</>
	);
};

export default Navbar;
