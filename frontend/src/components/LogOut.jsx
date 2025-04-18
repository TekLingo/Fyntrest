import React, { useState } from "react";

const LogOut = ({ onClose }) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-bg-color font-body bg-opacity-60 flex justify-center items-center flex-col gap-20 z-50">
        <div className="w-1/4 popup-container bg-primary_p p-6 rounded-lg shadow-lg relative text-text-g flex flex-col gap-8 h-auto overflow-y-auto">
          {/* Title Section */}
          <div className="flex justify-center items-center">
            <h1 className="text-xl">Are you sure you want to logout?</h1>
          </div>
          <div className="flex gap-8 justify-center text-base">
            <button
              className="border-2 border-secondary-d text-text-g p-4 rounded-lg"
              onClick={onClose}
            >
              Don't Logout
            </button>
            <button className="bg-secondary-d text-text-d p-4 rounded-lg">
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
