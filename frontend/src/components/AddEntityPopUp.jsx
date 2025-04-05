import React from "react";

const AddEntityPopUp = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-bg-color bg-opacity-80 flex justify-center items-center flex-col gap-20">
      <div className="w-4/5 popup-container bg-bg-color p-6 rounded-lg shadow-lg relative text-text-g flex flex-col gap-8 h-screen overflow-y-auto">
        {/* title section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Add Course</h1>
          {/* <IoIosClose size={40} onClick={onClose} className="cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
};

export default AddEntityPopUp;
