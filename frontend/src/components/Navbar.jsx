import React, { useState } from "react";
import logo from "../assets/Images/Color Logo.png";
import Hamburger from "./Hamburger";
import { IoIosClose, IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      {/* <Hamburger /> */}
      <div className="bg-transparent flex justify-between p-6 px-16 items-center">
        <div onClick={handleNav} className="flex items-center">
          {nav ? (
            <div>
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
        <img src={logo} className="w-28 h-auto" alt="/" />
        <button type="button" className="bg-text-g w-28 rounded-full h-8">
          Get Started
        </button>
      </div>
    </>
  );
};

export default Navbar;
