import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose, IoIosMenu } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import NavbarImg from '../assets/Images/after-signIn-navbar.png';
import logo from '../assets/Images/color-logo.png';
import CoinImg from '../assets/Images/landing page/after-login/coin.png';
import ProfileImg from '../assets/Images/landing page/after-login/profile.png';
import StreakImg from '../assets/Images/landing page/after-login/streak.png';
import axiosInstance from '../utils/axiosInstance';
import Hamburger from './Hamburger';

const Navbar2 = () => {
	const [nav, setNav] = useState(false);
	const navRef = useRef(null);
	const [userData, setUserData] = useState(null);

	const navigate = useNavigate();

	const handleNav = () => {
		setNav(!nav);
	};

	// Close menu on outside click
	const handleClickOutside = (event) => {
		if (navRef.current && !navRef.current.contains(event.target)) {
			setNav(false);
		}
	};

	// Close menu on scroll
	const handleScroll = () => {
		if (nav) {
			setNav(false);
		}
	};

	const handleClick = () => {
		navigate('/logged/profile-detail');
	};

	useEffect(() => {
		if (nav) {
			document.addEventListener('mousedown', handleClickOutside);
			window.addEventListener('scroll', handleScroll);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [nav]);

	// Fetch user data from backend
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axiosInstance.get('/get-user');
				setUserData(response.data.user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<div>
			<div className="relative text-text-g h-72">
				{/* Background Image */}
				{!nav && (
					<img
						src={NavbarImg}
						alt="navbar"
						className="absolute top-0 left-0 w-full h-56 object-cover z-0"
					/>
				)}

				{/* Overlay Content */}
				<div className="relative z-10 flex justify-between p-6 px-16 items-center bg-transparent text-lg">
					{/* Hamburger Menu */}
					<div className="flex items-center min-w-36">
						{nav ? (
							<div className="menu-container open-effect">
								<Hamburger className="z-0" />
								<IoIosClose
									size={40}
									color="#d4cfdb"
									className="hover:cursor-pointer absolute top-12 z-10"
									onClick={handleNav}
								/>
							</div>
						) : (
							<IoIosMenu
								size={40}
								color="#d4cfdb"
								className="hover:cursor-pointer"
								onClick={handleNav}
							/>
						)}
					</div>

					{/* Logo */}
					<div className="select-none min-w-32 justify-center flex">
						<img src={logo} className="w-28 h-auto" alt="/" />
					</div>

					{/* Personal Section */}
					<div className="flex justify-between min-w-32 flex-row gap-8">
						{userData ? (
							<>
								<div className="flex items-center justify-center gap-2">
									<img src={CoinImg} alt="Coins" />
									<p>{userData.coins || 0}</p>
								</div>
								<div className="flex items-center justify-center gap-2">
									<img src={StreakImg} alt="Streak" />
									<p>{userData.streaks || 0}</p>
								</div>
								<div>
									<img
										src={userData.profileImage || ProfileImg}
										alt="Profile"
										className="w-10 h-10 rounded-full object-cover cursor-pointer"
										onClick={handleClick}
									/>
								</div>
							</>
						) : (
							<p>Loading...</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar2;
