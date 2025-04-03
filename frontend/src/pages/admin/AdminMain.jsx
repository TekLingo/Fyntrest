import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import Content from './Content';
import Dashboard from './Dashboard';
import Logout from './Logout';
import Settings from './Settings';
import Users from './Users';

const AdminPanel = () => {
	return (
		<div className="flex h-screen">
			{' '}
			{/* Ensure full height */}
			<AdminSidebar /> {/* Sidebar with links */}
			<div className="w-full flex flex-col">
				<AdminNavbar />
				<div className="flex-grow overflow-auto">
					{' '}
					{/* Allow scrolling */}
					<Routes>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/users" element={<Users />} />
						<Route path="/content" element={<Content />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="*" element={<Dashboard />} /> {/* Default route */}
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default AdminPanel;
