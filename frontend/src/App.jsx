import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginCoursePage from './pages/after-login/LoggedCoursesPage';
import LoggedModulePage from './pages/after-login/LoggedModulePage';
import LoggedVideoPage from './pages/after-login/LoggedVideoPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage, { default as CoursePage } from './pages/courses/coursePage';
import ModulePage from './pages/courses/ModulePage';
import Home from './pages/Home';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/course/:slug" element={<CoursePage />} />
				<Route path="/home" element={<LandingPage />} />
				<Route path="/module" element={<ModulePage />} />
				<Route path="/logged/course" element={<LoginCoursePage />} />
				<Route path="/logged/module" element={<LoggedModulePage />} />
				<Route path="/logged/video" element={<LoggedVideoPage />} />
			</Routes>
		</Router>
	);
}
