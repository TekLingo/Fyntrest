require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config.json');
const upload = require('./multer');
const fs = require('fs');
const path = require('path');

// Middleware
const { authenticateToken, checkRole } = require('./utilities');

// Models
const TempUser = require('./models/temp-user.model');
const User = require('./models/user.model');
const School = require('./models/school.model');
const Course = require('./models/course.model');
const Semester = require('./models/semester.model');
const Module = require('./models/module.model');
const Video = require('./models/video.model');
const Enrollment = require('./models/enrollment.model');

// Database Connection
mongoose.connect(config.connectionString);

// Express Setup
const app = express();
app.use(express.json());
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Function to check if the selected image exists in the assets folder
const isValidImage = (imageName) => {
	const assetsPath = path.join(__dirname, 'assets'); // Adjust as needed
	const imageFiles = fs.readdirSync(assetsPath);
	return imageFiles.includes(imageName);
};

// Get Available Images for Selection
app.get(
	'/available-images',
	authenticateToken,
	checkRole('admin'),
	(req, res) => {
		try {
			const assetsPath = path.join(__dirname, 'assets'); // Adjust as needed
			const imageFiles = fs.readdirSync(assetsPath);

			// Get base URL dynamically (replace with actual domain in production)
			const baseUrl = `${req.protocol}://${req.get('host')}`;

			res.status(200).json({
				images: imageFiles.map((img) => ({
					name: img,
					url: `${baseUrl}/assets/${img}`,
				})),
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Error fetching images', error: error.message });
		}
	}
);

// --------------------------
// Authentication Routes
// --------------------------
app.post('/register', async (req, res) => {
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

app.post('/verify-otp', async (req, res) => {
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

app.post('/complete-registration', async (req, res) => {
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

app.post('/login', async (req, res) => {
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

// Get User
app.get('/get-user', authenticateToken, async (req, res) => {
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

// Update User
app.put('/update-user', authenticateToken, async (req, res) => {
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
app.delete('/delete-user', authenticateToken, async (req, res) => {
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
// Video Upload
// --------------------------
app.post('/upload-video', upload.single('video'), (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No video file uploaded' });
		}

		const videoUrl = `${req.protocol}://${req.get(
			'host'
		)}/uploads/course-videos/${req.file.filename}`;
		res.status(200).json({ message: 'Video uploaded successfully', videoUrl });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error uploading video', error: error.message });
	}
});

// --------------------------
// Semester Routes
// --------------------------

// Get all semesters
app.get('/get-semesters', async (req, res) => {
	try {
		const semesters = await Semester.find().populate('courses', 'title');

		if (!semesters || semesters.length === 0) {
			return res.status(404).json({ message: 'No semesters found' });
		}
		res.status(200).json(semesters);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching semesters', error: error.message });
	}
});

// Add a semester
app.post(
	'/add-semester',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { name } = req.body;
			if (!name) {
				return res.status(400).json({ message: 'Semester name is required' });
			}

			const newSemester = new Semester({ name });
			const savedSemester = await newSemester.save();
			res.status(201).json({
				message: 'Semester added successfully',
				semester: savedSemester,
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Error adding semester', error: error.message });
		}
	}
);

// Delete a Semester
app.delete(
	'/delete-semester/:semesterId',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const semesterId = req.params.semesterId;
			const semester = await Semester.findById(semesterId);
			if (!semester)
				return res.status(404).json({ message: 'Semester not found' });

			// Find all courses associated with the semester
			const courses = await Course.find({ semester: semesterId });

			for (const course of courses) {
				// For each course, find its modules
				const modules = await Module.find({ _id: { $in: course.modules } });
				for (const module of modules) {
					// Delete all videos in the module
					await Video.deleteMany({ _id: { $in: module.videos } });
					// Delete the module itself
					await Module.findByIdAndDelete(module._id);
				}
				// Delete the course
				await Course.findByIdAndDelete(course._id);
			}

			// Finally, delete the semester
			await Semester.findByIdAndDelete(semesterId);

			res.status(200).json({
				message:
					'Semester and all its courses, modules, and videos deleted successfully',
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Error deleting semester', error: error.message });
		}
	}
);

// --------------------------
// Course Routes
// --------------------------

// Add a course
app.post(
	'/add-course',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { title, description, semesterId, image } = req.body;
			const userId = req.user.userId;

			if (!title || !description || !semesterId || !image) {
				return res.status(400).json({ message: 'All fields are required' });
			}

			if (!isValidImage(image)) {
				return res.status(400).json({ message: 'Invalid image selection' });
			}

			const baseUrl = `${req.protocol}://${req.get('host')}`; // Get dynamic base URL
			const imageUrl = `${baseUrl}/assets/${image}`; // Generate full image URL

			const newCourse = new Course({
				title,
				description,
				image: imageUrl,
				semester: semesterId,
				createdBy: new mongoose.Types.ObjectId(userId),
			});

			const savedCourse = await newCourse.save();

			// Add course to semester
			await Semester.findByIdAndUpdate(semesterId, {
				$push: { courses: savedCourse._id },
			});

			res
				.status(201)
				.json({ message: 'Course added successfully', course: savedCourse });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Error adding course', error: error.message });
		}
	}
);

// Get course by ID
app.get('/courses/:courseId', async (req, res) => {
	try {
		const course = await Course.findById(req.params.courseId).populate({
			path: 'modules',
			populate: { path: 'videos', select: 'title url' }, // Populate videos within modules
		});

		if (!course) {
			return res.status(404).json({ message: 'Course not found' });
		}

		res.status(200).json(course);
	} catch (error) {
		console.error('Error fetching course:', error);
		res
			.status(500)
			.json({ message: 'Error fetching course', error: error.message });
	}
});

// Get courses for a semester
app.get('/courses/:semesterId', async (req, res) => {
	try {
		const courses = await Course.find({
			semester: req.params.semesterId,
		}).populate('modules', 'title');
		res.status(200).json(courses);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching courses', error: error.message });
	}
});

// Get all courses
app.get('/courses', authenticateToken, async (req, res) => {
	try {
		const courses = await Course.find({})
			.populate('modules', 'title description') // Populate module details
			.select('-__v'); // Exclude version key

		res.status(200).json({
			success: true,
			message: 'Courses fetched successfully',
			data: courses,
		});
	} catch (error) {
		console.error('Error fetching courses:', error);
		res.status(500).json({
			success: false,
			message: 'Error fetching courses',
			error: error.message,
		});
	}
});

// Update a course
app.put('/update-course/:courseId', authenticateToken, async (req, res) => {
	try {
		const { title, description } = req.body;
		const courseId = req.params.courseId;

		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: 'Course not found',
			});
		}

		// Only admins or the creator can update
		if (
			req.user.role !== 'admin' &&
			!course.createdBy.equals(req.user.userId)
		) {
			return res.status(403).json({
				success: false,
				message: 'Unauthorized to update this course',
			});
		}

		course.title = title || course.title;
		course.description = description || course.description;
		await course.save();

		res.status(200).json({
			success: true,
			message: 'Course updated successfully',
			data: course,
		});
	} catch (error) {
		console.error('Error updating course:', error);
		res.status(500).json({
			success: false,
			message: 'Error updating course',
			error: error.message,
		});
	}
});

// Delete a course
app.delete('/delete-course/:courseId', authenticateToken, async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: 'Course not found',
			});
		}

		// Only admin or creator can delete the course
		if (
			req.user.role !== 'admin' &&
			!course.createdBy.equals(req.user.userId)
		) {
			return res.status(403).json({
				success: false,
				message: 'Unauthorized to delete this course',
			});
		}

		// Find and delete modules and their videos for this course
		const modules = await Module.find({ _id: { $in: course.modules } });
		for (const module of modules) {
			await Video.deleteMany({ _id: { $in: module.videos } });
			await Module.findByIdAndDelete(module._id);
		}

		// Delete the course
		await Course.findByIdAndDelete(courseId);
		res.status(200).json({
			success: true,
			message: 'Course and its modules and videos deleted successfully',
		});
	} catch (error) {
		console.error('Error deleting course:', error);
		res.status(500).json({
			success: false,
			message: 'Error deleting course',
			error: error.message,
		});
	}
});

// --------------------------
// Module Routes
// --------------------------

// GET Module by ID
app.get('/modules/:moduleId', authenticateToken, async (req, res) => {
	try {
		const { moduleId } = req.params;
		let moduleData = await Module.findById(moduleId).populate(
			'videos',
			'title url duration'
		);
		if (!moduleData) {
			return res.status(404).json({
				success: false,
				message: 'Module not found',
			});
		}

		// Convert to plain object and add videoSrc to each video
		moduleData = moduleData.toObject();
		if (Array.isArray(moduleData.videos)) {
			moduleData.videos = moduleData.videos.map((video) => ({
				...video,
				videoSrc: video.url,
			}));
		}

		res.status(200).json({
			success: true,
			message: 'Module fetched successfully',
			data: moduleData,
		});
	} catch (error) {
		console.error('Error fetching module:', error);
		res.status(500).json({
			success: false,
			message: 'Error fetching module',
			error: error.message,
		});
	}
});

// Add a module to a course
app.post(
	'/add-module',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { title, description, courseId, image } = req.body;
			if (!title || !courseId || !image) {
				return res.status(400).json({
					success: false,
					message: 'Title, courseId, and image are required',
				});
			}

			if (!isValidImage(image)) {
				return res.status(400).json({
					success: false,
					message: 'Invalid image selection',
				});
			}

			const baseUrl = `${req.protocol}://${req.get('host')}`;
			const imageUrl = `${baseUrl}/assets/${image}`;

			const newModule = new Module({
				title,
				description,
				image: imageUrl,
			});
			const savedModule = await newModule.save();

			await Course.findByIdAndUpdate(courseId, {
				$push: { modules: savedModule._id },
			});

			res.status(201).json({
				success: true,
				message: 'Module added successfully',
				data: savedModule,
			});
		} catch (error) {
			console.error('Error adding module:', error);
			res.status(500).json({
				success: false,
				message: 'Error adding module',
				error: error.message,
			});
		}
	}
);

// Delete a Module
app.delete(
	'/delete-module/:moduleId',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const moduleId = req.params.moduleId;
			const module = await Module.findById(moduleId);
			if (!module) return res.status(404).json({ message: 'Module not found' });

			// Delete videos associated with the module
			await Video.deleteMany({ _id: { $in: module.videos } });
			await Module.findByIdAndDelete(moduleId);

			// Optionally, remove this module’s reference from its parent course
			await Course.findOneAndUpdate(
				{ modules: moduleId },
				{ $pull: { modules: moduleId } }
			);

			res
				.status(200)
				.json({ message: 'Module and its videos deleted successfully' });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Error deleting module', error: error.message });
		}
	}
);

