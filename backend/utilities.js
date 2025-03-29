const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Authentication required' });
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid or expired token' });
		}
		req.user = user;
		next();
	});
};

// Middleware to check if userId in route matches authenticated user
const checkUserId = (req, res, next) => {
	const { userId } = req.params; // Extract userId from route
	if (req.user.userId !== userId) {
		return res.status(403).json({ message: 'Unauthorized - User ID mismatch' });
	}
	next();
};

const checkRole = (roles) => {
	return (req, res, next) => {
		if (!req.user || !req.user.role) {
			return res
				.status(403)
				.json({ message: 'Unauthorized - No role assigned' });
		}
		if (typeof roles === 'string') roles = [roles];
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ message: 'Unauthorized - Role mismatch' });
		}
		next();
	};
};

module.exports = {
	authenticateToken,
	checkUserId, // New export
	checkRole,
};
