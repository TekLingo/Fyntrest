import React, { useState } from "react";
import Navbar2 from "../../components/Navbar2";
import { LuArrowLeft } from "react-icons/lu";
import ProfileImg from "../../assets/Images/landing page/after-login/profile.png";
import { IoSettingsOutline } from "react-icons/io5";

const LoggedProfilePage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const Video = [
    "https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M",
    "https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6",
  ];

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <Navbar2 />
        {/* Page Section */}
        <div className="flex flex-col gap-16 justify-center text-text-g">
          {/* Info Section */}
          <div className="mx-40 flex gap-20">
            <LuArrowLeft className="text-text-g w-auto h-8 cursor-pointer" />
            <div className=" flex gap-10 w-96">
              {/* profile image */}
              <div>
                <img src={ProfileImg} alt="" className="w-auto h-24" />
              </div>
              {/* profile info */}
              <div className="flex flex-col gap-4">
                <div className="font-title text-3xl">
                  <h2>Nirali Shah</h2>
                </div>
                <div className="flex gap-6 text-xl">
                  <div>
                    Class <span className="font-bold">8</span>
                  </div>
                  <div className="font-bold">ABC School</div>
                </div>
                <div className="flex gap-4 items-center text-sm">
                  <button className="bg-secondary-dt p-2 rounded-xl w-1/2">
                    Edit Profile
                  </button>
                  <button className="bg-secondary-dt p-2 rounded-xl w-32">
                    Your Activity
                  </button>
                  <IoSettingsOutline className="text-text-g w-auto h-8 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          {/* Videos Section */}
          <div className="">
            <div className="flex flex-col items-center">
              {/* Stepper Container */}
              <div className="flex justify-center items-center">
                {/* Ongoing Videos Info */}
                <div className="flex flex-col items-center">
                  <div
                    className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-bold ${
                      activeSection === "ongoing"
                        ? "border-secondary-lt text-text-g"
                        : "border-[#787878] text-[#787878]"
                    }`}
                    onClick={() => handleClick("ongoing")}
                  >
                    <p className="">Ongoing Videos</p>
                  </div>
                </div>

                {/* Completed */}
                <div className="flex flex-col items-center">
                  <div
                    className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-bold ${
                      activeSection === "completed"
                        ? "border-secondary-lt text-text-g"
                        : "border-[#787878] text-[#787878]"
                    }`}
                    onClick={() => handleClick("completed")}
                  >
                    <p className="">Completed</p>
                  </div>
                </div>

                {/* Saved */}
                <div className="flex flex-col items-center">
                  <div
                    className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-bold ${
                      activeSection === "saved"
                        ? "border-secondary-lt text-text-g"
                        : "border-[#787878] text-[#787878]"
                    }`}
                    onClick={() => handleClick("saved")}
                  >
                    <p className="">Saved</p>
                  </div>
                </div>
              </div>

              {/* Expanded Section Container */}
              {activeSection && (
                <div className="w-3/4 flex justify-start ">
                  <div className="p-6 rounded-lg ">
                    {activeSection === "ongoing" && (
                      <div className="flex gap-4 p-4">
                        {/* Video redirect Section */}
                        <div className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl">
                          {/* Video card */}
                          <div className="bg-secondary-d w-96 h-60 rounded-xl">
                            <iframe
                              className="w-full h-full rounded-xl"
                              src={Video[0]}
                              title="Course Video Thumbnail"
                              allowFullScreen
                            />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">
                              Name of the ongoing Video
                            </p>
                            <p>Name of the Module</p>
                            <p>Name of the course</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeSection === "completed" && (
                      <div className="p-4 hover:bg-primary_p w-full rounded-xl flex flex-col gap-2">
                        <h2 className="text-xl">
                          Course:{" "}
                          <span className="font-semibold">
                            Name of the course
                          </span>
                        </h2>
                        {/* Video redirect Section */}
                        <div className="flex gap-4  rounded-xl">
                          <div className="flex-col flex gap-4 p-2 hover:bg-secondary-dt">
                            {/* Video card */}
                            <div className="bg-secondary-d w-96 h-60 rounded-xl">
                              <iframe
                                className="w-full h-full rounded-xl"
                                src={Video[0]}
                                title="Course Video Thumbnail"
                                allowFullScreen
                              />
                            </div>
                            <div>
                              <p className="text-lg font-semibold">
                                Name of the Module
                              </p>
                              <p>Name of the course</p>
                            </div>
                          </div>
                          <div className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl">
                            {/* Video card */}
                            <div className="bg-secondary-d w-96 h-60 rounded-xl">
                              <iframe
                                className="w-full h-full rounded-xl"
                                src={Video[0]}
                                title="Course Video Thumbnail"
                                allowFullScreen
                              />
                            </div>
                            <div>
                              <p className="text-lg font-semibold">
                                Name of the Module
                              </p>
                              <p>Name of the course</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeSection === "saved" && (
                      <div className="flex flex-col gap-2">
                        <div className="p-4 hover:bg-primary_p w-auto rounded-xl flex flex-col gap-2">
                          <h2 className="font-semibold text-xl">Videos</h2>
                          {/* Video redirect Section */}
                          <div className="flex gap-4">
                            <div className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl">
                              {/* Video card */}
                              <div className="bg-secondary-d w-96 h-60 rounded-xl">
                                <iframe
                                  className="w-full h-full rounded-xl"
                                  src={Video[0]}
                                  title="Course Video Thumbnail"
                                  allowFullScreen
                                />
                              </div>
                              <div>
                                <p className="text-lg font-semibold">
                                Name of the Module
                                </p>
                                <p>Name of the course</p>
                              </div>
                            </div>
                            <div className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl">
                              {/* Video card */}
                              <div className="bg-secondary-d w-96 h-60 rounded-xl">
                                <iframe
                                  className="w-full h-full rounded-xl"
                                  src={Video[0]}
                                  title="Course Video Thumbnail"
                                  allowFullScreen
                                />
                              </div>
                              <div>
                                <p className="text-lg font-semibold">
                                  Name of the ongoing Video
                                </p>
                                <p>Name of the Module</p>
                                <p>Name of the course</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 hover:bg-primary_p w-auto rounded-xl flex flex-col gap-2">
                          <h2 className="font-semibold text-xl">Quizzes</h2>
                          {/* Video redirect Section */}
                          <div className="flex gap-4">
                            <div className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl">
                              {/* Video card */}
                              <div className="bg-secondary-d w-96 h-60 rounded-xl">
                                <iframe
                                  className="w-full h-full rounded-xl"
                                  src={Video[0]}
                                  title="Course Video Thumbnail"
                                  allowFullScreen
                                />
                              </div>
                              <div>
                                <p className="text-lg font-semibold">
                                  Name of the ongoing Video
                                </p>
                                <p>Name of the Module</p>
                                <p>Name of the course</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedProfilePage;