// Fetch current module videos for the user
app.get('/modules/current/videos', authenticateToken, async (req, res) => {
	try {
		const { userId } = req.user;

		// Find the user's enrollment and get the last watched module
		const enrollment = await Enrollment.findOne({ userId }).populate({
			path: 'lastWatched.module',
			populate: { path: 'videos', select: 'title url description' },
		});

		if (!enrollment || !enrollment.lastWatched.module) {
			return res.status(404).json({ message: 'No current module found' });
		}

		const videos = enrollment.lastWatched.module.videos;
		res.status(200).json({ videos });
	} catch (error) {
		console.error('Error fetching current module videos:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
});

// --------------------------
// Video Routes
// --------------------------

// Fetch all videos
app.get('/videos', authenticateToken, async (req, res) => {
	try {
		const videos = await Video.find().select('title url description duration');
		if (!videos || videos.length === 0) {
			// Return an empty array instead of a 404 error
			return res.status(200).json({ success: true, videos: [] });
		}
		res.status(200).json({ success: true, videos });
	} catch (error) {
		console.error('Error fetching videos:', error);
		// Include detailed error information for debugging
		res.status(500).json({
			success: false,
			message: 'Error fetching videos',
			error: error.message,
		});
	}
});

app.get('/videos/:videoId', authenticateToken, async (req, res) => {
	try {
		const { videoId } = req.params;

		// Validate ObjectId
		if (!mongoose.Types.ObjectId.isValid(videoId)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid video ID',
			});
		}

		const video = await Video.findById(videoId).select(
			'title url description duration'
		);

		if (!video) {
			return res
				.status(404)
				.json({ success: false, message: 'Video not found' });
		}

		res.status(200).json({ success: true, video });
	} catch (error) {
		console.error('Error fetching video by ID:', error);
		res.status(500).json({
			success: false,
			message: 'Error fetching video',
			error: error.message,
		});
	}
});

