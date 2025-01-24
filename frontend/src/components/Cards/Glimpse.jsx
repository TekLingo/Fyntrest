import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Glimpse = ({ content }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        nav ? "h-96 items-start" : "h-20 items-center overflow-hidden"
      } flex w-full bg-primary_p rounded-2xl font-body text-xl cursor-pointer`}
      onClick={handleNav}
    >
      <div className="p-4 w-full flex justify-between items-center">
        <h1>{content}</h1>
        <MdKeyboardArrowRight
          className={`text-3xl transition-transform duration-300 ${
            nav ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>
    </div>
  );
};

export default Glimpse;
