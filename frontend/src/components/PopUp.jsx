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

  return (
    <div className="fixed top-0 left-0 w-full bg-primary-b bg-opacity-80 flex justify-center items-center flex-col gap-20">
      <div className="w-4/5 popup-container bg-primary-b p-6 rounded-lg shadow-lg relative text-text-g flex flex-col gap-8 h-screen overflow-y-auto">
        <div></div>
        {/* tittle section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Add Course</h1>
          <IoIosClose size={40} onClick={onClose} className="cursor-pointer" />
        </div>
        {/* body section */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-10">
            <div className="w-1/3">
              <label htmlFor="" className="text-base">
                Course Name
              </label>
              <input
                type="text"
                placeholder="Course Name"
                className="p-2 rounded-lg w-full bg-primary-fp outline-none"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="w-1/5">
              <label htmlFor="" className="text-base">
                Grade
              </label>
              <select
                className="p-2 bg-primary-fp outline-none rounded-lg w-full"
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
                className="p-2 bg-primary-fp outline-none rounded-lg w-full"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-base">
              Description
            </label>
            <textarea
              placeholder="Description"
              className="p-2 bg-primary-fp outline-none rounded-lg w-full"
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
        <div>
          <MCQComponent />
        </div>
        
        <div className="min-h-20"></div>
      </div>
    </div>
  );
};

export default Popup;
