require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config.json');
const upload = require('./multer');

// Middleware
const { authenticateToken, checkRole } = require('./utilities');

// Models
const TempUser = require('./models/temp-user.model');
const User = require('./models/user.model');
const School = require('./models/school.model');
const Class = require('./models/class.model');
const Course = require('./models/course.model');

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

		const otp = Math.floor(100000 + Math.random() * 900000).toString();
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
		// Rename "class" to "userClass" during destructuring:
		const {
			token,
			firstName,
			lastName,
			gender,
			password,
			role,
			school,
			class: userClass,
		} = req.body;
		const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		if (await User.findOne({ email })) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			email,
			password: hashedPassword,
			firstName,
			lastName,
			gender,
			role: role,
			school,
			class: userClass, // use the renamed variable here
		});

		await user.save();
		const authToken = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);
		res.json({ token: authToken });
	} catch (error) {
		console.error('Complete Registration Error:', error);
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
			{ userId: user._id, role: user.role },
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

// Update User API
app.put('/api/update-user', authenticateToken, async (req, res) => {
	try {
		// Assuming `authenticateToken` middleware sets req.user.userId
		const { userId } = req.user;
		const { firstName, lastName, gender, school, schoolCode, grade } = req.body;

		// Update the user document and return the updated document
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ firstName, lastName, gender, school, schoolCode, grade },
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({ user: updatedUser, message: 'User updated successfully' });
	} catch (error) {
		console.error('Error updating user:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

// Delete User
app.delete('/api/delete-user', authenticateToken, async (req, res) => {
	try {
		const { userId } = req.user;
		const deletedUser = await User.findByIdAndDelete(userId);

		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({ message: 'User account deleted successfully' });
	} catch (error) {
		console.error('Error deleting user:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

// --------------------------
// Courses Routes
// --------------------------

// Upload course video
app.post('/api/upload-course-video', upload.single('video'), (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No video file uploaded' });
		}

		const videoUrl = `${req.protocol}://${req.get(
			'host'
		)}/uploads/course-videos/${req.file.filename}`;
		res.status(200).json({ message: 'Video uploaded successfully', videoUrl });
	} catch (error) {
		console.error('Error uploading video:', error);
		res
			.status(500)
			.json({ message: 'Error uploading video', error: error.message });
	}
});

// Add a course
app.post(
	'/api/add-course',
	authenticateToken,
	checkRole('Admin'), // Restrict to Admins
	async (req, res) => {
		try {
			const { title, description, module, semester, videoUrl } = req.body;
			const user = req.user;

			// Validate required fields
			if (!title || !description || !module || !semester || !videoUrl) {
				return res.status(400).json({ message: 'All fields are required' });
			}

			// Ensure userId exists
			if (!user || !user.userId) {
				return res
					.status(401)
					.json({ message: 'Unauthorized: No user ID found' });
			}

			// Convert userId string to ObjectId
			const newCourse = new Course({
				title,
				description,
				videoUrl,
				module,
				semester,
				createdBy: new mongoose.Types.ObjectId(user.userId),
			});

			const savedCourse = await newCourse.save();
			res
				.status(201)
				.json({ message: 'Course created successfully', course: savedCourse });
		} catch (error) {
			console.error('Error creating course:', error);
			res
				.status(500)
				.json({ message: 'Error creating course', error: error.message });
		}
	}
);

// Update a course
app.put('/api/update-course/:courseId', authenticateToken, async (req, res) => {
	try {
		const { title, description, videoUrl, module, semester } = req.body;
		const courseId = req.params.courseId;

		if (!title || !description || !videoUrl || !module || !semester) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({ message: 'Course not found' });
		}

		// Check if user is Admin or creator
		if (req.user.role !== 'Admin' && !course.createdBy.equals(req.user._id)) {
			return res
				.status(403)
				.json({ message: 'Unauthorized to update this course' });
		}

		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{ title, description, videoUrl, module, semester, updatedAt: Date.now() },
			{ new: true }
		);

		res
			.status(200)
			.json({ message: 'Course updated successfully', course: updatedCourse });
	} catch (error) {
		console.error('Error updating course:', error);
		res
			.status(500)
			.json({ message: 'Error updating course', error: error.message });
	}
});

// Delete a course
app.delete(
	'/api/delete-course/:courseId',
	authenticateToken,
	async (req, res) => {
		// Removed checkRole('Admin') middleware
		try {
			const courseId = req.params.courseId;
			const course = await Course.findById(courseId);

			if (!course) {
				return res.status(404).json({ message: 'Course not found' });
			}

			// Allow Admins or creators to delete
			if (req.user.role !== 'Admin' && !course.createdBy.equals(req.user._id)) {
				return res
					.status(403)
					.json({ message: 'Unauthorized to delete this course' });
			}

			await Course.findByIdAndDelete(courseId);
			res.status(200).json({ message: 'Course deleted successfully' });
		} catch (error) {
			console.error('Error deleting course:', error);
			res
				.status(500)
				.json({ message: 'Error deleting course', error: error.message });
		}
	}
);

// Get course details
app.get('/api/get-course/:courseId', async (req, res) => {
	try {
		const { courseId } = req.params;

		// Validate if courseId is a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(courseId)) {
			return res.status(400).json({ message: 'Invalid Course ID' });
		}

		const course = await Course.findById(courseId)
			.populate('enrolledStudents.userId', 'firstName lastName')
			.select('-__v'); // Exclude version key

		if (!course) {
			return res.status(404).json({ message: 'Course not found' });
		}

		res.status(200).json(course);
	} catch (error) {
		console.error('Error fetching course:', error);
		res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });
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
