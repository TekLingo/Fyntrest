import React, { useState, useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { AiOutlineEllipsis } from "react-icons/ai";
import Breadcrumb from "../../components/Breadcrumb";
import GradeDropdownMenu from "../../components/GradeDropMenu";
import FactDropdownMenu from "../../components/FactDropMenu";
import WordDropdownMenu from "../../components/WordDropMenu";
import MCQComponent from "../../components/MCQComponent";
import Popup from "../../components/PopUp";

const Content = () => {
  const [activeGrade, setActiveGrade] = useState("8th"); // Default to 8th grade

  const handleGradeClick = (grade) => {
    setActiveGrade(grade);
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isWordOpen, setWordIsOpen] = useState(false);
  const menuWordRef = useRef(null);

  const toggleWordMenu = () => {
    setWordIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setWordIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isFactOpen, setFactIsOpen] = useState(false);
  const menuFactRef = useRef(null);

  const toggleFactMenu = () => {
    setFactIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setFactIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const eightCourse = [
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
  ];
  const nineCourse = [
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
  ];
  const tenCourse = [
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
    { courseName: "course-1", coursePreview: "ABC School" },
  ];

  const [popupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);

  return (
    <div className="flex text-text-g h-screen bg-[#362856] p-4 flex-col gap-8 overflow-auto">
      {/* Grade card */}
      <div className="w-full h-min flex flex-col bg-primary_p rounded-lg p-4 font-body font-normal text-2xl">
        {/* Heading section */}
        <div className="flex w-full h-10 items-center gap-8">
          <h2>Grade</h2>
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
        <div className="flex-grow flex h-full">
          {activeGrade === "8th" && (
            <div className="py-4 w-full flex gap-10 flex-wrap ">
              {/* Course Cards */}
              {eightCourse.map((item, index) => (
                <div key={index} className="">
                  <div>
                    {/* Course Preview */}
                    <div className="bg-primary-fp w-72 h-48 rounded-md"></div>
                  </div>
                  {item.courseName}
                </div>
              ))}
              {/* Course Plus button */}
              <div
                className="rounded-full w-14 h-14 place-self-center bg-secondary-d flex items-center justify-center cursor-pointer"
                onClick={togglePopup}
              >
                <GoPlus size={40} />
              </div>
              <Popup isOpen={popupOpen} onClose={togglePopup} />
            </div>
          )}
          {activeGrade === "9th" && (
            <div className="py-4 w-full flex gap-10 flex-wrap">
              {/* Course Cards */}
              {nineCourse.map((item, index) => (
                <div key={index} className="">
                  <div>
                    {/* Course Preview */}
                    <div className="bg-primary-fp w-72 h-48 rounded-md"></div>
                  </div>
                  {item.courseName}
                </div>
              ))}
              {/* Course Plus button */}
              <div className="rounded-full w-14 h-14 place-self-center bg-secondary-d flex items-center justify-center cursor-pointer">
                <GoPlus size={40} />
              </div>
              <Popup isOpen={popupOpen} onClose={togglePopup} />
            </div>
          )}
          {activeGrade === "10th" && (
            <div className="py-4 w-full flex gap-10 flex-wrap">
              {/* Course Cards */}
              {tenCourse.map((item, index) => (
                <div key={index} className="">
                  <div>
                    {/* Course Preview */}
                    <div className="bg-primary-fp w-72 h-48 rounded-md"></div>
                  </div>
                  {item.courseName}
                </div>
              ))}
              {/* Course Plus button */}
              <div className="rounded-full w-14 h-14 place-self-center bg-secondary-d flex items-center justify-center cursor-pointer">
                <GoPlus size={40} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-min flex bg-primary_p rounded-lg p-4 font-body font-normal text-2xl justify-between items-center">
        <h3>Quiz Questions</h3>
        <div className="bg-secondary-d w-16 py-1 rounded-full flex justify-center cursor-pointer">
          <FaArrowRight />
        </div>
      </div>
      <div className="w-full h-min flex flex-col gap-5 bg-primary_p rounded-lg p-4 font-body font-normal text-2xl">
        <div className="flex gap-10">
          <h3 className="w-72">Fact of the Week</h3>
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
            <div ref={menuFactRef}>
              <button onClick={toggleFactMenu} className="p-2">
                <AiOutlineEllipsis />
              </button>
              {isFactOpen && <FactDropdownMenu />}
            </div>
          </div>
        </div>
        <textarea
          name=""
          id=""
          className="h-20 w-full bg-[#362856] rounded-xl text-text-g text-left text-base p-4 resize-none"
        ></textarea>
        <p className="text-base text-text-g">Updated 5 days ago, 12pm</p>
      </div>
      <div className="w-full h-min flex flex-col gap-5 bg-primary_p rounded-lg p-4 font-body font-normal text-2xl">
        <div className="flex gap-10">
          <h3 className="w-72">Word of the Day</h3>
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
            <div ref={menuWordRef}>
              <button onClick={toggleWordMenu} className="p-2">
                <AiOutlineEllipsis />
              </button>
              {isWordOpen && <WordDropdownMenu />}
            </div>
          </div>
        </div>
        <textarea
          name=""
          id=""
          className="h-20 w-full bg-[#362856] rounded-xl text-text-g text-left text-base p-4 resize-none"
        ></textarea>
        <p className="text-base text-text-g">Updated 5 days ago, 12pm</p>
      </div>
    </div>
  );
};

export default Content;
