import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import CourseImg from "../../assets/Images/landing page/course/Money.png";

const SemesterCard = ({ content, topics, index }) => {
  const [nav, setNav] = useState(false);
  const variantStyles = [
    {
      bg: "bg-gradient-to-br from-yellow-700 to-orange-700",
      position: "-top-4 -right-6",
    },
    { bg: "bg-gradient-to-br from-green-400 to-blue-700", position: "-left-6" },
    {
      bg: "bg-gradient-to-br from-blue-200 to-violet-500",
      position: "-bottom-5 -left-5",
    },
    {
      bg: "bg-gradient-to-br from-purple-600 to-purple-950",
      position: "-top-2 -left-2",
    },
  ];
  const selectedStyle = variantStyles[index % variantStyles.length];

  const handleNav = () => setNav((prev) => !prev);
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        nav ? "h-auto items-start" : "h-20 items-center overflow-hidden cursor-pointer"
      } flex flex-col w-full bg-primary_p rounded-2xl font-body text-xl`}
      onClick={handleNav}
    >
      <div className="p-6 w-full flex justify-between items-center">
        <h1>{content}</h1>
        <MdKeyboardArrowRight
          className={`text-3xl transition-transform duration-300 ${
            nav ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>
      {nav && (
        <div className="p-6 text-white font-thin w-full">
          <div className="gap-6 py-6 grid grid-cols-2 w-full">
            {topics.map((topic, index) => (
              <div key={index} className="w-full">
                {/* Locked video container */}
                <div className="rounded-lg w-full h-9/10 overflow-hidden ">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-full rounded-lg flex flex-col items-center justify-center shadow-lg relative overflow-hidden bg-primary-b cursor-pointer">
                      {/* Gradient Blur Background */}
                      <span
                        className={`absolute w-36 h-36 rounded-full blur-2xl opacity-80 ${selectedStyle.bg} ${selectedStyle.position}`}
                      ></span>
                      <div className="flex flex-col items-center gap-4 z-10">
                        {/* Image */}
                        <img
                          src={CourseImg}
                          title={topic.title}
                          className="w-2/5 h-auto object-contain"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="mb-4 flex flex-col justify-start w-full gap-4">
                      <p className="text-3xl font-normal">{topic.title}</p>
                      <p className="text-lg font-normal">{topic.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterCard;
