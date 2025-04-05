import React from 'react';
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AboutUsPage from './pages/AboutUsPage';
import AdminMain from './pages/admin/AdminMain';
import LoginCoursePage from './pages/after-login/LoggedCoursesPage';
import LoggedLandingPage from './pages/after-login/LoggedLandingPage';
import LoggedModulePage from './pages/after-login/LoggedModulePage';
import LoggedProfileDetailPage from './pages/after-login/LoggedProfileDetailPage';
import LoggedProfilePage from './pages/after-login/LoggedProfilePage';
import LoggedVideoPage from './pages/after-login/LoggedVideoPage';
import Quiz from './pages/after-login/Quiz';
import Semester from './pages/after-login/Semester';
import Login from './pages/auth/Login';
import PersonalInfo from './pages/auth/PersonalInfo';
import Register from './pages/auth/Register';
import Verify from './pages/auth/Verify';
import BlogOpenPage from './pages/BlogOpenPage';
import BlogPage from './pages/BlogPage';
import ContactUsPage from './pages/ContactUsPage';
import CoursePage from './pages/courses/coursePage';
import ModulePage from './pages/courses/ModulePage';
import BadGateway from './pages/Error/BadGateway';
import BadRequest from './pages/Error/BadRequest';
import Forbidden from './pages/Error/Forbidden';
import GatewayTimeout from './pages/Error/GatewayTimeout';
import InternalServerError from './pages/Error/InternalServerError';
import NotFound from './pages/Error/NotFound'; // 404 page component
import RequestTimeout from './pages/Error/RequestTimeout';
import ServiceUnavailable from './pages/Error/ServiceUnavailable';
import Unauthorized from './pages/Error/Unauthorized';
import Home from './pages/Home';
import QuizPage from './pages/admin/Quiz';

// Role-Based Access Control (RBAC) Wrapper
import PropTypes from 'prop-types';
import AdminCoursePage from './pages/admin/AdminCoursePage';
import ReadyQuizPage from './pages/admin/ReadyQuizPage';

const RoleBasedRoute = ({ allowedRoles, children }) => {
	const userRole = localStorage.getItem('role');
	return allowedRoles.includes(userRole) ? (
		children
	) : (
		<Navigate to="/" replace />
	);
};

RoleBasedRoute.propTypes = {
	allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
	children: PropTypes.node.isRequired,
};

const App = () => {
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
				<Route path="/about" element={<AboutUsPage />} />
				<Route path="admin/quiz" element={<QuizPage />} />
				<Route path="admin/ready-quiz" element={<ReadyQuizPage />} />
				<Route path="admin/course" element={<AdminCoursePage/>} />
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/contact" element={<ContactUsPage />} />
				<Route path="/course-overview" element={<CoursePage />} />{' '}
				{/* Renamed */}
				<Route path="/module-overview" element={<ModulePage />} />{' '}
				{/* Renamed */}
				<Route path="/logged/quiz/:videoId" element={<Quiz />} />
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/blog-open" element={<BlogOpenPage />} />
				{/* Protected Routes */}
				<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
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
					<Route path="/logged/profile" element={<LoggedProfilePage />} />
					<Route
						path="/logged/profile-detail"
						element={<LoggedProfileDetailPage />}
					/>
				</Route>
				{/* Admin Routes */}
				<Route
					path="/admin/*"
					element={
						<RoleBasedRoute allowedRoles={['admin']}>
							<AdminMain />
						</RoleBasedRoute>
					}
				/>
				{/* Additional Parameterized Routes */}
				<Route path="/courses/:semesterId" element={<CoursePage />} />
				<Route path="/modules/:courseId" element={<ModulePage />} />
				{/* Error Pages */}
				<Route path="/error/400" element={<BadRequest />} />
				<Route path="/error/401" element={<Unauthorized />} />
				<Route path="/error/403" element={<Forbidden />} />
				<Route path="/error/404" element={<NotFound />} />
				<Route path="/error/500" element={<InternalServerError />} />
				<Route path="/error/502" element={<BadGateway />} />
				<Route path="/error/503" element={<ServiceUnavailable />} />
				<Route path="/error/504" element={<GatewayTimeout />} />
				<Route path="/error/408" element={<RequestTimeout />} />
				{/* 404 Route */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

const RegistrationGuard = ({ children }) => {
	const registrationToken = localStorage.getItem('registrationToken');
	return registrationToken ? children : <Navigate to="/register" replace />;
};

RegistrationGuard.propTypes = {
	children: PropTypes.node.isRequired,
};

// Root Component with Enhanced Logic
const Root = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const token = localStorage.getItem('token');
	const userRole = localStorage.getItem('role');

	React.useEffect(() => {
		setIsLoading(false); // Replace with actual validation if needed
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (!token) return <Navigate to="/home" replace />;
	if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
	return <Navigate to="/logged/home" replace />;
};

export default App;
