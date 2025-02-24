import React from 'react';
import {
<<<<<<< HEAD
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import LoginCoursePage from './pages/after-login/LoggedCoursesPage';
import LoggedLandingPage from './pages/after-login/LoggedLandingPage';
import LoggedModulePage from './pages/after-login/LoggedModulePage';
import LoggedProfileDetailPage from './pages/after-login/LoggedProfileDetailPage';
import LoggedProfilePage from './pages/after-login/LoggedProfilePage';
import LoggedVideoPage from './pages/after-login/LoggedVideoPage';
import Quiz from './pages/after-login/Quiz';
import Login from './pages/auth/Login';
import PersonalInfo from './pages/auth/PersonalInfo';
import Register from './pages/auth/Register';
import Verify from './pages/auth/Verify';
import BlogOpenPage from './pages/BlogOpenPage';
import BlogPage from './pages/BlogPage';
import CoursePage from './pages/courses/coursePage';
import ModulePage from './pages/courses/ModulePage';
import Home from './pages/Home';
=======
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
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Content from "./pages/admin/Content";
import Analysis from "./pages/admin/Analysis";
import Main from "./pages/admin/Main";
import Semester from "./pages/after-login/Semester";
>>>>>>> b739e5bc8f36ba7cfcf9f91d2a33abd5144d0b4f

const App = () => {
	// Check for JWT token in localStorage
	const isAuthenticated = !!localStorage.getItem('token');

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
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/blog-open" element={<BlogOpenPage />} />

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

				{/* Admin Routes */}
				<Route path="/admin/dashboard" element={<Dashboard />} />

				{/* Redirect invalid routes */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
};

// Additional guard for registration steps
const RegistrationGuard = ({ children }) => {
	const registrationToken = localStorage.getItem('registrationToken');
	return registrationToken ? children : <Navigate to="/register" replace />;
};

// // Define the Root component to handle the initial redirect
const Root = () => {
	const token = localStorage.getItem('token');
	const userRole = localStorage.getItem('role'); // Get user role from localStorage

	if (!token) {
		return <Navigate to="/home" />;
	}

	if (userRole === 'admin') {
		return <Navigate to="/admin/dashboard" />;
	}

	return <Navigate to="/logged/home" />;
};

export default App;
