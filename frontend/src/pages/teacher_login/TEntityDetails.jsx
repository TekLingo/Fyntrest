import React, { useState } from "react";
import TeacherSidebar from "../../components/TeacherSidebar";
import TeacherNavbar from "../../components/TeacherNavbar";
import { FaArrowLeft } from "react-icons/fa6";
import SchoolImg from "../../assets/Images/School.png";
import { useParams } from "react-router-dom";

const TEntityDetails = () => {
  const [isOn, setIsOn] = useState(true);
  const { entityType } = useParams();

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  // const entityType = "student"; // Change to: "teacher", "fyntrest_admin", "student"

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
      <TeacherSidebar />
      <div className="w-full flex flex-col h-screen">
        <TeacherNavbar />
        <div className="flex-grow flex h-full bg-primary-fp p-4 text-text-g overflow-auto">
          <div className="w-full h-full flex flex-col bg-primary_p rounded-lg p-4 font-body font-normal gap-5 overflow-auto">
            <div className="flex justify-between items-center">
              <FaArrowLeft size={20} />
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
                      {entityData.labels.students}{" "}
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
