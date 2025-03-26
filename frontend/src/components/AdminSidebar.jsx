import React, { useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { HiOutlineCog6Tooth, HiUsers, HiOutlineUsers } from "react-icons/hi2";
import { PiPenNibStraightFill, PiPenNibStraightLight } from "react-icons/pi";
import { RiDashboardFill, RiDashboardLine } from "react-icons/ri";
import { VscGraphLine } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import LogoImg from "../assets/Images/color-logo.png";

const AdminSidebar = ({ setActiveSection }) => {
  const [expanded, setExpanded] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setActiveSection(menu);
  };

  return (
    <div
      className={`h-screen text-white flex flex-col justify-between transition-all duration-300 text-body ${
        expanded ? "w-80" : "w-16"
      }`}
    >
      {/* Sidebar Top Section */}
      <div>
        {/* Logo & Toggle Button */}
        <div className="flex items-center justify-between p-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`focus:outline-none ${expanded ? "w-1/3" : "w-full"}`}
          >
            <img src={LogoImg} alt="Logo" className="w-16 h-auto mx-auto" />
          </button>
          {expanded && (
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col text-sm items-center font-body">
                <p>FYNTREST</p>
                <p>Finance Made Easy</p>
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-2 focus:outline-none"
              >
                <BsLayoutSidebar className="text-white" size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Links */}
        <div className="w-full flex flex-col gap-4 font-body mt-4">
          <button
            onClick={() => handleMenuClick("dashboard")}
            className={`flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
              activeMenu === "dashboard"
                ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
                : ""
            }`}
          >
            {activeMenu === "dashboard" ? (
              <RiDashboardFill size={30} />
            ) : (
              <RiDashboardLine size={30} />
            )}
            {expanded && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => handleMenuClick("users")}
            className={`flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
              activeMenu === "users"
                ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
                : ""
            }`}
          >
            {activeMenu === "users" ? (
              <HiUsers size={30} />
            ) : (
              <HiOutlineUsers size={30} />
            )}
            {expanded && <span>Users</span>}
          </button>

          <button
            onClick={() => handleMenuClick("content")}
            className={`flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
              activeMenu === "content"
                ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
                : ""
            }`}
          >
            {activeMenu === "content" ? (
              <PiPenNibStraightFill
                size={30}
                className="transform rotate-180"
              />
            ) : (
              <PiPenNibStraightLight
                size={30}
                className="transform rotate-180"
              />
            )}
            {expanded && <span>Content</span>}
          </button>
        </div>
      </div>

      {/* Sidebar Bottom Link */}
      <div className="w-full flex flex-col mb-4 font-body">
        <button
          onClick={() => handleMenuClick("settings")}
          className={`flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
            activeMenu === "settings"
              ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
              : ""
          }`}
        >
          <HiOutlineCog6Tooth size={30} />
          {expanded && <span>Settings</span>}
        </button>

        <button
          onClick={() => handleMenuClick("logout")}
          className={`flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
            activeMenu === "logout"
              ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
              : ""
          }`}
        >
          <CiLogout size={30} className="transform rotate-180" />
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
