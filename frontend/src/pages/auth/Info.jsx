import React, { useState } from "react";

const Info = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div>
      <div className="flex flex-col items-center w-full h-screen absolute top-20">
        {/* Stepper Container */}
        <div className="flex justify-center items-center">
          {/* Personal Info */}
          <div className="flex flex-col items-center">
            <div
              className={`h-16 w-60 flex flex-col justify-center items-center text-text-g gap-4 border-b-2 cursor-pointer ${
                activeSection === "personal"
                  ? "border-secondary-lt text-text-g"
                  : "border-transparent text-[#787878]"
              }`}
              onClick={() => handleClick("personal")}
            >
              <p
                className={`border border-secondary-l rounded-full w-6 h-6 flex items-center justify-center ${
                  activeSection === "personal"
                    ? "border-transparent text-text-g"
                    : "border-[#787878] bg-[#787878] text-text-d"
                }`}
              >
                1
              </p>
              <p className="mb-6">Personal Information</p>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col items-center">
            <div
              className={`h-16 w-60 flex flex-col justify-center items-center text-text-g gap-4 border-b-2 cursor-pointer ${
                activeSection === "details"
                  ? "border-secondary-lt text-text-g"
                  : "border-transparent text-[#787878]"
              }`}
              onClick={() => handleClick("details")}
            >
              <p
                className={`border border-secondary-l rounded-full w-6 h-6 flex items-center justify-center ${
                  activeSection === "details"
                    ? "border-transparent text-text-g"
                    : "border-[#787878] bg-[#787878] text-text-d"
                }`}
              >
                2
              </p>
              <p className="mb-6">Details</p>
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col items-center">
            <div
              className={`h-16 w-60 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer ${
                activeSection === "payment"
                  ? "border-secondary-lt text-text-g"
                  : "border-transparent text-[#787878]"
              }`}
              onClick={() => handleClick("payment")}
            >
              <p
                className={`border border-secondary-l rounded-full w-6 h-6 flex items-center justify-center ${
                  activeSection === "payment"
                    ? "border-transparent text-text-g"
                    : "border-[#787878] bg-[#787878] text-text-d"
                }`}
              >
                3
              </p>
              <p className="mb-6">Payment</p>
            </div>
          </div>
        </div>

        {/* Expanded Section Container */}
        {activeSection && (
          <div className="w-full flex justify-center">
            <div className="p-6 w-3/4 rounded-lg">
              {activeSection === "personal" && (
                <div className="flex flex-col gap-8 pt-6">
                  <div className="text-text-g font-bold font-title text-3xl">
                    <h2>Let's get to know you..</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-2 text-text-g">
                        First Name
                      </label>
                      <input
                        type="name"
                        className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-2 text-text-g">
                        Last Name
                      </label>
                      <input
                        type="name"
                        className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-2 text-text-g">
                        Gender
                      </label>
                      <select className="w-full h-12 rounded-md p-2 text-lg text-text-d bg-secondary-lt border">
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-2 text-text-g">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
                      />
                    </div>
                  </div>
                  <button className="bg-secondary-d h-12 font-body rounded-md text-lg">
                    Next
                  </button>
                </div>
              )}
              {activeSection === "details" && (
                <div className="flex flex-col gap-4 pt-6 justify-center items-center">
                  <div className="text-text-g font-bold font-title text-3xl">
                    <h2>Some more details</h2>
                  </div>
                  <div className="flex flex-col w-1/3">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-2 text-text-g">
                        First Name
                      </label>
                      <input
                        type="name"
                        className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className="text-sm font-medium mb-2 text-text-g">
                      Gender
                    </label>
                    <select className="w-full h-12 rounded-md p-2 text-lg text-text-d bg-secondary-lt border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="8th">8th</option>
                      <option value="9th">9th</option>
                      <option value="10th">10th</option>
                    </select>
                  </div>
                  <button className="bg-secondary-d h-12 font-body rounded-md text-lg w-1/3 mt-4">
                    Next
                  </button>
                </div>
              )}
              {activeSection === "payment" && (
                <div>
                  <div className="text-text-g font-bold font-title text-3xl">
                    <h2>Payment Details</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center items-center mt-6 text-text-g">
          <p>
            Already have an account?
            <span className="text-secondary-lt ml-1 cursor-pointer">
              Login!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
