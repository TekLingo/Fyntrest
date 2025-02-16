import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginCoursePage from "./pages/after-login/LoggedCoursesPage";
import LoggedLandingPage from "./pages/after-login/LoggedLandingPage";
import LoggedModulePage from "./pages/after-login/LoggedModulePage";
import LoggedProfileDetailPage from "./pages/after-login/LoggedProfileDetailPage";
import LoggedProfilePage from "./pages/after-login/LoggedProfilePage";
import LoggedVideoPage from "./pages/after-login/LoggedVideoPage";
import Quiz from "./pages/after-login/Quiz";
import Login from "./pages/auth/Login";
import PersonalInfo from "./pages/auth/PersonalInfo";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import CoursePage from "./pages/courses/coursePage";
import ModulePage from "./pages/courses/ModulePage";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import BlogOpenPage from "./pages/BlogOpenPage";

const App = () => {
  // Check for JWT token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

	return (
		<Router>
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<Root />} />
				<Route path="/home" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/verify" element={<Verify />} />
				<Route
					path="/personal-info"
					element={
						<RegistrationGuard>
							<PersonalInfo />
						</RegistrationGuard>
					}
				/>
				<Route path="/course" element={<CoursePage />} />
				<Route path="/module" element={<ModulePage />} />
				<Route path="/quiz" element={<Quiz />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/logged/home" element={<LoggedLandingPage />} />
          <Route
            path="/logged/course/:courseId"
            element={<LoginCoursePage />}
          />
          <Route
            path="/logged/module/:moduleId"
            element={<LoggedModulePage />}
          />
          <Route path="/logged/video/:videoId" element={<LoggedVideoPage />} />
          <Route path="/logged/profile" element={<LoggedProfilePage />} />
          <Route
            path="/logged/profile-detail"
            element={<LoggedProfileDetailPage />}
          />
        </Route>

        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// Additional guard for registration steps
const RegistrationGuard = ({ children }) => {
  const registrationToken = localStorage.getItem("registrationToken");
  return registrationToken ? children : <Navigate to="/register" replace />;
};

// // Define the Root component to handle the initial redirect
const Root = () => {
  // Check if token exists is localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/logged/home" />
  ) : (
    <Navigate to="/home" />
  );
};

export default App;
