import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Router components

// import Journey from "./components/Cards/Journey";
import LandingPage from './pages/after-login/LandingPage';
import CoursePage from './pages/courses/CoursePage';
// import Needs from "./pages/courses/Needs";
// import VideoPage from "./pages/courses/VideoPage";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Needs from './pages/courses/Needs';

export default function App() {
	return (
		<Router>
			<Routes>
				{/* Define routes for different pages */}
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				{/* Dynamic route for course page */}
				<Route path="/course/:slug" element={<CoursePage />} />
				<Route path="/Home" element={<LandingPage />} />
				<Route path="/course/:slug" element={<CoursePage />} />
			</Routes>
		</Router>
	);
}
