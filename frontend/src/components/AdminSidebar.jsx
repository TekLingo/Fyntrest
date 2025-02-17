import React from "react";
import { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { TfiInkPen } from "react-icons/tfi";
import { RiDashboardFill } from "react-icons/ri";
import { FiChevronLeft } from "react-icons/fi";
import LogoImg from "../assets/Images/color-logo.png";

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`h-screen bg-primary-b text-white overflow-hidden gap-10 flex flex-col transition-all duration-300 text-body ${
        expanded ? "w-14" : "w-72"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="p-2 focus:outline-none w-full"
      >
        <div className="overflow-hidden flex gap-4 items-center justify-between">
          <img src={LogoImg} alt="Logo" className="w-14 h-auto" />
          {!expanded && (
            <div className="flex font-body gap-2 w-full justify-between items-center">
              <div className="flex flex-col">
                <p className="text-sm">FYNTREST</p>
                <p className="text-sm">Finance Made Easy</p>
              </div>
              <FiChevronLeft className="text-white w-6 h-auto" />
            </div>
          )}
        </div>
      </button>
      <RiDashboardFill
        size={20}
        className={`${expanded ? "place-self-center" : "w-72 hidden"}`}
      />
      <FaUsers
        size={20}
        className={`${expanded ? "place-self-center" : "w-72 hidden"}`}
      />
      <TfiInkPen
        size={20}
        className={`${expanded ? "place-self-center" : "w-72 hidden"}`}
      />
      {!expanded && (
        <div className="w-full flex flex-col gap-4">
          <a
            href="#"
            className="flex items-center p-2 hover:bg-secondary-dt w-full gap-4 hover:border-r-4 hover:border-secondary-lt"
          >
            <RiDashboardFill size={30} />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-secondary-dt rounded w-full gap-4"
          >
            <FaUsers size={30} />
            <span>Users</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-secondary-dt rounded w-full gap-4"
          >
            <TfiInkPen size={30} />
            <span>Content</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
