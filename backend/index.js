require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

// Middleware
const { authenticateToken, checkRole } = require('./utilities');

// Models
const TempUser = require('./models/temp-user.model');
const User = require('./models/user.model');
const School = require('./models/school.model');
const Class = require('./models/class.model');

// Database Connection
mongoose.connect(config.connectionString);

// Express Setup
const app = express();
app.use(express.json());
// In index.js replace cors middleware with:
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

// --------------------------
// Authentication Routes
// --------------------------
app.post('/api/auth/register', async (req, res) => {
	try {
		const { email } = req.body;

		if (await User.findOne({ email })) {
			return res.status(400).json({ message: 'Email already registered' });
		}

		const otp = Math.floor(1000 + Math.random() * 9000).toString();
		await TempUser.findOneAndDelete({ email });
		await new TempUser({ email, otp }).save();

		console.log(`OTP for ${email}: ${otp}`);
		res.json({ message: 'OTP sent to email' });
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
});

app.post('/api/auth/verify-otp', async (req, res) => {
	try {
		const { email, otp } = req.body;
		const tempUser = await TempUser.findOne({ email });

		console.log(req.body);

		if (!tempUser || tempUser.otp !== otp) {
			return res.status(400).json({ message: 'Invalid OTP' });
		}

		const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '10m',
		});
		await TempUser.findByIdAndDelete(tempUser._id);
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
});

app.post('/api/auth/complete-registration', async (req, res) => {
	try {
		const { token, firstName, lastName, gender, password } = req.body;
		const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		if (await User.findOne({ email })) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const user = new User({
			email,
			password,
			firstName,
			lastName,
			gender,
			role: 'Student',
		});

		await user.save();
		const authToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);
		res.json({ token: authToken });
	} catch (error) {
		res.status(400).json({ message: 'Invalid or expired token' });
	}
});

app.post('/api/auth/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		console.log('Received login request:', req.body);

		// Validate request body
		if (!email || !password) {
			console.log('Missing email or password');
			return res.status(400).json({
				message: 'Email and password are required',
				success: false,
			});
		}

		// Find user and log details
		const user = await User.findOne({ email });
		console.log('User found:', user ? 'Yes' : 'No');

		if (!user) {
			console.log(`No user found with email: ${email}`);
			return res.status(400).json({
				message: 'Invalid credentials',
				success: false,
			});
		}

		// Verify password
		const isMatch = await bcrypt.compare(password, user.password);
		console.log('Password match:', isMatch);

		if (!isMatch) {
			return res.status(400).json({
				message: 'Invalid credentials',
				success: false,
			});
		}

		user.lastLogin = Date.now();
		await user.save();

		const token = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);

		res.json({
			token,
			message: 'Login successful',
			success: true,
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({
			message: 'Server error',
			error: error.message,
			success: false,
		});
	}
});

// Get User API
app.get('/api/get-user', authenticateToken, async (req, res) => {
	try {
		const { userId } = req.user;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		return res.json({
			user,
			message: 'User fetched successfully',
		});
	} catch (error) {
		console.error('Error fetching user:', error);
		res.status(500).json({ message: 'Server error' });
	}
});


// --------------------------
// School Routes
// --------------------------
app.post(
	'/api/schools',
	authenticateToken,
	checkRole('Admin'),
	
	async (req, res) => {
		try {
			const school = new School({
				...req.body,
				admin: req.user.userId,
			});
			await school.save();
			res.status(201).json(school);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
);

app.get('/api/schools', async (req, res) => {
	try {
		const schools = await School.find().populate(
			'admin',
			'firstName lastName email'
		);
		res.json(schools);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
});

app.get('/api/schools/:id', async (req, res) => {
	try {
		const school = await School.findById(req.params.id)
			.populate('admin', 'firstName lastName email')
			.populate('classes');
		school
			? res.json(school)
			: res.status(404).json({ message: 'School not found' });
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
});

app.put(
	'/api/schools/:id',
	authenticateToken,
	checkRole('Admin'),
	async (req, res) => {
		try {
			const school = await School.findByIdAndUpdate(
				req.params.id,
				{ ...req.body, updatedAt: Date.now() },
				{ new: true }
			);
			res.json(school);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
);

app.delete(
	'/api/schools/:id',
	authenticateToken,
	checkRole('Admin'),
	async (req, res) => {
		try {
			await School.findByIdAndDelete(req.params.id);
			res.json({ message: 'School deleted successfully' });
		} catch (error) {
			res.status(500).json({ message: 'Server error' });
		}
	}
);

// --------------------------
// Class Routes
// --------------------------
app.post(
	'/api/classes',
	authenticateToken,
	checkRole(['Admin', 'Teacher']),
	async (req, res) => {
		try {
			const newClass = new Class({
				...req.body,
				teacher:
					req.user.role === 'Teacher' ? req.user.userId : req.body.teacher,
			});
			await newClass.save();
			res.status(201).json(newClass);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
);

app.get('/api/schools/:schoolId/api/classes', async (req, res) => {
	try {
		const classes = await Class.find({ school: req.params.schoolId })
			.populate('teacher', 'firstName lastName')
			.populate('students', 'firstName lastName email');
		res.json(classes);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
});

app.get('/api/classes/:id', async (req, res) => {
	try {
		const classObj = await Class.findById(req.params.id)
			.populate('teacher', 'firstName lastName email')
			.populate('students', 'firstName lastName email')
			.populate('school', 'name');
		res.json(classObj);
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
});

app.put(
	'/api/classes/:classId/students',
	authenticateToken,
	checkRole(['Admin', 'Teacher']),
	async (req, res) => {
		try {
			const classObj = await Class.findByIdAndUpdate(
				req.params.classId,
				{ $addToSet: { students: req.body.studentId } },
				{ new: true }
			);
			res.json(classObj);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
);

app.delete(
	'/api/classes/:classId/students/:studentId',
	authenticateToken,
	checkRole(['Admin', 'Teacher']),
	async (req, res) => {
		try {
			const classObj = await Class.findByIdAndUpdate(
				req.params.classId,
				{ $pull: { students: req.params.studentId } },
				{ new: true }
			);
			res.json(classObj);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
);

app.put(
	'/api/classes/:classId/teacher',
	authenticateToken,
	checkRole('Admin'),
	async (req, res) => {
		try {
			const classObj = await Class.findByIdAndUpdate(
				req.params.classId,
				{ teacher: req.body.teacherId },
				{ new: true }
			);
			res.json(classObj);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
);

// --------------------------
// Server Setup
// --------------------------
// Start the server on port 8000
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// Export the app for testing or further use
module.exports = app;
