import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";

const Users = () => {
  return (
    <div className="flex text-text-g">
      <AdminSidebar/>
      <div className="w-full flex flex-col">
        <AdminNavbar />
        Users
      </div>
    </div>
  );
};

export default Users;
