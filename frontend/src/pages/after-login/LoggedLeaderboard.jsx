import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const LoggedLeaderboard = () => {
  const [sortBy, setSortBy] = useState("xp"); // Default sorting by XP

  const leaderboardData = [
    { name: "ABC", grade: 8, section: "A", coins: 2000, xp: 12000 },
    { name: "DEF", grade: 8, section: "A", coins: 2500, xp: 15000 },
    { name: "XYZ", grade: 8, section: "A", coins: 1800, xp: 13000 },
    { name: "XYZ", grade: 8, section: "A", coins: 1800, xp: 13000 },
    { name: "XYZ", grade: 8, section: "A", coins: 1800, xp: 13000 },
    { name: "XYZ", grade: 8, section: "A", coins: 1800, xp: 13000 },
    { name: "XYZ", grade: 8, section: "A", coins: 1800, xp: 13000 },
    { name: "LMN", grade: 8, section: "A", coins: 2200, xp: 15000 },
    { name: "PQR", grade: 8, section: "A", coins: 2000, xp: 14500 },
    { name: "You", grade: 8, section: "A", coins: 2000, xp: 14000 },
  ];

  // Sort data dynamically based on XP or Coins
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

  return (
    <div className="min-h-screen text-white">
      {/* Sticky Navbar */}
      <div className="sticky top-0 bg-bg-color z-10 p-5 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <FaArrowLeft className="text-xl cursor-pointer" />
          <h1 className="text-2xl font-semibold">Leaderboard</h1>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="flex justify-center mt-5">
        <table className="w-3/4 text-left rounded-xl overflow-hidden font-body">
          <thead className="rounded-xl bg-primary_p">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Name</th>
              <th className="p-4">Grade</th>
              <th className="p-4">Section</th>
              <th
                className={`p-4 cursor-pointer ${
                  sortBy === "coins" ? "text-blue-400" : ""
                }`}
                onClick={() => setSortBy("coins")}
              >
                <p>Coins</p>
              </th>
              <th
                className={`p-4 cursor-pointer ${
                  sortBy === "xp" ? "text-blue-400" : ""
                }`}
                onClick={() => setSortBy("xp")}
              >
                <p>Experience Points</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((player, index) => (
              <tr
                key={index}
                className={` ${
                  player.rank === 1
                    ? "bg-[#4A3769] border border-[#372259]"
                    : player.rank === 2
                    ? "bg-[#422D61] border border-[#372259]"
                    : player.rank === 3
                    ? "bg-[#39245A] border border-[#372259]"
                    : "bg-[#311B53]"
                } ${player.name === "You" ? "border-2 border-[#68598F]" : ""}`}
              >
                <td className="p-4">
                  {player.rank === 1
                    ? "🥇"
                    : player.rank === 2
                    ? "🥈"
                    : player.rank === 3
                    ? "🥉"
                    : player.rank}
                </td>
                <td className="p-4">{player.name}</td>
                <td className="p-4">{player.grade}</td>
                <td className="p-4">{player.section}</td>
                <td className="p-4">💰 {player.coins}</td>
                <td className="p-4">🌟 {player.xp} XP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoggedLeaderboard;
