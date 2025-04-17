import React, { useEffect, useRef } from "react";

const SortPopup = ({ onSelect, isOpen, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // Close the popup
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const options = [
    "Newest First",
    "Oldest First",
    "No. of students (high to low)",
    "No. of students (low to high)",
  ];

  return (
    <div
      ref={popupRef}
      className="absolute right-0 mt-2 w-64 bg-[#392456] text-white rounded-xl shadow-lg z-50 p-4 space-y-4"
    >
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => onSelect(option)}
          className="cursor-pointer hover:opacity-80"
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SortPopup;
