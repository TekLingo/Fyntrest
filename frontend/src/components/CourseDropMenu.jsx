import React from "react";

const CourseDropdownMenu = () => {
  return (
    <div className="absolute right-10 top-24 mt-2 bg-purple-300 text-gray-800 rounded-lg p-3 shadow-md w-32 text-center">
      <ul className="space-y-2">
        <li className="cursor-pointer hover:underline text-base">
          Edit Course
        </li>
        <li className="cursor-pointer hover:underline text-base">Disable</li>
        <li className="cursor-pointer text-red-500 hover:underline text-base">
          Delete
        </li>
      </ul>
    </div>
  );
};

export default CourseDropdownMenu;
