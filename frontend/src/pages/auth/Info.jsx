import React, { useState } from "react";

const Info = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  return (
    <div>
      <div className="flex col-span-3 justify-center items-center h-screen">
        {/* Personal Info */}
        <div className="flex flex-col items-center">
          {/* Clickable Div */}
          <div
            className={`h-16 w-60 flex flex-col justify-center items-center text-text-g gap-4 border-b-2 cursor-pointer ${
              isClicked
                ? "border-secondary-lt text-[#787878]"
                : "border-transparent text-text-g"
            }`}
            onClick={() => setIsClicked(!isClicked)}
          >
            <p
              className={`border border-secondary-l rounded-full w-6 h-6 flex items-center justify-center ${
                isClicked
                  ? "border-[#787878] bg-[#787878] text-text-d"
                  : "border-transparent text-text-g"
              }`}
            >
              1
            </p>
            <p className="mb-6">Personal Information</p>
          </div>

          {/* Hidden Div (Visible on Click) */}
          {isClicked && (
            <div className="p-4 w-60 text-center">
              This div is only visible when clicked!
            </div>
          )}
        </div>
        {/* Details */}
        <div className="flex flex-col items-center">
          {/* Clickable Div */}
          <div
            className={`h-16 w-60 flex flex-col justify-center items-center text-text-g gap-4 border-b-2 cursor-pointer ${
              isClicked1
                ? "border-secondary-lt text-[#787878]"
                : "border-transparent text-text-g"
            }`}
            onClick={() => setIsClicked1(!isClicked1)}
          >
            <p
              className={`border border-secondary-l rounded-full w-6 h-6 flex items-center justify-center ${
                isClicked1
                  ? "border-[#787878] bg-[#787878] text-text-d"
                  : "border-transparent text-text-g"
              }`}
            >
              2
            </p>
            <p className="mb-6">Details</p>
          </div>

          {/* Hidden Div (Visible on Click) */}
          {isClicked1 && (
            <div className="p-4 w-60 text-center">
              This div is only visible when clicked!
            </div>
          )}
        </div>
        {/* Payment */}
        <div className="flex flex-col items-center">
          <div
            className={`h-16 w-60 flex flex-col justify-center items-center  gap-4 border-b-2 cursor-pointer ${
              isClicked2
                ? "border-secondary-lt text-[#787878]"
                : "border-transparent text-text-g"
            }`}
            onClick={() => setIsClicked2(!isClicked2)}
          >
            <p
              className={`border border-secondary-l rounded-full w-6 h-6 flex items-center justify-center ${
                isClicked2
                  ? "border-[#787878] bg-[#787878] text-text-d"
                  : "border-transparent text-text-g"
              }`}
            >
              3
            </p>
            <p className="mb-6">Payment</p>
          </div>

          {/* Hidden Div (Visible on Click) */}
          {isClicked2 && (
            <div className="p-4 w-60 text-center">
              This div is only visible when clicked!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
