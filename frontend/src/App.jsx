import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Router components

import Home from './pages/Home';
import Signup from './pages/Signup';
import Money from './pages/courses/Money';

export default function App() {
	return (
		<Router>
			<Routes>
				{/* Define routes for different pages */}
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/course/money" element={<Money />} />
			</Routes>
		</Router>
	);
}
