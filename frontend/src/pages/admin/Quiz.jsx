import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import Content from "./Content";
import GradeDropdownMenu from "../../components/GradeDropMenu";

const Quiz = () => {
  //   const [activeSection, setActiveSection] = useState("content");
  const [activeGrade, setActiveGrade] = useState("8th");
  const handleGradeClick = (grade) => {
    setActiveGrade(grade);
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="w-full flex flex-col h-screen">
        <AdminNavbar />
        {/* <Content /> */}
        <div className="flex-grow flex h-full bg-primary-fp p-4 text-text-g">
          <div className="bg-primary_p w-full h-full rounded-xl p-4">
            <div className="flex gap-10">
              <h1 className="text-3xl">Quiz</h1>
              <div className="flex justify-between w-full">
                <div className="flex gap-4">
                  <button
                    className={`text-lg w-16 h-8 rounded-full ${
                      activeGrade === "8th"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handleGradeClick("8th")}
                  >
                    8th
                  </button>
                  <button
                    className={`text-lg w-16 h-8 rounded-full ${
                      activeGrade === "9th"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handleGradeClick("9th")}
                  >
                    9th
                  </button>
                  <button
                    className={`text-lg w-16 h-8 rounded-full ${
                      activeGrade === "10th"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handleGradeClick("10th")}
                  >
                    10th
                  </button>
                </div>
                <div ref={menuRef}>
                  <button onClick={toggleMenu} className="p-2">
                    <AiOutlineEllipsis />
                  </button>
                  {isOpen && <GradeDropdownMenu />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
