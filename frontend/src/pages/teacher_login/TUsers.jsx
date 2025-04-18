import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Pagination from "../../components/Pagination";
import AddEntityPopUp from "../../components/AddEntityPopUp";
import FilterSidebar from "../../components/FilterSidebar";
import SortPopup from "../../components/SortPopup";
import { RiFilter2Line } from "react-icons/ri";
import { MdSort } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const SectionHeader = ({ sections, activeSection, onSectionChange }) => {
  return (
    <div className="flex justify-between items-center h-8 px-2">
      <div className="flex h-8">
        {sections.map((section) => (
          <div
            key={section}
            className={`h-8 w-min min-w-40 flex flex-col justify-center items-center gap-4 cursor-pointer font-body ${
              activeSection === section
                ? "border-secondary-lt text-text-g border-b-4"
                : "border-[#787878] text-[#787878]"
            }`}
            onClick={() => onSectionChange(section)}
          >
            <p>{section}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DataTable = ({ data, paginationProps, navigate }) => (
  <div className="flex flex-col gap-2 py-4 w-full">
    <div className="w-full overflow-y-auto">
      <table className="w-full text-left rounded-xl overflow-hidden font-body">
        <thead className="rounded-xl bg-[#362856] h-10 z-10 sticky top-0">
          <tr className="h-10">
            <th className="p-4 h-10">S. No.</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Grade</th>
            <th className="p-4">Roll No.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, index) => (
            <tr key={index} className="bg-[#311B53] w-full">
              <td className="p-4 w-20">{player.rank}</td>
              <td className="p-4 w-40 overflow-hidden">{player.name}</td>
              <td className="p-4 w-40 overflow-hidden">{player.email}</td>
              <td className="p-4 w-40 overflow-hidden">{player.code}</td>
              <td className="p-4 w-40 overflow-hidden">{player.roll}</td>
              <td className="p-2 w-20 overflow-hidden">
                <button
                  className="hover:border-2 hover:border-secondary-dt w-8 h-8 rounded-full"
                  onClick={() => navigate("/teacher/entity/student")}
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
      <Pagination {...paginationProps} />
    </div>
  </div>
);

const Users = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Students");
  const [currentPages, setCurrentPages] = useState({
    Students: 1,
  });
  const itemsPerPage = 5;

  const sections = ["Students"];

  const leaderboardData = Array.from({ length: 13 }, (_, index) => ({
    srNo: index + 1,
    name: `ABC School ${index + 1}`,
    email: `school${index + 1}@example.com`,
    code: index,
    roll: 30 + index,
    xp: Math.floor(Math.random() * 1000), // Added random XP for sorting
  }));

  const sortedData = [...leaderboardData].sort((a, b) => b.xp - a.xp);

  // Add ranks
  let currentRank = 0;
  let previousValue = null;
  sortedData.forEach((player, index) => {
    if (player.xp !== previousValue) {
      currentRank = index + 1;
    }
    player.rank = currentRank;
    previousValue = player.xp;
  });

  const handlePageChange = (section, pageNumber) => {
    setCurrentPages((prev) => ({
      ...prev,
      [section]: Number(pageNumber),
    }));
  };

  // Get current items for active section
  const currentItems = sortedData.slice(
    (currentPages[activeSection] - 1) * itemsPerPage,
    currentPages[activeSection] * itemsPerPage
  );

  const [showPopup, setShowPopup] = useState(false);
  const [isFilterPopup, setIsFilterPopup] = useState(false); // New state to toggle between Add and Filter popups

  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest First");

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setShowSort(false);
    // Do something with the selected option
  };

  return (
    <div className="w-full h-full text-text-g">
      <div className="bg-[#362856] flex h-full p-4 gap-4">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="bg-primary_p rounded-xl p-4 w-full overflow-hidden">
            <div className="flex justify-between">
              <SectionHeader
                sections={sections}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
              <div className="flex gap-2 absolute right-10">
                <button
                  onClick={() => {
                    setShowPopup(true);
                    setIsFilterPopup(false); // Show Add popup
                  }}
                  className=" h-8 mb-2 px-3 text-sm bg-secondary-dt text-white rounded hover:bg-primary-fp transition"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowPopup(true);
                    setIsFilterPopup(true); // Show Filter popup
                  }}
                  className="h-8 mb-2 px-3 text-sm bg-secondary-dt text-white rounded hover:bg-primary-fp transition flex gap-1 items-center"
                >
                  Filter
                  <RiFilter2Line size={16} />
                </button>

                {showPopup &&
                  (isFilterPopup ? (
                    <FilterSidebar onClose={() => setShowPopup(false)} />
                  ) : (
                    <AddEntityPopUp
                      onClose={() => setShowPopup(false)}
                      role="teacher"
                    />
                  ))}

                <button
                  onClick={() => setShowSort((prev) => !prev)}
                  className="h-8 mb-2 px-3 text-sm bg-secondary-dt text-white rounded hover:bg-primary-fp transition flex gap-1 items-center"
                >
                  Sort
                  <MdSort size={18} />
                </button>
              </div>

              <SortPopup
                isOpen={showSort}
                onSelect={handleSortSelect}
                onClose={() => setShowSort(false)}
              />
            </div>
            <div className="overflow-auto">
              <DataTable
                data={currentItems}
                paginationProps={{
                  totalItems: sortedData.length,
                  itemsPerPage: itemsPerPage,
                  currentPage: currentPages[activeSection],
                  onPageChange: (page) => handlePageChange(activeSection, page),
                }}
                navigate={navigate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