// Add a video to a module
app.post(
	'/add-video',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { title, url, moduleId, description } = req.body;
			if (!title || !url || !moduleId || !description) {
				return res.status(400).json({
					success: false,
					message: 'All fields are required',
				});
			}

			const newVideo = new Video({ title, url, description });
			const savedVideo = await newVideo.save();

			await Module.findByIdAndUpdate(moduleId, {
				$push: { videos: savedVideo._id },
			});

			res.status(201).json({
				success: true,
				message: 'Video added successfully',
				data: savedVideo,
			});
		} catch (error) {
			console.error('Error adding video:', error);
			res.status(500).json({
				success: false,
				message: 'Error adding video',
				error: error.message,
			});
		}
	}
);

// --------------------------
// Enrollment Routes
// --------------------------

// Enroll in a course
app.post('/enroll', authenticateToken, async (req, res) => {
	try {
		const { courseId } = req.body;
		const userId = req.user.userId;

		if (!courseId) {
			return res
				.status(400)
				.json({ success: false, message: 'Course ID is required' });
		}

		// Check if the course exists
		const course = await Course.findById(courseId);
		if (!course) {
			return res
				.status(404)
				.json({ success: false, message: 'Course not found' });
		}

		// Check if the user is already enrolled in this course
		const existingEnrollment = await Enrollment.findOne({ userId, courseId });
		if (existingEnrollment) {
			return res
				.status(400)
				.json({ success: false, message: 'Already enrolled in this course' });
		}

		// Create a new enrollment
		const enrollment = new Enrollment({ userId, courseId });
		await enrollment.save();

		// Update the user's enrolledCourses array
		await User.findByIdAndUpdate(userId, {
			$push: {
				enrolledCourses: {
					course: courseId,
					progress: 0,
					completed: false,
					enrolledAt: new Date(),
				},
			},
		});

		res
			.status(201)
			.json({ success: true, message: 'Enrolled successfully', enrollment });
	} catch (error) {
		console.error('Error enrolling:', error);
		res
			.status(500)
			.json({ success: false, message: 'Server error', error: error.message });
	}
});

