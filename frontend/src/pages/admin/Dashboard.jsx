import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

const Dashboard = () => {
  return (
    <div className="flex text-text-g">
      <AdminSidebar />
      <AdminNavbar />
      <div className="flex-1 p-4">Dashboard Content</div>
    </div>
  );
};

export default Dashboard;
