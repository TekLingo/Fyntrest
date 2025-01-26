import React, { useState, useEffect, useRef } from "react";
import NavbarImg from "../assets/Images/after-signIn-navbar.png";
import logo from "../assets/Images/Color Logo.png";
import Hamburger from "./Hamburger";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import CoinImg from "../assets/Images/landing page/after-login/coin.png";
import StreakImg from "../assets/Images/landing page/after-login/streak.png";
import ProfileImg from "../assets/Images/landing page/after-login/profile.png";

const Navbar2 = () => {
  const userData = [200, 5, ProfileImg];

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
    <div>
      <div className="relative text-text-g">
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
                  onClick={handleNav} // Close the menu when clicked
                />
              </div>
            ) : (
              <IoIosMenu
                size={40}
                color="#d4cfdb"
                className="hover:cursor-pointer"
                onClick={handleNav} // Toggle the nav state
              />
            )}
          </div>

          {/* Logo */}
          <div className="select-none min-w-32 justify-center flex">
            <img src={logo} className="w-28 h-auto" alt="/" />
          </div>

          {/* personal section */}
          <div className="flex justify-between min-w-32 flex-row gap-8">
            <div className="flex items-center justify-center gap-2">
              <img src={CoinImg} alt="" />
              <p>{userData[0]}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <img src={StreakImg} alt="" />
              <p>{userData[1]}</p>
            </div>
            <div>
              <img src={userData[2]} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
