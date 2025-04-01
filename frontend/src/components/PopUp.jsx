import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import MCQComponent from "./MCQComponent";
import AddModulePopUp from "./AddModulePopUp";

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [courseName, setCourseName] = useState("");
  const [grade, setGrade] = useState("8th");
  const [semester, setSemester] = useState("1");
  const [description, setDescription] = useState("");
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
    setShowPopUp(true);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-bg-color bg-opacity-80 flex justify-center items-center flex-col gap-20">
      <div className="w-4/5 popup-container bg-bg-color p-6 rounded-lg shadow-lg relative text-text-g flex flex-col gap-8 h-screen overflow-y-auto">
        {/* title section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Add Course</h1>
          <IoIosClose size={40} onClick={onClose} className="cursor-pointer" />
        </div>

        {/* body section */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-10">
            <div className="w-1/3">
              <label className="text-base">Course Name</label>
              <input
                type="text"
                placeholder="Course Name"
                className="p-2 rounded-lg w-full bg-primary-fp outline-none text-xl"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label className="text-base">Grade</label>
              <select
                className="p-2 bg-primary-fp outline-none rounded-lg w-full text-xl"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>
            <div className="w-1/5">
              <label className="text-base">Semester</label>
              <select
                className="p-2 bg-primary-fp outline-none rounded-lg w-full text-xl"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-base">Description</label>
            <textarea
              placeholder="Description"
              className="p-2 bg-primary-fp outline-none rounded-lg w-full text-xl"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Question section */}
        <div>
          <h2>Course Questions</h2>
        </div>
        {/* Validation error message */}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <MCQComponent
            questions={questions}
            updateQuestions={updateQuestions}
            validateQuestions={validateQuestions} // Pass validation function
          />
        </div>

        {/* Add Module Button */}
        <div className="justify-center items-center flex">
          <button
            className="bg-primary-fp text-text-g text-base p-4 rounded-lg"
            onClick={handleAddModules}
          >
            Add Modules
          </button>
        </div>

        {/* Add Module PopUp */}
        {showPopUp && <AddModulePopUp onClose={() => setShowPopUp(false)} />}
      </div>
    </div>
  );
};

export default Popup;
