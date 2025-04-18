import React, { useState, useEffect } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { HiOutlineCog6Tooth, HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { PiPenNibStraightFill, PiPenNibStraightLight } from "react-icons/pi";
import { RiDashboardFill, RiDashboardLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import LogoImg from "../assets/Images/color-logo.png";
import LogOut from "./LogOut"; // Make sure this path is correct

const TeacherSidebar = ({ setActiveSection }) => {
  const [expanded, setExpanded] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // ✅ toggle

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/school/dashboard")) setActiveMenu("dashboard");
    else if (path.includes("/school/users")) setActiveMenu("users");
    else if (path.includes("/school/content")) setActiveMenu("content");
    else if (path.includes("/school/settings")) setActiveMenu("settings");
    else if (path.includes("/school/logout")) setActiveMenu("logout");
  }, [location.pathname]);

  const handleMenuClick = (menu, path) => {
    setActiveMenu(menu);
    if (setActiveSection) setActiveSection(menu);
    if (path) navigate(path);
  };

  return (
    <div
      className={`h-screen text-white flex flex-col justify-between transition-all duration-300 text-body ${
        expanded ? "w-80" : "w-16"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo & Toggle */}
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

        {/* Sidebar Items */}
        <div className="w-full flex flex-col gap-4 font-body mt-4">
          {/* Dashboard */}
          <div
            onClick={() => handleMenuClick("dashboard", "/school/dashboard")}
            className={`cursor-pointer flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
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
          </div>

          {/* Users */}
          <div
            onClick={() => handleMenuClick("users", "/school/users")}
            className={`cursor-pointer flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
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
            {expanded && <span>Students</span>}
          </div>

          {/* Content (commented) */}
          {/* <div
            onClick={() => handleMenuClick("content", "/school/content")}
            className={`cursor-pointer flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
              activeMenu === "content"
                ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
                : ""
            }`}
          >
            {activeMenu === "content" ? (
              <PiPenNibStraightFill size={30} className="rotate-180" />
            ) : (
              <PiPenNibStraightLight size={30} className="rotate-180" />
            )}
            {expanded && <span>Classwork</span>}
          </div> */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col mb-4 font-body">
        {/* Settings */}
        <div
          onClick={() => handleMenuClick("settings", "/school/settings")}
          className={`cursor-pointer flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
            activeMenu === "settings"
              ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
              : ""
          }`}
        >
          <HiOutlineCog6Tooth size={30} />
          {expanded && <span>Settings</span>}
        </div>

        {/* Logout: Render LogOut component directly */}
        <div
          onClick={() => {
            handleMenuClick(activeMenu);
            setShowLogoutPopup(true); // ✅ trigger popup
          }}
          className={`cursor-pointer flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
            activeMenu === "logout"
              ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
              : ""
          }`}
        >
          <CiLogout size={30} className="rotate-180" />
          {expanded && <span>Logout</span>}
        </div>
        {showLogoutPopup && (
          <LogOut onClose={() => setShowLogoutPopup(false)} />
        )}
      </div>
    </div>
  );
};

export default TeacherSidebar;
