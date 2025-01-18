import React, { useState } from "react";

const ScrollableDiv = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(e.target.closest(".scroll-container").scrollLeft); // Get the scroll position
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    e.target.closest(".scroll-container").scrollLeft = scrollLeft - distance; // Update scroll position
  };

  return (
    <div
      className="scroll-container overflow-x-hidden w-full p-4 ml-[30%] cursor-default"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        userSelect: "none", // Disable text selection
        width: "calc(100% - 30%)", // Ensure full width minus the left margin
        whiteSpace: "nowrap", // Ensure no wrapping of items
        display: "flex", // Flex container to align items in a row
      }}
    >
      <div className="flex space-x-4">
        <div className="w-48 h-48 bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
          Item 1
        </div>
        <div className="w-48 h-48 bg-green-500 text-white flex items-center justify-center flex-shrink-0">
          Item 2
        </div>
        <div className="w-48 h-48 bg-red-500 text-white flex items-center justify-center flex-shrink-0">
          Item 3
        </div>
        <div className="w-48 h-48 bg-yellow-500 text-white flex items-center justify-center flex-shrink-0">
          Item 4
        </div>
        <div className="w-48 h-48 bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
          Item 5
        </div>
        <div className="w-48 h-48 bg-teal-500 text-white flex items-center justify-center flex-shrink-0">
          Item 6
        </div>
        <div className="w-48 h-48 bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
          Item 7
        </div>
        <div className="w-48 h-48 bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
          Item 8
        </div>
        <div className="w-48 h-48 bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
          Item 9
        </div>
        {/* Add more items as needed */}
      </div>
    </div>
  );
};

export default ScrollableDiv;
