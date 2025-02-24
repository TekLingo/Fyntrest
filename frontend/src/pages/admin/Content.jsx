import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";

const Content = () => {
  return (
    <div className="flex text-text-g">
      <AdminSidebar />
      <div className="w-full flex flex-col">
        <AdminNavbar />
        Content
      </div>
    </div>
  );
};

export default Content;
