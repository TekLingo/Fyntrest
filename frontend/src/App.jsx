import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Router components

import Home from './pages/Home';
import Signup from './pages/Signup';

export default function App() {
	return (
		<Router>
			<Routes>
				{/* Define routes for different pages */}
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</Router>
	);
}
