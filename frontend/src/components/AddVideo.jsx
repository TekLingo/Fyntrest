import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import AttachVideo from "./AttachVideo";
import MCQComponent from "./MCQComponent";
import AdminPanel from "../pages/admin/AdminMain";

const AddVideo = ({ onClose }) => {
  const [courseName, setCourseName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [grade, setGrade] = useState("8th");
  const [semester, setSemester] = useState("1");
  const [vidDescription, setVidDescription] = useState("");
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
  const [showVidPopUp, setShowVidPopUp] = useState(false);
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

  // Handle form submission
  const handleAddVideos = () => {
    if (!validateQuestions()) {
      setError("Please fill in all questions and options before proceeding.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    setShowVidPopUp(true);
  };

  // Handle form submission
  const handleBacktrack = () => {
    if (!validateQuestions()) {
      setError("Please fill in all questions and options before proceeding.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setError("");
    setShowVidPopUp(true);
  };

  const courseList = ["Course1", "Course1", "Course1"];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-bg-color bg-opacity-60 flex justify-center items-center flex-col gap-20 z-50">
      <div className="w-4/5 popup-container bg-bg-color p-6 rounded-lg shadow-lg relative text-text-g flex flex-col gap-8 h-auto overflow-y-auto">
        {/* Title Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Add Videos</h1>
          <IoIosClose size={40} onClick={onClose} className="cursor-pointer" />
        </div>
        {/* Body Section */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-10">
            <div className="w-1/3">
              <label htmlFor="" className="text-base">
                Module Name
              </label>
              <input
                type="text"
                placeholder="Module Name"
                className="p-2 rounded-lg w-full bg-primary-fp outline-none text-xl"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label htmlFor="" className="text-base">
                Grade
              </label>
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
              <label htmlFor="" className="text-base">
                Semester
              </label>
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
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 w-2/3">
              <label htmlFor="" className="text-base">
                Course Name
              </label>
              <select
                className="p-2 bg-primary-fp outline-none rounded-lg w-full text-xl"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              >
                {courseList.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base">
                Insert Video
              </label>
              <AttachVideo />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base">
                Video Description
              </label>
              <textarea
                placeholder="Description"
                className="p-2 bg-primary-fp outline-none rounded-lg w-full text-xl"
                rows="3"
                value={vidDescription}
                onChange={(e) => setVidDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-base">
              Video Questions
            </label>
            <MCQComponent
              questions={questions}
              updateQuestions={updateQuestions}
              validateQuestions={validateQuestions}
            />
          </div>
          <div className="flex justify-center items-center gap-5">
            <button
              className="bg-primary-fp text-text-g text-base p-4 rounded-lg"
              onClick={handleAddVideos}
            >
              Add Video
            </button>
            {showVidPopUp && <AddVideo onClose={() => setShowPopUp(false)} />}
            <button
              className="bg-secondary-d text-text-g text-base p-4 rounded-lg"
              onClick={handleBacktrack}
            >
              Done
            </button>
            {showVidPopUp && <AdminPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
