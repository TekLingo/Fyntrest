import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Images/Color Logo.png";
import Hamburger from "./Hamburger";
import { IoIosClose, IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navRef = useRef(null);

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

  useEffect(() => {
    if (nav) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nav]);

  return (
    <>
		<div className="bg-transparent flex justify-between p-6 px-16 items-center">
			{/* Hamburger Menu */}
			<div onClick={handleNav} ref={navRef} className="flex items-center">
			{nav ? (
				<div className="menu-container open-effect">
				<Hamburger className="z-0" />
				<IoIosClose
					size={40}
					color="#d4cfdb"
					className="hover:cursor-pointer absolute top-12 z-10"
				/>
				</div>
			) : (
				<IoIosMenu
				size={40}
				color="#d4cfdb"
				className="hover:cursor-pointer absolute"
				/>
			)}
			</div>

			{/* Logo */}
			<div className="select-none">
			<img src={logo} className="w-28 h-auto " alt="/" />
			</div>

			{/* Button */}
			<button
			type="button"
			className="bg-text-g w-28 rounded-full h-8 select-none"
			>
			Get Started
			</button>
		</div>
    </>
  );
};

export default Navbar;
