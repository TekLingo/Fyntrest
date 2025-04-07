import React, { useState, useEffect } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { HiOutlineCog6Tooth, HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { PiPenNibStraightFill, PiPenNibStraightLight } from "react-icons/pi";
import { RiDashboardFill, RiDashboardLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import LogoImg from "../assets/Images/color-logo.png";

const AdminSidebar = ({ setActiveSection }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  // Set activeMenu from the current route
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/admin/dashboard")) setActiveMenu("dashboard");
    else if (path.includes("/admin/users")) setActiveMenu("users");
    else if (path.includes("/admin/content")) setActiveMenu("content");
    else if (path.includes("/admin/settings")) setActiveMenu("settings");
    else if (path.includes("/admin/logout")) setActiveMenu("logout");
  }, [location.pathname]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (setActiveSection) setActiveSection(menu);
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
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
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
          </NavLink>

          {/* Users */}
          <NavLink
            to="/admin/users"
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
          </NavLink>

          {/* Content */}
          <NavLink
            to="/admin/content"
            onClick={() => handleMenuClick("content")}
            className={`flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
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
            {expanded && <span>Content</span>}
          </NavLink>
        </div>
      </div>

      {/* Sidebar Bottom Links */}
      <div className="w-full flex flex-col mb-4 font-body">
        {/* Settings */}
        <NavLink
          to="/admin/settings"
          onClick={() => handleMenuClick("settings")}
          className={`flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
            activeMenu === "settings"
              ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
              : ""
          }`}
        >
          <HiOutlineCog6Tooth size={30} />
          {expanded && <span>Settings</span>}
        </NavLink>

        {/* Logout */}
        <NavLink
          to="/admin/logout"
          onClick={() => handleMenuClick("logout")}
          className={`flex items-center p-2 hover:bg-secondary-dt w-full gap-4 ${
            activeMenu === "logout"
              ? "border-r-4 border-secondary-lt bg-secondary-dt font-semibold"
              : ""
          }`}
        >
          <CiLogout size={30} className="rotate-180" />
          {expanded && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
