import React, { useState } from "react";
import { RiFilter2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../../components/FilterSidebar";
import SortPopup from "../../components/SortPopup";

const Content = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isFilterPopup, setIsFilterPopup] = useState(false); // New state to toggle between Add and Filter popups

  const deadlinesData = Array(10).fill({
    title: "Deadline title",
    date: "29-03-25, 5pm",
  });
  const [showAll, setShowAll] = useState(false);
  const visibleDeadlines = showAll ? deadlinesData : deadlinesData.slice(0, 5);

  const [selectedGrade, setSelectedGrade] = useState("8th");
  const [learningType, setLearningType] = useState("Learning");

  const amButton = [
    "Schools",
    "Students",
    "Admins",
    "Courses",
    "Modules",
    "Videos",
    "Quizzes",
    "Flashcards",
  ];

  const courses_f = [
    { link: "", coursename: "Course Name-xyz" },
    { link: "", coursename: "Course Name-xyz" },
  ];

  const coursenameData = [
    { moduleName: "Module Name", numOfVid: "5" },
    { moduleName: "Module Name", numOfVid: "5" },
  ];

  return (
    <div className="flex text-text-g h-screen bg-[#362856] p-4 gap-6 overflow-y-auto font-body">
      {/* Left card */}
      <div className="flex flex-col items-start justify-start w-2/3 gap-4">
        <div className="bg-primary_p text-white p-6 rounded-lg w-full max-w-full mx-auto ">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Completions</h2>
            <button
              className="text-sm px-3 py-1 bg-[#392456] rounded-full flex items-center gap-1"
              onClick={() => {
                setShowPopup(true);
                setIsFilterPopup(true); // Show Filter popup
              }}
            >
              Filter
              <RiFilter2Line />
            </button>
            <div className="fixed">
              {showPopup && isFilterPopup && (
                <FilterSidebar onClose={() => setShowPopup(false)} />
              )}
            </div>
          </div>

          <div className="space-y-3 transition-all duration-300 ease-in-out">
            {visibleDeadlines.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.title}</span>
                <span>{item.date}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-1.5 bg-[#392456] text-sm rounded-full"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less" : "View more"}
            </button>
          </div>
        </div>
        <div className="bg-primary_p text-white p-6 rounded-lg w-full max-w-full mx-auto space-y-6">
          <h2 className="text-2xl font-semibold">Schedule Classwork</h2>

          {/* Learning Type */}
          <div>
            <p className="mb-2">Select type of learning</p>
            <div className="flex gap-6">
              {["Learning", "Practice"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="learningType"
                    value={type}
                    checked={learningType === type}
                    onChange={() => setLearningType(type)}
                    className="appearance-none w-4 h-4 rounded-full border-2 border-white checked:bg-yellow-400 checked:border-yellow-400"
                  />
                  <span>{type} Mode</span>
                </label>
              ))}
            </div>
          </div>

          {/* Grade Buttons */}
          <div className="flex gap-4">
            {["8th", "9th", "10th"].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-1 rounded-full text-sm font-medium border ${
                  selectedGrade === grade
                    ? "bg-[#a38cd8] text-white"
                    : "border-white text-white hover:bg-white hover:text-[#260c44]"
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          {/* Conditional Form */}
          {learningType === "Learning" ? (
            <>
              {/* Learning Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Course Name*"
                  className="col-span-1 md:col-span-1 bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
                <select className="bg-[#392456] p-3 rounded-md text-white">
                  <option>8th</option>
                  <option>9th</option>
                  <option>10th</option>
                </select>
                <select className="bg-[#392456] p-3 rounded-md text-white">
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Module Name"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Video"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="DD-MM-YYYY"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="00 : 00 AM"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
              </div>
            </>
          ) : (
            <>
              {/* Practice Form (based on screenshot) */}
              <input
                type="text"
                placeholder="Quiz Title"
                className="w-full bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Course Name*"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
                <select className="bg-[#392456] p-3 rounded-md text-white">
                  <option>8th</option>
                  <option>9th</option>
                  <option>10th</option>
                </select>
                <select className="bg-[#392456] p-3 rounded-md text-white">
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Module Name"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Video"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="DD-MM-YYYY"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="00 : 00 AM"
                  className="bg-[#392456] p-3 rounded-md placeholder-white/70 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Schedule Button */}
          <div className="flex justify-center">
            <button className="bg-[#a38cd8] px-6 py-2 rounded-lg text-text-d font-medium">
              Schedule
            </button>
          </div>
        </div>
      </div>
      {/* Right card */}
      <div className="w-1/3 bg-primary_p h-full rounded-xl p-4">
        <div className="flex flex-col gap-8 font-body">
          {/* Update content */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Updates</h2>
            <h3 className="text-xl font-normal">Recently Added</h3>
            {/* Button section */}
            <div className="gap-2 w-full flex-wrap flex">
              {amButton.map((item, index) => (
                <button
                  key={index}
                  className="text-xs border border-secondary-d p-2 max-w-48 min-w-20 h-auto rounded-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Course content */}
          <div>
            <div className="h-10">
              <h2 className="font-body font-bold text-xl">Courses</h2>
            </div>
            <div className="flex gap-2">
              {/* preview course content */}
              {courses_f.map((item, index) => (
                <div key={index}>
                  <div className="bg-primary-fp h-20 w-32 rounded"></div>
                  {item.coursename}
                </div>
              ))}
            </div>
          </div>
          {/* Course name content */}
          <div className="">
            <div>
              <h2 className="font-body text-lg">Course Name - XYZ</h2>
              <div className="flex flex-col gap-2">
                {coursenameData.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="bg-primary-fp h-10 w-16 rounded"></div>
                    <p>
                      {item.moduleName} | {item.numOfVid} Videos
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
