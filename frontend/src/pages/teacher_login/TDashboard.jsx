import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Pagination from "../../components/Pagination";
import EntityDetails from "./TEntityDetails";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  // Sample data
  const sampleArray = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);
  const sampleDict = {
    a: "Apple",
    b: "Banana",
    c: "Cherry",
    d: "Date",
    e: "Elderberry",
    f: "Fig",
    g: "Grape",
    h: "Honeydew",
    i: "Indian Fig",
    j: "Jackfruit",
  };

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

  const [sortBy, setSortBy] = useState("students");
  const [activeSection, setActiveSection] = useState("schools");
  const [hasSchools] = useState(true);
  const [hasStudents] = useState(true);
  const [currentPages, setCurrentPages] = useState({
    schools: 1,
    students: 1,
  });

  const itemsPerPage = 5;

  const leaderboardData = [
    { school: "Green Valley High", joinDate: "10 Feb 2023", students: 1500 },
    { school: "Blue Ridge Academy", joinDate: "15 Mar 2023", students: 1200 },
    {
      school: "Sunrise Public School",
      joinDate: "20 Apr 2023",
      students: 1800,
    },
    {
      school: "Harmony International",
      joinDate: "25 May 2023",
      students: 2000,
    },
    { school: "Crescent Moon School", joinDate: "30 Jun 2023", students: 1700 },
    { school: "Starlight Academy", joinDate: "05 Jul 2023", students: 1400 },
    {
      school: "Evergreen High School",
      joinDate: "10 Aug 2023",
      students: 1600,
    },
    { school: "Maple Leaf Academy", joinDate: "15 Sep 2023", students: 1900 },
    { school: "Oakwood High", joinDate: "20 Oct 2023", students: 1300 },
    { school: "Riverdale School", joinDate: "25 Nov 2023", students: 1500 },
  ].map((item, index) => ({ ...item, srNo: index + 1 }));

  const coursenameData = [
    { moduleName: "Module Name", numOfVid: "5" },
    { moduleName: "Module Name", numOfVid: "5" },
  ];

  const sortData = (data, sortProperty) => {
    const sorted = [...data].sort((a, b) => b[sortProperty] - a[sortProperty]);
    let currentRank = 0;
    let previousValue = null;
    sorted.forEach((item, index) => {
      if (item[sortProperty] !== previousValue) {
        currentRank = index + 1;
      }
      item.rank = currentRank;
      previousValue = item[sortProperty];
    });
    return sorted;
  };

  const sortedSchoolsData = sortData(leaderboardData, sortBy);
  const sortedStudentsData = sortData(leaderboardData, sortBy);

  const getCurrentItems = (section) => {
    const data = section === "schools" ? sortedSchoolsData : sortedStudentsData;
    const startIndex = (currentPages[section] - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleClick = (section) => {
    setActiveSection(section);
  };

  const handlePageChange = (section, pageNumber) => {
    setCurrentPages((prev) => ({
      ...prev,
      [section]: Number(pageNumber),
    }));
  };

  return (
    <div className="w-full h-full text-text-g">
      <div className="bg-[#362856] flex h-full p-4 gap-4 overflow-y-auto">
        {/* Left content */}
        <div className="w-2/3 h-full flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-1/2 bg-primary_p h-full rounded-xl p-8">
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="font-body font-bold text-2xl">
                    Schools onboard
                  </h2>
                  <select
                    name="time_period"
                    id="tp"
                    className="bg-[#362856] font-body h-8 focus:outline-none rounded-md px-2"
                  >
                    <option value="year">Yearly</option>
                    <option value="month">Monthly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-primary_p h-full rounded-xl p-8">
              <div className="h-full">
                <div className="flex justify-between items-center">
                  <h2 className="font-body font-bold text-2xl">
                    Students enrolled
                  </h2>
                  <select
                    name="time_period"
                    id="tp"
                    className="bg-[#362856] font-body h-8 focus:outline-none rounded-md px-2"
                  >
                    <option value="year">Yearly</option>
                    <option value="month">Monthly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                <h2 className="font-title text-4xl h-4/5 flex justify-center items-center">
                  359+
                </h2>
              </div>
            </div>
          </div>
          <div className="bg-primary_p h-full rounded-xl p-4 w-full">
            <div className="flex border-b-2 border-[#787878] h-11">
              <div
                className={`h-11 w-min min-w-40 flex flex-col justify-center items-center gap-4 cursor-pointer font-body ${
                  activeSection === "schools"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("schools")}
              >
                <p>Schools</p>
              </div>
              <div
                className={`h-11 w-min min-w-40 flex flex-col justify-center items-center gap-4 cursor-pointer font-body ${
                  activeSection === "students"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("students")}
              >
                <p>Students</p>
              </div>
            </div>

            <div className="w-9/10">
              {(activeSection === "schools" && hasSchools) ||
              (activeSection === "students" && hasStudents) ? (
                <div className="flex flex-col gap-2 py-4 w-full">
                  <div className="w-full">
                    <table className="w-full text-left rounded-xl overflow-hidden font-body">
                      <thead className="rounded-xl bg-[#362856] h-10 z-10 sticky top-0">
                        <tr className="h-10">
                          <th className="p-4 h-10">Rank</th>
                          <th className="p-4">School</th>
                          <th className="p-4">Joining Date</th>
                          <th className="p-4">Students</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCurrentItems(activeSection).map((item, index) => (
                          <tr key={index} className="bg-[#311B53]">
                            <td className="p-4 w-20">{item.rank}</td>
                            <td className="p-4 w-80 overflow-hidden">
                              {item.school}
                            </td>
                            <td className="p-4 w-40 overflow-hidden">
                              {item.joinDate}
                            </td>
                            <td className="p-4 w-40 overflow-hidden">
                              {item.students}
                            </td>
                            <td className="p-2 w-20 overflow-hidden">
                              <button
                                className="hover:border-2 hover:border-secondary-dt w-8 h-8 rounded-full"
                                onClick={() =>
                                  navigate("/teacher/entity/school")
                                }
                              >
                                <FaChevronRight className="place-self-center" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Pagination
                      totalItems={
                        activeSection === "schools"
                          ? sortedSchoolsData.length
                          : sortedStudentsData.length
                      }
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPages[activeSection]}
                      onPageChange={(page) =>
                        handlePageChange(activeSection, page)
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
                  No Data
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right content */}
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
    </div>
  );
};

export default Dashboard;
