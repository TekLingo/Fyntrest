import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
	const { isAuthenticated, hasRole, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated()) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (allowedRoles && !allowedRoles.some(role => hasRole(role))) {
		return <Navigate to="/unauthorized" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
