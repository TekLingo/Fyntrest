import React, { useState } from "react";
import Menu from "../assets/Images/Navbar.svg"

const Hamburger = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-80">
      <div className="relative">
        {/* <svg
          className="absolute w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#362856"
            d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,133.3C672,128,768,160,864,181.3C960,203,1056,213,1152,186.7C1248,160,1344,96,1392,64L1440,32L1440,0L0,0Z"
          ></path>
        </svg> */}
        <div className="bg-Menu h-screen w-full bg-no-repeat bg-contain"></div>
      </div>
    </div>
  );
};

export default Hamburger;
