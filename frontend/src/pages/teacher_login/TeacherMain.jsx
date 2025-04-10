import React from "react";
import { Route, Routes } from "react-router-dom";
import TeacherNavbar from "../../components/TeacherNavbar";
import TeacherSidebar from "../../components/TeacherSidebar";
import Content from "./TContent";
import Dashboard from "./TDashboard";
import Logout from "./TLogout";
import Settings from "./TSettings";
import Users from "./TUsers";

const TeacherPanel = () => {
  return (
    <div className="flex h-screen">
      {/* Ensure full height */}
      <TeacherSidebar /> {/* Sidebar with links */}
      <div className="w-full flex flex-col">
        <TeacherNavbar />
        <div className="flex-grow overflow-auto">
          {/* Allow scrolling */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/content" element={<Content />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Dashboard />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;
