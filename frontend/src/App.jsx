import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Import all your components
import AboutUsPage from "./pages/AboutUsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import BlogOpenPage from "./pages/BlogOpenPage";
import BlogPage from "./pages/BlogPage";
import ContactUsPage from "./pages/ContactUsPage";
import CoursePage from "./pages/courses/coursePage";
import ModulePage from "./pages/courses/ModulePage";
import NotFound from "./pages/Error/NotFound";
import Unauthorized from "./pages/Error/Unauthorized";
import Home from "./pages/Home";

// Admin components
import AdminCoursePage from "./pages/admin/AdminCoursePage";
import AdminMain from "./pages/admin/AdminMain";
import Dashboard from "./pages/admin/Dashboard";
import EntityDetails from "./pages/admin/EntityDetails";
import ProfilePage from "./pages/admin/ProfilePage";
import QuizPage from "./pages/admin/Quiz";
import ReadyQuizPage from "./pages/admin/ReadyQuizPage";

// Teacher components
import TAdminCoursePage from "./pages/teacher_login/TAdminCoursePage";
import TDashboard from "./pages/teacher_login/TDashboard";
import TeacherPanel from "./pages/teacher_login/TeacherMain";
import TEntityDetails from "./pages/teacher_login/TEntityDetails";
import TProfilePage from "./pages/teacher_login/TProfilePage";
import TQuiz from "./pages/teacher_login/TQuiz";
import TReadyQuizPage from "./pages/teacher_login/TReadyQuizPage";

// Student components
import LoginCoursePage from "./pages/after-login/LoggedCoursesPage";
import LoggedLandingPage from "./pages/after-login/LoggedLandingPage";
import LoggedModulePage from "./pages/after-login/LoggedModulePage";
import LoggedProfileDetailPage from "./pages/after-login/LoggedProfileDetailPage";
import LoggedProfilePage from "./pages/after-login/LoggedProfilePage";
import LoggedVideoPage from "./pages/after-login/LoggedVideoPage";
import Quiz from "./pages/after-login/Quiz";
import Semester from "./pages/after-login/Semester";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/course-overview" element={<CoursePage />} />
          <Route path="/module-overview" element={<ModulePage />} />
          <Route path="/blog-open" element={<BlogOpenPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes - Student */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/logged/home" element={<LoggedLandingPage />} />
            <Route path="/logged/semester" element={<Semester />} />
            <Route
              path="/logged/course/:courseId"
              element={<LoginCoursePage />}
            />
            <Route
              path="/logged/module/:moduleId"
              element={<LoggedModulePage />}
            />
            <Route
              path="/logged/module/:moduleId/video/:videoId"
              element={<LoggedVideoPage />}
            />
            <Route path="/logged/quiz/:videoId" element={<Quiz />} />
            <Route path="/logged/profile" element={<LoggedProfilePage />} />
            <Route
              path="/logged/profile-detail"
              element={<LoggedProfileDetailPage />}
            />
          </Route>

          {/* Protected Routes - Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminMain />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="quiz" element={<QuizPage />} />
              <Route path="entity/:entityType" element={<EntityDetails />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="ready-quiz" element={<ReadyQuizPage />} />
              <Route path="course" element={<AdminCoursePage />} />
            </Route>
          </Route>

          {/* Protected Routes - Teacher */}
          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route path="/teacher/*" element={<TeacherPanel />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TDashboard />} />
              <Route path="quiz" element={<TQuiz />} />
              <Route path="entity/:entityType" element={<TEntityDetails />} />
              <Route path="profile" element={<TProfilePage />} />
              <Route path="ready-quiz" element={<TReadyQuizPage />} />
              <Route path="course" element={<TAdminCoursePage />} />
            </Route>
          </Route>

          {/* Additional Parameterized Routes */}
          <Route path="/courses/:semesterId" element={<CoursePage />} />
          <Route path="/modules/:courseId" element={<ModulePage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
