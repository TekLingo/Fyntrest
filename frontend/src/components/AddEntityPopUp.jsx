import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import AddFile from "./AddFile";

const AddEntityPopUp = ({ onClose }) => {
  //   const navigate = useNavigate();
  const [activeEntity, setActiveEntity] = useState("school"); // Default to 8th grade

  const handleEntityClick = (entity) => {
    setActiveEntity(entity);
  };

  const [activeSubEntity, setActiveSubEntity] = useState("school"); // Default to 8th grade

  const handleSubEntityClick = (entity) => {
    setActiveSubEntity(entity);
  };

  const [activeGrade, setActiveGrade] = useState("8th"); // Default to 8th grade

  const handleGradeClick = (grade) => {
    setActiveGrade(grade);
  };

  const [activePayment, setActivePayment] = useState("school"); // Default to 8th grade

  const handlePaymentClick = (payment) => {
    setActivePayment(payment);
  };

  const [isPrincipal, setIsPrincipal] = useState(true);

  const toggleSwitch = () => {
    setIsPrincipal(!isPrincipal);
  };

  return (
    <div className="fixed top-14 inset-0 bg-black bg-opacity-40 z-50 flex justify-end overflow-y-auto font-body">
      <div className="w-5/12 p-4 rounded-l-lg shadow-lg relative text-text-g flex flex-col gap-8 max-h-screen overflow-y-auto h-full bg-primary_p">
        {/* title section */}
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl">Add</h1>
          <IoIosClose size={40} onClick={onClose} className="cursor-pointer" />
        </div>
        {/* entity section */}
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            <button
              className={`text-lg px-4 py-1 rounded-full ${
                activeEntity === "school"
                  ? "text-primary_p bg-secondary-lt"
                  : "text-text-g border border-secondary-lt"
              }`}
              onClick={() => handleEntityClick("school")}
            >
              School
            </button>
            <button
              className={`text-lg rounded-full px-4 py-1 ${
                activeEntity === "student"
                  ? "text-primary_p bg-secondary-lt"
                  : "text-text-g border border-secondary-lt"
              }`}
              onClick={() => handleEntityClick("student")}
            >
              Student
            </button>
            <button
              className={`text-lg px-4 py-1 rounded-full ${
                activeEntity === "admin"
                  ? "text-primary_p bg-secondary-lt"
                  : "text-text-g border border-secondary-lt"
              }`}
              onClick={() => handleEntityClick("admin")}
            >
              Admin
            </button>
          </div>
        </div>
        <div className="text-lg">
          {activeEntity === "school" && (
            <div className="flex flex-col gap-8">
              {/* details section */}
              <div className="flex justify-between gap-5">
                <div className="w-1/2">
                  <label className="text-base">School Name</label>
                  <input
                    type="text"
                    placeholder="School Name"
                    className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base">School Code</label>
                  <input
                    type="text"
                    placeholder="ABC-0X"
                    className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                  />
                </div>
              </div>
              <div className="flex gap-20 items-center">
                <p>Grades</p>
                <div className="flex gap-4">
                  <button
                    className={`text-lg px-6 py-1 rounded-full ${
                      activeGrade === "8th"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handleGradeClick("8th")}
                  >
                    8th
                  </button>
                  <button
                    className={`text-lg px-6 py-1 rounded-full ${
                      activeGrade === "9th"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handleGradeClick("9th")}
                  >
                    9th
                  </button>
                  <button
                    className={`text-lg px-6 py-1 rounded-full ${
                      activeGrade === "10th"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handleGradeClick("10th")}
                  >
                    10th
                  </button>
                </div>
              </div>
              <div className="flex gap-20 items-center">
                <p>Payment Plan</p>
                <div className="flex gap-4">
                  <button
                    className={`text-lg px-4 py-1 rounded-full ${
                      activePayment === "1yr"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handlePaymentClick("1yr")}
                  >
                    1 year
                  </button>
                  <button
                    className={`text-lg px-4 py-1 rounded-full ${
                      activePayment === "2yr"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handlePaymentClick("2yr")}
                  >
                    2 year
                  </button>
                  <button
                    className={`text-lg px-4 py-1 rounded-full ${
                      activePayment === "3yr"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handlePaymentClick("3yr")}
                  >
                    3 year
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p>Add Student List</p>
                <AddFile />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-lg">Set Credentials</p>
                <div className="flex gap-5">
                  <div className="w-1/2">
                    <label className="text-base">Student Username</label>
                    <input
                      type="text"
                      placeholder="School Name"
                      className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="text-base">Student Password</label>
                    <input
                      type="password"
                      placeholder="Set Password"
                      className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-1/2">
                    <label className="text-base">Admin Username</label>
                    <input
                      type="text"
                      placeholder="School Name"
                      className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="text-base">Admin Password</label>
                    <input
                      type="password"
                      placeholder="Set Password"
                      className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg">Contact Details</p>
                <div className="flex gap-5">
                  <div className="w-1/2">
                    <label className="text-base">Email Address</label>
                    <input
                      type="email"
                      placeholder="abc@gmail.com"
                      className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="text-base">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Your number"
                      pattern="[0-9]{10}" // For a 10-digit number
                      maxLength={10}
                      className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeEntity === "student" && (
            <div className="flex flex-col gap-10">
              <div className="flex gap-8">
                <div className="w-1/2">
                  <label className="text-base">School Name</label>
                  <input
                    type="text"
                    placeholder="School Name"
                    className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base">School Code</label>
                  <input
                    type="text"
                    placeholder="SCH-03"
                    className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="text-base">Student Name</label>
                <input
                  type="text"
                  placeholder="Student Name"
                  className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Add Student List</p>
                <AddFile />
              </div>
              <div className="flex gap-8">
                <div className="w-1/2">
                  <label className="text-base">Grade</label>
                  <select
                    name=""
                    id=""
                    className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                  >
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="text-base">Section</label>
                  <input
                    type="text"
                    placeholder="Section"
                    className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                  />
                </div>
              </div>
              <div className="flex gap-20 items-center">
                <p>Payment Plan</p>
                <div className="flex gap-4">
                  <button
                    className={`text-lg px-4 py-1 rounded-full ${
                      activePayment === "1yr"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handlePaymentClick("1yr")}
                  >
                    1 year
                  </button>
                  <button
                    className={`text-lg px-4 py-1 rounded-full ${
                      activePayment === "2yr"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handlePaymentClick("2yr")}
                  >
                    2 year
                  </button>
                  <button
                    className={`text-lg px-4 py-1 rounded-full ${
                      activePayment === "3yr"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handlePaymentClick("3yr")}
                  >
                    3 year
                  </button>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-1/2">
                  <label className="text-base">Student Username</label>
                  <input
                    type="text"
                    placeholder="School Name"
                    className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base">Student Password</label>
                  <input
                    type="password"
                    placeholder="Set Password"
                    className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg">Contact Details</p>
                <div className="flex gap-5">
                  <div className="w-1/2">
                    <label className="text-base">Email Address</label>
                    <input
                      type="email"
                      placeholder="abc@gmail.com"
                      className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="text-base">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Your number"
                      pattern="[0-9]{10}" // For a 10-digit number
                      maxLength={10}
                      className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeEntity === "admin" && (
            <div className="flex flex-col gap-5">
              <div className="w-full">
                <label className="text-base">Admin Name</label>
                <input
                  type="password"
                  placeholder="Enter here name"
                  className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                />
              </div>
              <div className="flex gap-20 items-center">
                <div className="flex gap-4">
                  <button
                    className={`text-lg px-4 py-1 rounded-full ${
                      activeSubEntity === "school"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handleSubEntityClick("school")}
                  >
                    School
                  </button>
                  <button
                    className={`text-lg px-4 py-1 rounded-full ${
                      activeSubEntity === "fyntrest"
                        ? "text-primary_p bg-secondary-lt"
                        : "text-text-g border border-secondary-lt"
                    }`}
                    onClick={() => handleSubEntityClick("fyntrest")}
                  >
                    Fyntrest
                  </button>
                </div>
              </div>
              <div className="text-lg">
                {activeSubEntity === "school" && (
                  <div className="flex gap-5 flex-col">
                    <div className="flex gap-5">
                      <div className="w-1/2">
                        <label className="text-base">School Name</label>
                        <input
                          type="password"
                          placeholder="Enter name here"
                          className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="text-base">School Code</label>
                        <input
                          type="password"
                          placeholder="Enter Code"
                          className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                        />
                      </div>
                    </div>
                    <div className="rounded-md">
                      {/* Toggle Switch */}
                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className={`${
                            isPrincipal ? "text-white" : "text-gray-400"
                          }`}
                        >
                          Principal
                        </span>
                        <div
                          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer border transition-all duration-300 ${
                            isPrincipal ? "justify-start" : "justify-end"
                          } border-white`}
                          onClick={toggleSwitch}
                        >
                          <div className="w-6 h-6 bg-secondary-lt rounded-full transition-all duration-300" />
                        </div>
                        <span
                          className={`${
                            !isPrincipal ? "text-white" : "text-gray-400"
                          }`}
                        >
                          Teacher
                        </span>
                      </div>

                      {/* Conditional Content */}
                      {isPrincipal ? (
                        <div className="flex flex-col gap-5">
                          <div className="flex gap-5">
                            <div className="w-1/2">
                              <label className="text-base">
                                Admin Username
                              </label>
                              <input
                                type="text"
                                placeholder="School Name"
                                className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="text-base">
                                Admin Password
                              </label>
                              <input
                                type="password"
                                placeholder="Set Password"
                                className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p>Contact Details</p>
                            <div className="flex gap-5">
                              <div className="w-1/2">
                                <label className="text-base">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  placeholder="abc@gmail.com"
                                  className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                                />
                              </div>
                              <div className="w-1/2">
                                <label className="text-base">
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  placeholder="Your number"
                                  pattern="[0-9]{10}" // For a 10-digit number
                                  maxLength={10}
                                  className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-5">
                          <div className="flex gap-5">
                            <div className="w-1/2">
                              <label className="text-base">
                                Admin Username
                              </label>
                              <input
                                type="text"
                                placeholder="School Name"
                                className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="text-base">
                                Admin Password
                              </label>
                              <input
                                type="password"
                                placeholder="Set Password"
                                className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p>Contact Details</p>
                            <div className="flex gap-5">
                              <div className="w-1/2">
                                <label className="text-base">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  placeholder="abc@gmail.com"
                                  className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                                />
                              </div>
                              <div className="w-1/2">
                                <label className="text-base">
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  placeholder="Your number"
                                  pattern="[0-9]{10}" // For a 10-digit number
                                  maxLength={10}
                                  className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {activeSubEntity === "fyntrest" && (
                  <div className="flex flex-col gap-8">
                    <div className="flex gap-5">
                      <div className="w-1/2">
                        <label className="text-base">Admin Username</label>
                        <input
                          type="text"
                          placeholder="School Name"
                          className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="text-base">Admin Password</label>
                        <input
                          type="password"
                          placeholder="Set Password"
                          className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>Contact Details</p>
                      <div className="flex gap-5">
                        <div className="w-1/2">
                          <label className="text-base">Email Address</label>
                          <input
                            type="email"
                            placeholder="abc@gmail.com"
                            className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="text-base">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="Your number"
                            pattern="[0-9]{10}" // For a 10-digit number
                            maxLength={10}
                            className="p-2 rounded-lg w-full bg-primary-fp outline-none text-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button className="bg-secondary-d px-4 py-2 rounded text-text-d">
            Add
          </button>
        </div>
        <div className="h-40"></div>
      </div>
    </div>
  );
};

export default AddEntityPopUp;
