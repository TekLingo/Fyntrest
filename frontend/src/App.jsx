import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Router components

import Home from './pages/Home';
import Signup from './pages/Signup';
import Journey from './pages/after-login/Journey';
import LandingPage from './pages/after-login/LandingPage';
import CoursePage from './pages/courses/CoursePage';
import Needs from './pages/courses/Needs';
import VideoPage from './pages/courses/VideoPage';

export default function App() {
	return (
		<Router>
			<Routes>
				{/* Define routes for different pages */}
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				{/* Dynamic route for course page */}
				<Route path="/course/:slug" element={<CoursePage />} />
			</Routes>
		</Router>
	);
}
