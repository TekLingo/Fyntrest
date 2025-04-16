import React, { useState, useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { AiOutlineEllipsis } from "react-icons/ai";
import TeacherSidebar from "../../components/TeacherSidebar";
import TeacherNavbar from "../../components/TeacherNavbar";
import CourseDropdownMenu from "../../components/CourseDropMenu";
import Popup from "../../components/PopUp";
import MCQComponent from "../../components/MCQComponent";
import { useNavigate } from "react-router-dom";

const TReadyQuizPage = () => {
  const navigate = useNavigate();
  const [activeGrade, setActiveGrade] = useState("8th"); // Default to 8th grade

  const handleGradeClick = (grade) => {
    setActiveGrade(grade);
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [""],
      hasOther: false,
      otherValue: "",
      selectedOption: null,
      type: "Multiple Choice",
    },
  ]);
  const [error, setError] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [isValid, setIsValid] = useState(false); // To track form validity

  // Update questions in Popup state
  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  };

  // Validate questions before proceeding
  const validateQuestions = () => {
    // Validate each question
    for (let q of questions) {
      if (
        !q.question.trim() ||
        (q.type !== "Short Answer" && q.options.some((opt) => !opt.trim()))
      ) {
        setIsValid(false);
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  // Handle form submission
  const handleAddModules = () => {
    if (!validateQuestions()) {
      setError("Please fill in all questions and options before proceeding.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    navigate("/teacher/content");
  };

  const moduleInfo = [
    { moduleName: "hi", amtVideo: "5" },
    { moduleName: "hi", amtVideo: "5" },
    { moduleName: "hi", amtVideo: "5" },
    { moduleName: "hi", amtVideo: "5" },
    { moduleName: "hi", amtVideo: "5" },
  ];

  const quizInfo = [
    { quizName: "hi", amtQuestions: "5" },
    { quizName: "hi", amtQuestions: "5" },
    { quizName: "hi", amtQuestions: "5" },
  ];

  const quiz = [
    { content: "hi, hello", type: "MCQ" },
    { content: "Wassup", type: "MCQ" },
  ];

  const [popupOpen, setPopupOpen] = useState(false);
  const togglePopup = () => setPopupOpen((prev) => !prev);
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <TeacherSidebar />

      {/* Main Content */}
      <div className="w-full flex flex-col h-screen">
        <TeacherNavbar />
        {/* <Content /> */}
        <div className="flex-grow flex h-full bg-primary-fp p-4 text-text-g overflow-auto">
          <div className="w-full h-full flex flex-col bg-primary_p rounded-lg p-4 font-body font-normal gap-5 overflow-auto">
            {/* title section */}
            <div className="flex justify-between items-center text-2xl gap-10">
              <h1>Quiz</h1>
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
            {/* details section */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="col-span-4">
                <label htmlFor="">Quiz Title</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md bg-[#322054] text-white border border-transparent focus:border-purple-400 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-300 text-sm mb-1">
                  Course Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter course name"
                  className="w-full p-2 rounded-md bg-[#322054] text-white border border-transparent focus:border-purple-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Grade
                </label>
                <select className="w-full p-2 rounded-md bg-[#322054] text-white border border-transparent focus:border-purple-400 focus:outline-none">
                  <option>8th</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Semester
                </label>
                <select className="w-full p-2 rounded-md bg-[#322054] text-white border border-transparent focus:border-purple-400 focus:outline-none">
                  <option>1</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-300 text-sm mb-1">
                  Module Name
                </label>
                <input
                  type="text"
                  placeholder="Enter module name"
                  className="w-full p-2 rounded-md bg-[#322054] text-white border border-transparent focus:border-purple-400 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-300 text-sm mb-1">
                  Video
                </label>
                <input
                  type="text"
                  placeholder="Enter video link"
                  className="w-full p-2 rounded-md bg-[#322054] text-white border border-transparent focus:border-purple-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">Questions</h3>
              {/* Validation error message */}
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <MCQComponent
                questions={questions}
                updateQuestions={updateQuestions}
                validateQuestions={validateQuestions}
              />
              <div className="flex justify-center">
                <button
                  className="bg-secondary-d p-2 w-20 rounded"
                  onClick={handleAddModules}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TReadyQuizPage;
