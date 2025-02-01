import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
	default as CoursePage,
	default as LoginCoursePage,
} from './pages/after-login/CoursesPage';
import LandingPage from './pages/after-login/LandingPage';
import LoggedModulePage from './pages/after-login/LoggedModulePage';
import LoggedVideoPage from './pages/after-login/LoggedVideoPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
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
				<Route path="/login-course" element={<LoginCoursePage />} />
				<Route path="/logged/module" element={<LoggedModulePage />} />
				<Route path="/logged/video" element={<LoggedVideoPage />} />
			</Routes>
		</Router>
	);
}
