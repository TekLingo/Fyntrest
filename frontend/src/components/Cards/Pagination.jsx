import React, { useState } from "react";

const Pagination = ({ data, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Convert object (dict) to an array if necessary
  const dataArray = Array.isArray(data) ? data : Object.values(data);

  // Pagination Logic
  const totalPages = Math.ceil(dataArray.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = dataArray.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Data List */}
      <ul className="border rounded-lg shadow p-4 bg-white">
        {paginatedData.map((item, index) => (
          <li key={index} className="py-2 border-b last:border-none">
            {JSON.stringify(item)}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2 border rounded bg-gray-100">
          {currentPage} / {totalPages}
        </span>

        <button
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
