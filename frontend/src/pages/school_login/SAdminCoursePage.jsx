import React, { useState, useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { AiOutlineEllipsis } from "react-icons/ai";
import TeacherSidebar from "../../components/TeacherSidebar";
import TeacherNavbar from "../../components/TeacherNavbar";
import CourseDropdownMenu from "../../components/CourseDropMenu";
import Popup from "../../components/PopUp";

const TAdminCoursePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
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
            <div className="flex justify-between items-center text-2xl">
              <h1>Course1(Course Name)</h1>
              <div>
                <button onClick={toggleMenu} className="p-2">
                  <AiOutlineEllipsis size={30} />
                </button>
                {isOpen && <CourseDropdownMenu />}
              </div>
            </div>
            {/* description section */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Description</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                autem dicta similique, officia sed nihil culpa. Incidunt earum
                voluptatem, delectus quam eum adipisci mollitia eligendi et,
                vitae temporibus amet nemo!
              </p>
            </div>
            {/* Module Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Modules</h3>
              <div className="py-4 w-full flex gap-10 flex-wrap ">
                {/* Course Cards */}
                {moduleInfo.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div>
                      {/* Course Preview */}
                      <div className="bg-primary-fp w-72 h-48 rounded-md"></div>
                    </div>
                    <p className="text-lg">{item.moduleName}</p>
                    <p className="text-base">{item.amtVideo} Videos</p>
                  </div>
                ))}
                {/* Course Plus button */}
                <div
                  className="rounded-full w-10 h-10 place-self-center bg-secondary-d flex items-center justify-center cursor-pointer mb-10"
                  onClick={togglePopup}
                >
                  <GoPlus size={30} />
                </div>
                <Popup isOpen={popupOpen} onClose={togglePopup} />
              </div>
            </div>
            {/* Ready Quiz Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Ready Quiz</h3>
              <div className="py-4 w-full flex gap-10 flex-wrap ">
                {/* Course Cards */}
                {quizInfo.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div>
                      {/* Course Preview */}
                      <div className="bg-primary-fp w-72 h-48 rounded-md"></div>
                    </div>
                    <p className="text-lg">{item.quizName}</p>
                    <p className="text-base">{item.amtQuestions} Questions</p>
                  </div>
                ))}
                {/* Course Plus button */}
                <div
                  className="rounded-full w-10 h-10 place-self-center bg-secondary-d flex items-center justify-center cursor-pointer mb-10"
                  onClick={togglePopup}
                >
                  <GoPlus size={30} />
                </div>
                <Popup isOpen={popupOpen} onClose={togglePopup} />
              </div>
            </div>
            {/* Quiz Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Quiz Questions</h3>
              <div className="py-4 w-full flex gap-10 flex-wrap ">
                {/* Course Cards */}
                {quiz.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="w-80 h-24 p-2 bg-primary-fp rounded flex flex-wrap">
                      <p className="text-sm">{item.content}</p>
                    </div>
                    <p className="text-lg">{item.type}</p>
                  </div>
                ))}
                {/* Course Plus button */}
                <div
                  className="rounded-full w-10 h-10 place-self-center bg-secondary-d flex items-center justify-center cursor-pointer"
                  onClick={togglePopup}
                >
                  <GoPlus size={30} />
                </div>
                <Popup isOpen={popupOpen} onClose={togglePopup} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TAdminCoursePage;