// Update Enrollment Progress and Last Watched Video
app.put(
	'/update-enrollment/:enrollmentId',
	authenticateToken,
	async (req, res) => {
		try {
			const { enrollmentId } = req.params;
			const { progress, lastWatchedModuleId, lastWatchedVideoId } = req.body;

			if (!progress && (!lastWatchedModuleId || !lastWatchedVideoId)) {
				return res.status(400).json({
					success: false,
					message: 'Progress or last watched module and video IDs are required',
				});
			}

			// Build the update object
			const updateData = {};
			if (progress !== undefined) updateData.progress = progress;
			if (lastWatchedModuleId && lastWatchedVideoId) {
				updateData.lastWatched = {
					module: lastWatchedModuleId,
					video: lastWatchedVideoId,
					updatedAt: Date.now(),
				};
			}

			const updatedEnrollment = await Enrollment.findByIdAndUpdate(
				enrollmentId,
				{ $set: updateData },
				{ new: true }
			);

			if (!updatedEnrollment) {
				return res
					.status(404)
					.json({ success: false, message: 'Enrollment not found' });
			}

			res.status(200).json({
				success: true,
				message: 'Enrollment updated successfully',
				enrollment: updatedEnrollment,
			});
		} catch (error) {
			console.error('Error updating enrollment:', error);
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: error.message,
			});
		}
	}
);

// Get Current Enrollment
app.get('/enrollment/current', authenticateToken, async (req, res) => {
	try {
		const { userId } = req.user;
		const enrollment = await Enrollment.findOne({ userId })
			.populate({
				path: 'course',
				select: 'title',
			})
			.populate({
				path: 'lastWatched.module',
				select: 'title description videos',
				populate: {
					path: 'videos',
					select: 'title url description',
				},
			})
			.populate('lastWatched.video', 'title url description');

		if (!enrollment) {
			return res.status(404).json({ message: 'No enrollment found' });
		}

		res.status(200).json({ enrollment });
	} catch (error) {
		console.error('Error fetching enrollment:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
});

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
