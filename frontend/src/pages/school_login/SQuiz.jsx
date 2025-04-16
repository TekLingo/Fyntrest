import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";
import GradeDropdownMenu from "../../components/GradeDropMenu";
import MCQComponent from "../../components/MCQComponent";
import { useNavigate } from "react-router-dom";

const TQuiz = () => {
  const navigate = useNavigate();
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

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="w-full flex flex-col h-screen">
        <AdminNavbar />
        {/* <Content /> */}
        <div className="flex-grow flex h-full bg-primary-fp p-2 text-text-g overflow-auto">
          <div className="bg-primary_p w-full h-full rounded-xl p-4 flex flex-col gap-8 overflow-auto">
            <div className="flex gap-10 items-center">
              <h1 className="text-3xl">TQuiz</h1>
              <div className="flex justify-between w-full items-center">
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
                    <AiOutlineEllipsis size={30} />
                  </button>
                  {isOpen && <GradeDropdownMenu />}
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl">Questions</h2>
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

export default TQuiz;
