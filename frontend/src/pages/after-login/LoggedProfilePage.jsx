import React, { useState } from "react";
import Navbar2 from "../../components/Navbar2";
import { LuArrowLeft } from "react-icons/lu";
import ProfileImg from "../../assets/Images/landing page/after-login/profile.png";
import { IoSettingsOutline } from "react-icons/io5";
import VideoNullImg from "../../assets/Images/landing page/features/personalised.png";
import CompletedNullImg from "../../assets/Images/landing page/after-login/broken-piggy-bank.png";
import SavedNullImg from "../../assets/Images/landing page/after-login/cloud-book.png";

const LoggedProfilePage = () => {
  const first_name = "Nirali";
  const sur_name = "Shah";
  const standard = 8;
  const school = "ABC School";

  const Video = [
    "https://www.youtube.com/embed/86cpfsP0aPs?si=YDyEMqkXEWo2OS8M",
    "https://youtube.com/embed/qaeHKoq_CLM?si=rr8IFyHniZrLgfj6",
  ];

  const [activeSection, setActiveSection] = useState(null);
  const [hasOngoingVideos, setHasOngoingVideos] = useState(false);
  const [hasCompletedVideos, setHasCompletedVideos] = useState(false);
  const [hasSavedVideos, setHasSavedVideos] = useState(false);

  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div>
      <Navbar2 />
      <div className="flex flex-col gap-16 justify-center text-text-g">
        <div className="mx-40 flex gap-20">
          <LuArrowLeft className="text-text-g w-auto h-8 cursor-pointer" />
          <div className="flex gap-10 w-96">
            <img src={ProfileImg} alt="" className="w-auto h-24" />
            <div className="flex flex-col gap-4">
              <h2 className="font-title text-3xl">
                {first_name} {sur_name}
              </h2>
              <div className="flex gap-6 text-xl">
                <div>
                  Class <span className="font-bold">{standard}</span>
                </div>
                <div className="font-bold">{school}</div>
              </div>
              <div className="flex gap-4 items-center text-sm">
                <button className="bg-primary-fp p-2 rounded-xl w-1/2">
                  Edit Profile
                </button>
                <button className="bg-primary-fp p-2 rounded-xl w-32">
                  Your Activity
                </button>
                <IoSettingsOutline className="text-text-g w-auto h-8 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div
                className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer  font-body ${
                  activeSection === "ongoing"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("ongoing")}
              >
                <p className="">Ongoing Videos</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-body ${
                  activeSection === "completed"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("completed")}
              >
                <p className="">Completed</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`h-16 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-body ${
                  activeSection === "saved"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("saved")}
              >
                <p className="">Saved</p>
              </div>
            </div>
          </div>
          <div className="w-3/4 flex justify-start p-6 rounded-lg">
            {activeSection === "ongoing" && (
              <div className="w-full">
                {hasOngoingVideos ? (
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
                ) : (
                  <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
                    <div>
                      <img src={VideoNullImg} alt="" className="h-40 w-auto" />
                    </div>
                    <div className="text-white flex flex-col justify-center items-center text-xl">
                      <p>Keep making smart money moves!</p>
                      <p>Start watching and continue your journey from here.</p>
                    </div>
                    <div>
                      <button className="rounded-lg h-10 w-32 bg-secondary-lt text-text-d">
                        Get Started
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeSection === "completed" && (
              <div className="w-full">
                {hasCompletedVideos ? (
                  <div className="p-4 hover:bg-primary_p w-full rounded-xl flex flex-col gap-2">
                    <h2 className="text-xl">
                      Course:{" "}
                      <span className="font-semibold">Name of the course</span>
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
                ) : (
                  <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
                    <div>
                      <img
                        src={CompletedNullImg}
                        alt=""
                        className="h-40 w-auto"
                      />
                    </div>
                    <div className="text-white flex flex-col justify-center items-center text-xl">
                      <p>From piggy banks to digital wallets.</p>
                      <p>Unlock the secrets of money together!</p>
                    </div>
                    <div>
                      <button className="rounded-lg h-10 w-32 bg-secondary-lt text-text-d">
                        Get Started
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeSection === "saved" && (
              <div className="w-full">
                {hasSavedVideos ? (
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
                            <p className="text-lg font-semibold">Quiz title</p>
                            <p>Name of the Module</p>
                            <p>Name of the course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-primary_p w-auto rounded-xl flex flex-col gap-2">
                      <h2 className="font-semibold text-xl">Games</h2>
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
                            <p className="text-lg font-semibold">Game Topic</p>
                            <p>Name of the Module</p>
                            <p>Name of the course</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
                    <div>
                      <img src={SavedNullImg} alt="" className="h-40 w-auto" />
                    </div>
                    <div className="text-white flex flex-col justify-center items-center text-xl">
                      <p>Hit play now!</p>
                      <p>
                        Watch, save, and come back anytime to master your money
                        moves!
                      </p>
                    </div>
                    <div>
                      <button className="rounded-lg h-10 w-32 bg-secondary-lt text-text-d">
                        Get Started
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedProfilePage;
