import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginCoursePage from "./pages/after-login/LoggedCoursesPage";
import LoggedLandingPage from "./pages/after-login/LoggedLandingPage";
import LoggedModulePage from "./pages/after-login/LoggedModulePage";
import LoggedVideoPage from "./pages/after-login/LoggedVideoPage";
import Quiz from "./pages/after-login/Quiz";
import Login from "./pages/auth/Login";
import PersonalInfo from "./pages/auth/PersonalInfo";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import CoursePage from "./pages/courses/coursePage";
import ModulePage from "./pages/courses/ModulePage";
import Home from "./pages/Home";
import LoggedProfilePage from "./pages/after-login/LoggedProfilePage";
import LoggedProfileDetailPage from "./pages/after-login/LoggedProfileDetailPage";
import AboutUsPage from "./pages/AboutUsPage";

export default function App() {
  const isAuthenticated = localStorage.getItem("isLoggedIn"); // Simple auth check

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/course/:slug" element={<CoursePage />} />
        <Route path="/module" element={<ModulePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/logged/profile" element={<LoggedProfilePage />} />
        <Route path="/logged/profile-details" element={<LoggedProfileDetailPage />} />
		
        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/logged/home" element={<LoggedLandingPage />} />
          <Route path="/logged/course/:slug" element={<LoginCoursePage />} />
          <Route
            path="/logged/module/:moduleId"
            element={<LoggedModulePage />}
          />
          <Route path="/logged/video/:videoId" element={<LoggedVideoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
