import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { LuArrowLeft } from "react-icons/lu";
import TeacherSidebar from "../../components/TeacherSidebar";
import TeacherNavbar from "../../components/TeacherNavbar";
import { FaArrowLeft } from "react-icons/fa6";
import SchoolImg from "../../assets/Images/School.png";
import { useNavigate, useParams } from "react-router-dom";
import CompletedNullImg from "../../assets/Images/landing page/after-login/broken-piggy-bank.png";
import SavedNullImg from "../../assets/Images/landing page/after-login/cloud-book.png";
import VideoNullImg from "../../assets/Images/landing page/features/personalised.png";

const TEntityDetails = () => {
  const [isOn, setIsOn] = useState(true);
  const { entityType } = useParams();

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeSection, setActiveSection] = useState("ongoing");
  const [hasOngoingVideos, setHasOngoingVideos] = useState(false);
  const [hasCompletedVideos, setHasCompletedVideos] = useState(false);
  const [hasSavedVideos, setHasSavedVideos] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/get-user");
        setUserData(response.data.user);
        setVideos(response.data.videos || []);
        setHasOngoingVideos(response.data.videos?.ongoing?.length > 0);
        setHasCompletedVideos(response.data.videos?.completed?.length > 0);
        setHasSavedVideos(response.data.videos?.saved?.length > 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleEditProfileClick = () => {
    navigate("/logged/profile-detail");
  };

  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  // const entityType = "student"; // Change to: "teacher", "fyntrest_admin", "student"

  const entityData = {
    student: {
      role: "Student",
      name: "Emily Clark",
      image: SchoolImg,
      labels: {
        head: "School Name",
        headValue: "ABC School",
        phone: "Guardian Phone",
        email: "Student Email",
        gender: "Gender",
        grades: "Ongoing Course",
        students: "Coins",
        teachers: "Experience",
        startDate: "Enrollment Date",
      },
      values: {
        phone: "9998887776",
        email: "emily@student.com",
        gender: "Female",
        grades: [
          "Math",
          "Science",
          "English",
          "English",
          "English",
          "English",
          "English",
        ],
        students: 3,
        teachers: 5,
        startDate: "05-06-2022",
      },
    },
  }[entityType];

  return (
    <div className="flex h-full font-body">
      {/* <TeacherSidebar /> */}
      <div className="w-full flex flex-col h-screen">
        {/* <TeacherNavbar /> */}
        <div className="flex-grow flex h-full bg-primary-fp p-4 text-text-g overflow-auto">
          <div className="w-full h-full flex flex-col bg-primary_p rounded-lg p-4 font-body font-normal gap-5 overflow-auto">
            <div className="flex justify-between items-center">
              <FaArrowLeft
                size={20}
                className="cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer border transition-all duration-300 ${
                    isOn ? "justify-start" : "justify-end"
                  } border-white`}
                  onClick={toggleSwitch}
                >
                  <div
                    className={`w-6 h-6 rounded-full transition-all duration-300 ${
                      isOn ? "bg-secondary-lt" : "bg-tertiary-p"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-primary-fp flex justify-center items-center rounded-full w-40 h-40 overflow-hidden">
                  <img
                    src={entityData.image}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm">{entityData.role}</p>
                  <p className="text-2xl font-semibold">{entityData.name}</p>
                </div>
              </div>
            </div>
            <div className="px-20 py-4">
              <div className="flex justify-around">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <p className="text-xs">{entityData.labels.head}</p>
                    <p className="text-xl">{entityData.labels.headValue}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs">{entityData.labels.phone}</p>
                    <p className="text-xl">{entityData.values.phone}</p>
                  </div>
                  {entityData.values.grades.length > 0 && (
                    <div>
                      <p className="text-sm text-white/70 mb-2">
                        {entityData.labels.grades}
                      </p>
                      <div className="flex gap-3 flex-wrap max-w-96">
                        {entityData.values.grades.map((grade, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-1 rounded-full bg-white/20"
                          >
                            {grade}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-white/70 flex items-center gap-2">
                      {entityData.labels.students}
                      <span className="text-lg">&#8250;</span>
                    </p>
                    <p className="text-2xl">{entityData.values.students}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-sm text-white/70">
                      {entityData.labels.gender}
                    </p>
                    <p className="text-xl font-medium">
                      {entityData.values.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">
                      {entityData.labels.email}
                    </p>
                    <p className="text-xl font-medium">
                      {entityData.values.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">
                      {entityData.labels.startDate}
                    </p>
                    <p className="text-xl font-medium">
                      {entityData.values.startDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70 flex items-center gap-2">
                      {entityData.labels.teachers}{" "}
                      <span className="text-lg">&#8250;</span>
                    </p>
                    <p className="text-2xl">{entityData.values.teachers}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Section */}
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-12 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer  font-body ${
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
                    className={`h-12 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-body ${
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
                    className={`h-12 w-96 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer font-body ${
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
                        {videos.ongoing.map((video, index) => (
                          <div
                            key={index}
                            className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl"
                          >
                            <div className="bg-secondary-d w-96 h-60 rounded-xl">
                              <iframe
                                className="w-full h-full rounded-xl"
                                src={video.url}
                                title={video.title}
                                allowFullScreen
                              />
                            </div>
                            <div>
                              <p className="text-lg font-semibold">
                                {video.title}
                              </p>
                              <p>{video.module}</p>
                              <p>{video.course}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
                        <div>
                          <img
                            src={VideoNullImg}
                            alt=""
                            className="h-40 w-auto"
                          />
                        </div>
                        <div className="text-white flex flex-col justify-center items-center text-xl">
                          <p>No videos yet in {activeSection}.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeSection === "completed" && (
                  <div className="w-full">
                    {hasCompletedVideos ? (
                      <div className="p-4 hover:bg-primary_p w-full rounded-xl flex flex-col gap-2">
                        {videos.completed.map((video, index) => (
                          <div
                            key={index}
                            className="flex gap-4 p-2 hover:bg-secondary-dt rounded-xl"
                          >
                            <div className="bg-secondary-d w-96 h-60 rounded-xl">
                              <iframe
                                className="w-full h-full rounded-xl"
                                src={video.url}
                                title={video.title}
                                allowFullScreen
                              />
                            </div>
                            <div>
                              <p className="text-lg font-semibold">
                                {video.module}
                              </p>
                              <p>{video.course}</p>
                            </div>
                          </div>
                        ))}
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
                          <p>No videos yet in {activeSection}.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeSection === "saved" && (
                  <div className="w-full">
                    {hasSavedVideos ? (
                      <div className="flex flex-col gap-2">
                        {videos.saved.map((video, index) => (
                          <div
                            key={index}
                            className="p-4 hover:bg-primary_p w-auto rounded-xl flex flex-col gap-2"
                          >
                            <h2 className="font-semibold text-xl">
                              {video.type}
                            </h2>
                            <div className="flex gap-4">
                              <div className="flex-col flex gap-4 p-2 hover:bg-secondary-dt rounded-xl">
                                <div className="bg-secondary-d w-96 h-60 rounded-xl">
                                  <iframe
                                    className="w-full h-full rounded-xl"
                                    src={video.url}
                                    title={video.title}
                                    allowFullScreen
                                  />
                                </div>
                                <div>
                                  <p className="text-lg font-semibold">
                                    {video.title}
                                  </p>
                                  <p>{video.module}</p>
                                  <p>{video.course}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
                        <div>
                          <img
                            src={SavedNullImg}
                            alt=""
                            className="h-40 w-auto"
                          />
                        </div>
                        <div className="text-white flex flex-col justify-center items-center text-xl">
                          <p>No videos yet in {activeSection}.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-10 justify-center">
              <button className="border-2 border-secondary-dt rounded p-3">
                Disable
              </button>
              <button className="bg-secondary-dt text-text-d rounded p-3">
                Delete {entityData.role}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TEntityDetails;
