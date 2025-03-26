import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Content from "./Content";
import Settings from "./Settings";
import Logout from "./Logout";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // Default to Dashboard

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <AdminSidebar setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="w-full flex flex-col h-screen">
        <AdminNavbar />
        <div className="flex-grow flex h-full">
          {/* Removed overflow-auto */}
          {activeSection === "dashboard" && <Dashboard />}
          {activeSection === "users" && <Users />}
          {activeSection === "content" && <Content />}
          {activeSection === "settings" && <Settings />}
          {activeSection === "logout" && <Logout />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
