import React, { useState, useEffect } from "react";
import TeacherNavbar from "../../components/TeacherNavbar";
import LogoImg from "../../assets/Images/color-logo.png";
import { HiOutlinePencil } from "react-icons/hi2";
import SchoolImg from "../../assets/Images/School.png";
import { useNavigate } from "react-router-dom";
import LogOut from "../../components/LogOut";

const TProfilePage = () => {
  // Set activeMenu from the current route
  const [activeMenu, setActiveMenu] = useState("profile");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (setActiveSection) setActiveSection(menu);
  };

  const entityType = "teacher"; // Change to: "teacher", "fyntrest_admin", "student"

  const entityData = {
    school: {
      role: "School",
      name: "ABC School",
      image: SchoolImg,
      labels: {
        head: "School Head",
        headValue: "Name of the Principal/ Dean",
        phone: "Phone Number",
        email: "Email Address",
        gender: "Gender",
        grades: "Grades",
        students: "No. of students",
        teachers: "No. of teachers",
        startDate: "Collaboration Start Date",
      },
      values: {
        phone: "1234567890",
        email: "name@abc.com",
        gender: "Female",
        grades: ["8th", "9th", "10th"],
        students: 250,
        teachers: 30,
        startDate: "15-12-2024",
      },
    },

    teacher: {
      role: "Teacher",
      name: "Mr. John Doe",
      image: SchoolImg,
      labels: {
        head: "School Name",
        headValue: "ABC School",
        phone: "Phone Number",
        email: "Email Address",
        gender: "Gender",
        grades: "Grades Taught",
        students: "No. of students",
        teachers: "Experience (Years)",
        startDate: "Collaboration Start Date",
      },
      values: {
        phone: "9876543210",
        email: "john.doe@abc.com",
        gender: "Male",
        grades: ["8th", "10th"],
        students: 80,
        teachers: 5,
        startDate: "01-01-2024",
      },
    },

    fyntrest_admin: {
      role: "Fyntrest Admin",
      name: "Fyntrest Admin",
      image: SchoolImg,
      labels: {
        head: "Name",
        headValue: "Sarthak",
        phone: "Contact Number",
        email: "Personal Email ID",
        gender: "Gender",
        grades: "Permissions",
        students: "Company Email ID",
        teachers: "Current Position",
        startDate: "Admin Since",
      },
      values: {
        phone: "1122334455",
        email: "jane@fyntrest.com",
        gender: "Female",
        grades: [],
        students: "sahil.r@fyntrest.com",
        teachers: "UX Intern",
        startDate: "10-10-2023",
      },
    },

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
      {/* <AdminSidebar /> */}
      <div className="w-full flex flex-col h-screen">
        <TeacherNavbar />
        <div className="flex-grow flex h-full bg-[#362856] p-2 text-text-g overflow-auto">
          <div className="w-full h-full flex flex-col rounded-lg font-body font-normal gap-5 overflow-auto">
            <div className="flex gap-5 w-full h-full">
              <img
                src={LogoImg}
                alt=""
                className="h-min w-16 cursor-pointer"
                onClick={() => {
                  navigate("/teacher/dashboard");
                }}
              />
              <div className="flex gap-5 w-full h-full">
                {/* left section */}
                <div className="w-80 h-full bg-bg-color rounded-xl p-4 text-xl">
                  <div className="flex flex-col gap-4">
                    <div
                      onClick={() => {
                        navigate("/teacher/dashboard");
                      }}
                      className={`flex items-center hover:bg-primary-fp p-2 w-full gap-4 rounded-xl cursor-pointer ${
                        activeMenu === "home" ? "bg-primary-fp font-medium" : ""
                      }`}
                    >
                      <p>Home</p>
                    </div>
                    <div
                      onClick={() => handleMenuClick("profile")}
                      className={`flex items-center hover:bg-primary-fp p-2 w-full gap-4 rounded-xl cursor-pointer ${
                        activeMenu === "profile"
                          ? "bg-primary-fp font-medium"
                          : ""
                      }`}
                    >
                      <p>Profile</p>
                    </div>
                    <div
                      onClick={() => handleMenuClick("settings")}
                      className={`flex items-center hover:bg-primary-fp p-2 w-full gap-4 rounded-xl cursor-pointer ${
                        activeMenu === "settings"
                          ? "bg-primary-fp font-medium"
                          : ""
                      }`}
                    >
                      <p>General Settings</p>
                    </div>
                    <div
                      onClick={() => {
                        setShowPopup(true);
                        handleMenuClick("profile");
                      }}
                      className={`flex items-center hover:bg-primary-fp p-2 w-full gap-4 rounded-xl text-[#FF5F61] cursor-pointer ${
                        activeMenu === "logout"
                          ? "bg-primary-fp font-medium"
                          : ""
                      }`}
                    >
                      <p>Logout</p>
                    </div>
                    {showPopup && (
                      <LogOut onClose={() => setShowPopup(false)} />
                    )}
                  </div>
                </div>
                {/* right section */}
                <div className="w-full h-full bg-bg-color rounded-xl p-4">
                  {activeMenu === "profile" && (
                    <div className="flex flex-col gap-8 py-10 px-4">
                      <div className="flex justify-center">
                        <div className="bg-primary-fp flex justify-center items-center rounded-full w-40 h-40 overflow-hidden">
                          <img
                            src={entityData.image}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div
                          className="p-4 flex justify-center items-center cursor-pointer bg-tertiary-o self-end text-text-g rounded-full"
                          onClick={() => navigate("/logged/profile-detail")}
                        >
                          <HiOutlinePencil className="w-auto h-6" />
                        </div>
                      </div>

                      <div className="px-20 py-4">
                        <div className="flex justify-around">
                          <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                              <p className="text-xs">
                                {entityData.labels.head}
                              </p>
                              <p className="text-xl">
                                {entityData.labels.headValue}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-xs">
                                {entityData.labels.phone}
                              </p>
                              <p className="text-xl">
                                {entityData.values.phone}
                              </p>
                            </div>
                            {entityData.values.grades.length > 0 && (
                              <div>
                                <p className="text-sm text-white/70 mb-2">
                                  {entityData.labels.grades}
                                </p>
                                <div className="flex gap-3 flex-wrap max-w-96">
                                  {entityData.values.grades.map(
                                    (grade, idx) => (
                                      <span
                                        key={idx}
                                        className="px-4 py-1 rounded-full bg-white/20"
                                      >
                                        {grade}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-white/70 flex items-center gap-2">
                                {entityData.labels.students}{" "}
                                <span className="text-lg">&#8250;</span>
                              </p>
                              <p className="text-2xl">
                                {entityData.values.students}
                              </p>
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
                                {entityData.labels.teachers}
                                <span className="text-lg">&#8250;</span>
                              </p>
                              <p className="text-2xl">
                                {entityData.values.teachers}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TProfilePage;
