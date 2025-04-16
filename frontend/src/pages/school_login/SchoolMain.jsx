import React from "react";
import { Route, Routes } from "react-router-dom";
import SchoolNavbar from "../../components/SchoolNavbar";
import SchoolSidebar from "../../components/SchoolSidebar";
import Content from "./SContent";
import Dashboard from "./SDashboard";
import Logout from "./SLogout";
import Settings from "./SSettings";
import Users from "./SUsers";
import SProfilePage from "./SProfilePage";
import SEntityDetails from "./SEntityDetails";
import SReadyQuizPage from "./SReadyQuizPage";
import SAdminCoursePage from "./SAdminCoursePage";
import SQuiz from "./SQuiz";

const SchoolPanel = () => {
  return (
    <div className="flex h-screen">
      {/* Ensure full height */}
      <SchoolSidebar /> {/* Sidebar with links */}
      <div className="w-full flex flex-col">
        <SchoolNavbar />
        <div className="flex-grow overflow-auto">
          {/* Allow scrolling */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/content" element={<Content />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/quiz" element={<SQuiz />} />
            <Route path="/entity/:entityType" element={<SEntityDetails />} />
            <Route path="/profile" element={<SProfilePage />} />
            <Route path="/ready-quiz" element={<SReadyQuizPage />} />
            <Route path="/course" element={<SAdminCoursePage />} />
            <Route path="*" element={<Dashboard />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SchoolPanel;
