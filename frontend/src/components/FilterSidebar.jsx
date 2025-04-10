import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const FilterSidebar = ({ onClose }) => {
  const [activeEntity, setActiveEntity] = useState("school");

  const handleEntityClick = (entity) => {
    setActiveEntity(entity);
  };

  const schoolName = ["SSRVM", "Podar", "KHS"];

  return (
    <div>
      <div className="fixed top-32 right-10 inset-0 z-50 flex justify-end overflow-y-auto font-body">
        <div className="w-4/12 p-4 rounded-lg shadow-lg relative text-text-g flex flex-col max-h-screen overflow-y-auto h-full bg-primary-fp">
          {/* title section */}
          <div className="flex justify-between items-center h-14 border-b-2 border-[#362856]">
            <h1 className="text-xl">Filter</h1>
            <IoIosClose
              size={30}
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>
          <div className="flex h-full items-start">
            {/* Left Side */}
            <div className="w-1/3 h-full bg-[#362856]">
              <div className="flex flex-col gap-2">
                <button
                  className={`text-lg w-full flex px-2 p-1 ${
                    activeEntity === "school"
                      ? "text-text-g bg-primary_p border-l-4 border-secondary-d"
                      : "text-text-g"
                  }`}
                  onClick={() => handleEntityClick("school")}
                >
                  School
                </button>
                <button
                  className={`text-lg w-full flex px-2 p-1 text-text-g ${
                    activeEntity === "grade"
                      ? "bg-primary_p border-l-4 border-secondary-d"
                      : ""
                  }`}
                  onClick={() => handleEntityClick("grade")}
                >
                  Grade
                </button>
                <button
                  className={`text-lg w-full flex px-2 p-1 text-text-g ${
                    activeEntity === "section"
                      ? "bg-primary_p border-l-4 border-secondary-d"
                      : ""
                  }`}
                  onClick={() => handleEntityClick("section")}
                >
                  Section
                </button>
                <button
                  className={`text-lg w-full flex px-2 p-1 text-text-g ${
                    activeEntity === "gender"
                      ? "bg-primary_p border-l-4 border-secondary-d"
                      : ""
                  }`}
                  onClick={() => handleEntityClick("gender")}
                >
                  Gender
                </button>
                <button
                  className={`text-lg w-full flex px-2 p-1 text-text-g ${
                    activeEntity === "coins"
                      ? "bg-primary_p border-l-4 border-secondary-d"
                      : ""
                  }`}
                  onClick={() => handleEntityClick("coins")}
                >
                  Coins
                </button>
                <button
                  className={`text-lg w-full flex px-2 p-1 text-text-g ${
                    activeEntity === "exp"
                      ? "bg-primary_p border-l-4 border-secondary-d"
                      : ""
                  }`}
                  onClick={() => handleEntityClick("exp")}
                >
                  Experience
                </button>
              </div>
            </div>
            {/* Right Side */}
            <div className="w-2/3 p-1 px-2">
              {activeEntity === "school" && (
                <div>
                  <h2 className="text-base">School Name</h2>
                  <div >
                    <button className="flex gap-2">
                      {schoolName.map((name, index) => (
                        <span
                          key={index}
                          className="px-4 py-1 rounded-full bg-white/20"
                        >
                          {name}
                        </span>
                      ))}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="h-12 border-t-2 border-[#362856] p-4">
            <button className="absolute bg-secondary-l px-6 py-1 right-8 text-text-d rounded-md">
              Show <span>12</span> results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
