import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

const Dashboard = () => {
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

  const [sortBy, setSortBy] = useState("xp");
  const leaderboardData = [
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
    { srNo: 1, school: "ABC School", joinDate: "12 Jan 2025", students: 2000 },
  ];

  const sortedData = [...leaderboardData].sort((a, b) => b[sortBy] - a[sortBy]);

  // Assign ranks (handling ties)
  let currentRank = 0;
  let previousValue = null;
  sortedData.forEach((player, index) => {
    if (player[sortBy] !== previousValue) {
      currentRank = index + 1;
    }
    player.rank = currentRank;
    previousValue = player[sortBy];
  });

  const [activeSection, setActiveSection] = useState("schools");
  const [hasSchools] = useState(true);
  const [hasStudents] = useState(true);

  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="w-full text-text-g">
      <div className="bg-[#362856] flex h-full p-4 gap-4">
        {/* Left content */}
        <div className="w-2/3 h-full flex flex-col gap-4">
          <div className="flex h-1/2 gap-4">
            <div className="w-1/2 bg-primary_p h-full rounded-xl p-8">
              {/* Left-most card content */}
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
              {/* Right card content */}
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
          <div className="bg-primary_p h-1/2 rounded-xl p-4 w-full">
            {/* Table content */}
            <div className="flex border-b-2 border-[#787878] h-11">
              {/* heading content */}
              <div
                className={`h-11 w-min min-w-40 flex flex-col justify-center items-center gap-4 cursor-pointer font-body ${
                  activeSection === "schools"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("schools")}
              >
                <p className="">Schools</p>
              </div>
              <div
                className={`h-11 w-min min-w-40 flex flex-col justify-center items-center gap-4 cursor-pointer font-body ${
                  activeSection === "students"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("students")}
              >
                <p className="">Students</p>
              </div>
            </div>
            <div>
              <div>
                {activeSection === "schools" && (
                  <div className="w-9/10">
                    {hasSchools ? (
                      <div className="flex flex-col gap-2 py-4 w-full">
                        <div className="w-full overflow-y-auto max-h-40">
                          <table className="w-full text-left rounded-xl overflow-hidden font-body">
                            <thead className="rounded-xl bg-[#362856] h-10 z-10">
                              <tr className="h-10">
                                <th className="p-4 h-10">Sr.No</th>
                                <th className="p-4">School</th>
                                <th className="p-4">Joining Date</th>
                                <th>Students</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedData.map((player, index) => (
                                <tr key={index} className="bg-[#311B53]">
                                  <td className="p-4 w-20">{player.rank}</td>
                                  <td className="p-4 w-80 overflow-hidden">
                                    {player.school}
                                  </td>
                                  <td className="p-4 w-40 overflow-hidden">
                                    {player.joinDate}
                                  </td>
                                  <td className="p-4 w-40 overflow-hidden">
                                    {player.students}
                                  </td>
                                  <td className="p-2 w-20 overflow-hidden">
                                    <button className="hover:border-2 hover:border-secondary-dt w-8 h-8 rounded-full">
                                      <FaChevronRight className="place-self-center" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p>hi</p>
                      </div>
                    ) : (
                      <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
                        No Data
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                {activeSection === "students" && (
                  <div className="w-full">
                    {hasStudents ? (
                      <div className="flex gap-4 p-4">Data1</div>
                    ) : (
                      <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body">
                        No Data
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Right content */}
        <div className="w-1/3 bg-primary_p h-full rounded-xl p-4">
          <div className="flex flex-col gap-8 font-body">
            {/* Update content */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Updates</h2>
              <h3 className="text-lg font-normal">Recently Added</h3>
              {/* Button section */}
              <div className=" gap-2 w-full flex-wrap flex">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
