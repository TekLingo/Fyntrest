import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/after-login/LandingPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import CoursePage from './pages/courses/CoursePage';
import LoginCoursePage from './pages/courses/LoginCoursePage';
import Home from './pages/Home';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/course/:slug" element={<CoursePage />} />
				<Route path="/Home" element={<LandingPage />} />
				<Route path="/course/loginCourse" element={<LoginCoursePage />} />
			</Routes>
		</Router>
	);
}
