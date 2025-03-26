import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Pagination from "./Pagination";

const Users = () => {
  const [sortBy] = useState("xp");
  const leaderboardData = Array(13).fill({
    srNo: 1,
    name: "ABC School",
    category: "12 Jan 2025",
    code: 2000,
    email: 2000,
  });

  const sortedData = [...leaderboardData].sort((a, b) => b[sortBy] - a[sortBy]);

  let currentRank = 0;
  let previousValue = null;
  sortedData.forEach((player, index) => {
    if (player[sortBy] !== previousValue) {
      currentRank = index + 1;
    }
    player.rank = currentRank;
    previousValue = player[sortBy];
  });

  const [activeSection, setActiveSection] = useState("all");
  const [hasSchools] = useState(true);
  const [hasStudents] = useState(true);

  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="w-full text-text-g">
      <div className="bg-[#362856] flex h-full p-4 gap-4">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="bg-primary_p h-full rounded-xl p-4 w-full overflow-hidden">
            <div className="flex border-b-2 border-[#787878] h-11">
              <div
                className={`h-11 w-min min-w-40 flex flex-col justify-center items-center gap-4 cursor-pointer font-body ${
                  activeSection === "all"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("all")}
              >
                <p className="">All</p>
              </div>
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
              <div
                className={`h-11 w-min min-w-40 flex flex-col justify-center items-center gap-4 cursor-pointer font-body ${
                  activeSection === "admin"
                    ? "border-secondary-lt text-text-g border-b-4"
                    : "border-[#787878] text-[#787878]"
                }`}
                onClick={() => handleClick("admin")}
              >
                <p className="">Admin</p>
              </div>
            </div>
            <div className="overflow-auto max-h-[500px]">
              {activeSection === "all" && (
                <div className="w-full">
                  {hasSchools ? (
                    <div className="flex flex-col gap-2 py-4 w-full">
                      <table className="w-full text-left rounded-xl overflow-hidden font-body">
                        <thead className="rounded-xl bg-[#362856] h-10 z-10">
                          <tr className="h-10">
                            <th className="p-4 h-10">Sr.No</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Email Address</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedData.map((player, index) => (
                            <tr key={index} className="bg-[#311B53] w-full">
                              <td className="p-4 w-20">{player.rank}</td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.name}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.category}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.code}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.email}
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
                      <Pagination />
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body"></div>
                  )}
                </div>
              )}
              {activeSection === "schools" && (
                <div className="w-full">
                  {hasSchools ? (
                    <div className="flex flex-col gap-2 py-4 w-full">
                      <table className="w-full text-left rounded-xl overflow-hidden font-body">
                        <thead className="rounded-xl bg-[#362856] h-10 z-10">
                          <tr className="h-10">
                            <th className="p-4 h-10">Sr.No</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Email Address</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedData.map((player, index) => (
                            <tr key={index} className="bg-[#311B53] w-full">
                              <td className="p-4 w-20">{player.rank}</td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.name}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.category}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.code}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.email}
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
                      <Pagination />
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body"></div>
                  )}
                </div>
              )}
              {activeSection === "students" && (
                <div className="w-full">
                  {hasSchools ? (
                    <div className="flex flex-col gap-2 py-4 w-full">
                      <table className="w-full text-left rounded-xl overflow-hidden font-body">
                        <thead className="rounded-xl bg-[#362856] h-10 z-10">
                          <tr className="h-10">
                            <th className="p-4 h-10">Sr.No</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Email Address</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedData.map((player, index) => (
                            <tr key={index} className="bg-[#311B53] w-full">
                              <td className="p-4 w-20">{player.rank}</td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.name}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.category}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.code}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.email}
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
                      <Pagination />
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body"></div>
                  )}
                </div>
              )}
              {activeSection === "admin" && (
                <div className="w-full">
                  {hasSchools ? (
                    <div className="flex flex-col gap-2 py-4 w-full">
                      <table className="w-full text-left rounded-xl overflow-hidden font-body">
                        <thead className="rounded-xl bg-[#362856] h-10 z-10">
                          <tr className="h-10">
                            <th className="p-4 h-10">Sr.No</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Email Address</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedData.map((player, index) => (
                            <tr key={index} className="bg-[#311B53] w-full">
                              <td className="p-4 w-20">{player.rank}</td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.name}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.category}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.code}
                              </td>
                              <td className="p-4 w-40 overflow-hidden">
                                {player.email}
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
                      <Pagination />
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col gap-8 items-center justify-center w-full h-full font-body"></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
