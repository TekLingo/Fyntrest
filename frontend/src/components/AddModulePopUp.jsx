import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import MCQComponent from "./MCQComponent";
import AttachVideo from "./AttachVideo";
import FlashcardUploader from "./AddFlashcard";

const AddModulePopUp = ({ onClose }) => {
  const courseOptionList = ["Course1", "Course2", "Course3"];

  const [courseName, setCourseName] = useState("");
  const [grade, setGrade] = useState("8th");
  const [semester, setSemester] = useState("1");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed top-0 left-0 w-full bg-bg-color bg-opacity-0 flex justify-center items-center flex-col gap-20">
      <div className="w-4/5 popup-container bg-bg-color p-6 rounded-lg shadow-lg relative text-text-g flex flex-col gap-8 h-screen overflow-y-auto">
        {/* title section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Add Module</h1>
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
                className="p-2 rounded-lg w-full bg-primary-fp outline-none text-xl"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
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
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base">
                Course Name
              </label>
              <select
                name=""
                id=""
                className="w-60 p-2 bg-primary-fp outline-none rounded-lg text-xl"
              >
                {courseOptionList.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base">
                Description
              </label>
              <textarea
                placeholder="Description"
                className="p-2 bg-primary-fp outline-none rounded-lg w-full text-xl"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base">
                Insert Video
              </label>
              <AttachVideo />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base">
                Description
              </label>
              <textarea
                placeholder="Description"
                className="p-2 bg-primary-fp outline-none rounded-lg w-full text-xl"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xl">
                Flashcards
              </label>
              <FlashcardUploader />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AddModulePopUp;
