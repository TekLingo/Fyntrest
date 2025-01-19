import React, { useState } from "react";
import logo from "../assets/Images/Color Logo.png";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosClose, IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-transparent flex justify-between p-6 px-16 items-center">
      <div onClick={handleNav} className="block">
        {nav ? (
          <IoIosClose
            size={40}
            color="#d4cfdb"
            className="hover:cursor-pointer"
          />
        ) : (
          <IoIosMenu
            size={40}
            color="#d4cfdb"
            className="hover:cursor-pointer"
          />
        )}
      </div>
      <img src={logo} className="w-28 h-auto" alt="/" />
      <button type="button" className="bg-text-g w-28 rounded-full h-8">
        Get Started
      </button>
    </div>
  );
};

export default Navbar;
