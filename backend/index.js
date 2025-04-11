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
const { exec } = require('child_process'); // Add this for executing ffmpeg commands
const Video = require('./models/video.model'); // Ensure the Video model is imported
const Quiz = require('./models/quiz.model'); // Import the Quiz model
const Question = require('./models/question.model'); // Import the Question model
const Fact = require('./models/fact.model');
const Word = require('./models/word.model');
const ContactMessage = require('./models/contact-message.model'); // Create this model
const nodemailer = require('nodemailer'); // For sending emails

// Middleware
const { authenticateToken, checkRole } = require('./utilities');

// Models
const TempUser = require('./models/temp-user.model');
const User = require('./models/user.model');
const School = require('./models/school.model');
const Course = require('./models/course.model');
const Semester = require('./models/semester.model');
const Module = require('./models/module.model');
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
			}); // Ensure this closing brace matches an open block or remove it if unnecessary
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
			role: user.role, // Include the user's role in the response
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

// Fetch user details by userId
app.get('/get-user-details', authenticateToken, async (req, res) => {
	try {
		const { userId } = req.user;
		const user = await User.findById(userId).select('-password'); // Exclude password
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ success: true, user });
	} catch (error) {
		console.error('Error fetching user details:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
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

		res.json({
			message: 'User account deleted successfully. Redirecting to login...',
			redirect: '/login', // Add this to indicate redirection
		});
	} catch (error) {
		console.error('Error deleting user:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

app.post(
	'/add-user',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const {
				firstName,
				lastName,
				email,
				password,
				gender,
				role,
				school,
				userClass,
			} = req.body;

			const validRoles = ['admin', 'teacher', 'student'];
			if (!validRoles.includes(role)) {
				return res.status(400).json({ message: 'Invalid role' });
			}

			// Validate input
			if (!firstName || !lastName || !email || !password || !gender || !role) {
				return res.status(400).json({ message: 'All fields are required' });
			}

			// Check if the email is already in use
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: 'Email is already in use' });
			}

			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create a new user
			const newUser = new User({
				firstName,
				lastName,
				email,
				password: hashedPassword,
				gender,
				role,
				school: role === 'student' || role === 'teacher' ? school : undefined, // Assign school only for students/teachers
				class: role === 'student' ? userClass : undefined, // Assign class only for students
			});

			// Save the user to the database
			await newUser.save();

			res.status(201).json({
				success: true,
				message: `${
					role.charAt(0).toUpperCase() + role.slice(1)
				} user created successfully`,
				user: {
					id: newUser._id,
					firstName: newUser.firstName,
					email: newUser.email,
					role: newUser.role,
				},
			});
		} catch (error) {
			console.error('Error creating user:', error);
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: error.message,
			});
		}
	}
);

// --------------------------
// Video Upload
// --------------------------

// Helper function to generate thumbnail
const generateThumbnail = (videoPath, thumbnailPath) => {
	return new Promise((resolve, reject) => {
		const command = `ffmpeg -i "${videoPath}" -ss 00:00:01 -vframes 1 "${thumbnailPath}"`;
		exec(command, (error) => {
			if (error) {
				reject(error);
			} else {
				resolve(thumbnailPath);
			}
		});
	});
};

// Modify the /upload-video endpoint
app.post('/upload-video', upload.single('video'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No video file uploaded' });
		}

		const videoUrl = `${req.protocol}://${req.get(
			'host'
		)}/uploads/course-videos/${req.file.filename}`;

		// Generate thumbnail
		const thumbnailPath = `uploads/thumbnails/${req.file.filename}.jpg`;
		await generateThumbnail(req.file.path, thumbnailPath);

		const thumbnailUrl = `${req.protocol}://${req.get(
			'host'
		)}/${thumbnailPath}`;

		// Save video details to the database
		const newVideo = new Video({
			title: req.body.title || 'Untitled Video',
			url: videoUrl,
			description: req.body.description || 'No description provided',
			duration: req.body.duration || 0,
			thumbnail: thumbnailUrl, // Save thumbnail URL
		});
		await newVideo.save();

		res.status(200).json({
			message: 'Video uploaded successfully',
			videoUrl,
			thumbnailUrl,
		});
	} catch (error) {
		console.error('Error uploading video:', error);
		res
			.status(500)
			.json({ message: 'Error uploading video', error: error.message });
	}
});

// --------------------------
// Semester Routes
// --------------------------

// Get all semesters
app.get('/get-semesters', authenticateToken, async (req, res) => {
	try {
		const { userId } = req.user;
		const user = await User.findById(userId).select('-password');
		const semesters = await Semester.find().populate({
			path: 'courses',
			select: 'title description image modules',
			populate: {
				path: 'modules',
				select: 'title description videos',
				populate: {
					path: 'videos',
					select: 'title url description',
				},
			},
		});

		if (!semesters || semesters.length === 0) {
			return res.status(404).json({ message: 'No semesters found' });
		}

		const enrollments = await Enrollment.find({ userId }).select('course');
		const enrolledCourseIds = enrollments.map((enrollment) =>
			enrollment.course.toString()
		);

		const updatedSemesters = semesters.map((semester) => {
			const isEnrolled = semester.courses.some((course) =>
				enrolledCourseIds.includes(course._id.toString())
			);
			return { ...semester.toObject(), enrolled: isEnrolled };
		});

		res.status(200).json({ success: true, semesters: updatedSemesters, user });
	} catch (error) {
		console.error('Error fetching semesters:', error);
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
			populate: { path: 'videos', select: 'title url' },
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
			'title url duration description'
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

app.put('/modules/:moduleId/status', authenticateToken, async (req, res) => {
	try {
		const { status } = req.body;
		const module = await Module.findByIdAndUpdate(
			req.params.moduleId,
			{ status },
			{ new: true }
		);

		res.json({
			success: true,
			module,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error updating module status',
		});
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
			return res.status(200).json({ success: true, videos: [] });
		}
		res.status(200).json({ success: true, videos });
	} catch (error) {
		console.error('Error fetching videos:', error);
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

// In your server file (e.g., index.js or app.js)

// Get All Enrollments for a User
app.get('/enrollments', authenticateToken, async (req, res) => {
	try {
		const { userId } = req.user;

		const enrollments = await Enrollment.find({ userId })
			.populate({
				path: 'course',
				select: 'title image modules enrolledStudents',
				populate: {
					path: 'modules',
					select: 'title status order',
					options: { sort: { order: 1 } },
				},
			})
			.lean();

		if (!enrollments.length) {
			return res.status(200).json({
				success: true,
				enrollments: [],
				message: 'No enrollments found',
			});
		}

		// Calculate module statuses
		const processed = enrollments.map((enrollment) => {
			const totalModules = enrollment.course.modules.length;
			const completedCount = Math.floor(
				(enrollment.progress / 100) * totalModules
			);

			const modules = enrollment.course.modules.map((module, index) => ({
				...module,
				status:
					index < completedCount
						? 'completed'
						: index === completedCount
						? 'unlocked'
						: 'locked',
			}));

			return {
				...enrollment,
				course: {
					...enrollment.course,
					modules,
				},
			};
		});

		res.status(200).json({
			success: true,
			enrollments: processed,
		});
	} catch (error) {
		console.error('Error fetching enrollments:', error);
		res.status(500).json({
			success: false,
			message: 'Server error',
			error: error.message,
		});
	}
});

// Enroll in a course
app.post('/enroll', authenticateToken, async (req, res) => {
	try {
		const { courseId } = req.body;
		const userId = req.user.userId;

		// Change to "course: courseId"
		const enrollment = new Enrollment({ userId, course: courseId }); // <-- Fixed here
		await enrollment.save();

		// Update course's enrolledStudents array
		await Course.findByIdAndUpdate(courseId, {
			$addToSet: { enrolledStudents: userId },
		});

		res.status(201).json({
			success: true,
			message: 'Enrolled successfully',
			enrollment,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Server error',
			error: error.message,
		});
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

// Fetch students enrolled count (yearly, monthly, daily)
app.get(
	'/students-enrolled-count',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			console.log('Fetching students enrolled count...');
			const now = new Date();

			// Define time periods
			const startOfToday = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate()
			);
			const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
			const startOfYear = new Date(now.getFullYear(), 0, 1);

			// Fetch counts
			const dailyCount = await Enrollment.countDocuments({
				createdAt: { $gte: startOfToday },
			});
			const monthlyCount = await Enrollment.countDocuments({
				createdAt: { $gte: startOfMonth },
			});
			const yearlyCount = await Enrollment.countDocuments({
				createdAt: { $gte: startOfYear },
			});

			console.log('Counts:', { dailyCount, monthlyCount, yearlyCount });

			// Send response
			res.status(200).json({
				success: true,
				data: {
					daily: dailyCount,
					monthly: monthlyCount,
					yearly: yearlyCount,
				},
			});
		} catch (error) {
			console.error('Error fetching students enrolled count:', error);
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: error.message,
			});
		}
	}
);

// --------------------------
// Create an empty quiz
// --------------------------
app.post(
	'/quizzes',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { videoId } = req.body;
			if (videoId && !mongoose.Types.ObjectId.isValid(videoId)) {
				return res
					.status(400)
					.json({ success: false, message: 'Invalid video ID' });
			}

			const newQuiz = new Quiz({
				questions: [],
				videos: videoId ? [videoId] : [],
			});
			const savedQuiz = await newQuiz.save();

			if (videoId) {
				await Video.findByIdAndUpdate(videoId, {
					$push: { quizzes: savedQuiz._id },
				});
			}

			res.status(201).json({
				success: true,
				message: 'Empty quiz created successfully',
				quiz: savedQuiz,
			});
		} catch (error) {
			console.error('Error creating quiz:', error);
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: error.message,
			});
		}
	}
);

// --------------------------
// Get all quizzes (no videoId filter)
// --------------------------
app.get('/quizzes/all', async (req, res) => {
	try {
		const quizzes = await Quiz.find().populate('questions');
		res.status(200).json({ success: true, quizzes });
	} catch (error) {
		console.error('Error fetching all quizzes:', error);
		res
			.status(500)
			.json({ success: false, message: 'Server error', error: error.message });
	}
});

// --------------------------
// Fetch quizzes for a specific video
// --------------------------
app.get('/quizzes', authenticateToken, async (req, res) => {
	try {
		const { videoId } = req.query;

		if (!videoId) {
			return res
				.status(400)
				.json({ success: false, message: 'Video ID is required' });
		}

		if (!mongoose.Types.ObjectId.isValid(videoId)) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid video ID' });
		}

		const quizzes = await Quiz.find({ videos: videoId }).populate('questions');
		if (!quizzes || quizzes.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: 'No quizzes found for this video' });
		}

		res.status(200).json({ success: true, quizzes });
	} catch (error) {
		console.error('Error fetching quizzes:', error);
		res
			.status(500)
			.json({ success: false, message: 'Server error', error: error.message });
	}
});

// --------------------------
// Get a quiz by ID
// --------------------------
app.get('/quizzes/:quizId', async (req, res) => {
	try {
		const { quizId } = req.params;
		if (!mongoose.Types.ObjectId.isValid(quizId)) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid quiz ID' });
		}

		const quiz = await Quiz.findById(quizId).populate('questions');
		if (!quiz) {
			return res
				.status(404)
				.json({ success: false, message: 'Quiz not found' });
		}

		res.status(200).json({ success: true, quiz });
	} catch (error) {
		console.error('Error fetching quiz:', error);
		res
			.status(500)
			.json({ success: false, message: 'Server error', error: error.message });
	}
});

// --------------------------
// Update a quiz
// --------------------------
app.put(
	'/quizzes/:quizId',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { quizId } = req.params;
			const { questions, videos } = req.body;

			// Update questions if provided
			if (questions && Array.isArray(questions)) {
				await Promise.all(
					questions.map(async (q) => {
						if (q._id) {
							// Update existing question
							await Question.findByIdAndUpdate(q._id, q);
						} else {
							// Create new question
							const newQuestion = new Question(q);
							await newQuestion.save();
						}
					})
				);
			}

			const updatedQuiz = await Quiz.findByIdAndUpdate(
				quizId,
				{ questions, videos },
				{ new: true }
			).populate('questions');

			if (!updatedQuiz) {
				return res.status(404).json({ message: 'Quiz not found' });
			}

			// Update video associations if provided
			if (videos && Array.isArray(videos)) {
				// Remove quiz from old videos
				await Video.updateMany(
					{ quizzes: quizId },
					{ $pull: { quizzes: quizId } }
				);
				// Add quiz to new videos
				await Video.updateMany(
					{ _id: { $in: videos } },
					{ $push: { quizzes: quizId } }
				);
			}

			res
				.status(200)
				.json({ message: 'Quiz updated successfully', quiz: updatedQuiz });
		} catch (error) {
			console.error('Error updating quiz:', error);
			res.status(500).json({ message: 'Server error', error: error.message });
		}
	}
);

// --------------------------
// Delete a quiz
// --------------------------
app.delete(
	'/quizzes/:quizId',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { quizId } = req.params;
			const quiz = await Quiz.findById(quizId);
			if (!quiz) {
				return res.status(404).json({ message: 'Quiz not found' });
			}

			// Delete associated questions if stored as separate documents
			await Question.deleteMany({ _id: { $in: quiz.questions } });

			// Delete the quiz
			await Quiz.findByIdAndDelete(quizId);

			res
				.status(200)
				.json({ message: 'Quiz and its questions deleted successfully' });
		} catch (error) {
			console.error('Error deleting quiz:', error);
			res.status(500).json({ message: 'Server error', error: error.message });
		}
	}
);

// --------------------------
// Add a question to a quiz
// --------------------------
app.post(
	'/quizzes/:quizId/questions',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { quizId } = req.params;
			const { question, options, answer } = req.body;

			if (!question || !options || !answer || options.length < 2) {
				return res.status(400).json({
					message: 'Question, at least two options, and an answer are required',
				});
			}

			const quiz = await Quiz.findById(quizId);
			if (!quiz) {
				return res.status(404).json({ message: 'Quiz not found' });
			}

			// Here we assume questions are stored as subdocuments in Quiz
			quiz.questions.push({ question, options, answer });
			await quiz.save();

			res.status(201).json({ message: 'Question added successfully', quiz });
		} catch (error) {
			console.error('Error adding question:', error);
			res.status(500).json({ message: 'Server error', error: error.message });
		}
	}
);

// --------------------------
// Update a question in a quiz
// --------------------------
app.put(
	'/quizzes/:quizId/questions/:questionId',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { quizId, questionId } = req.params;
			const { question, options, answer } = req.body;

			const quiz = await Quiz.findById(quizId);
			if (!quiz) {
				return res.status(404).json({ message: 'Quiz not found' });
			}

			const questionToUpdate = quiz.questions.id(questionId);
			if (!questionToUpdate) {
				return res.status(404).json({ message: 'Question not found' });
			}

			if (question) questionToUpdate.question = question;
			if (options) questionToUpdate.options = options;
			if (answer) questionToUpdate.answer = answer;

			await quiz.save();

			res.status(200).json({ message: 'Question updated successfully', quiz });
		} catch (error) {
			console.error('Error updating question:', error);
			res.status(500).json({ message: 'Server error', error: error.message });
		}
	}
);

// --------------------------
// Delete a question from a quiz
// --------------------------
app.delete(
	'/quizzes/:quizId/questions/:questionId',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { quizId, questionId } = req.params;

			const quiz = await Quiz.findById(quizId);
			if (!quiz) {
				return res.status(404).json({ message: 'Quiz not found' });
			}

			const questionToDelete = quiz.questions.id(questionId);
			if (!questionToDelete) {
				return res.status(404).json({ message: 'Question not found' });
			}

			questionToDelete.remove();
			await quiz.save();

			res.status(200).json({ message: 'Question deleted successfully', quiz });
		} catch (error) {
			console.error('Error deleting question:', error);
			res.status(500).json({ message: 'Server error', error: error.message });
		}
	}
);

// --------------------------
// Daily Content Route
// --------------------------

app.get('/daily-content', async (req, res) => {
	try {
		const now = new Date();
		const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

		// Fetch the most recent fact and word within the last 24 hours
		let fact = await Fact.findOne({ createdAt: { $gte: last24Hours } }).sort({
			createdAt: -1,
		});
		let word = await Word.findOne({ createdAt: { $gte: last24Hours } }).sort({
			createdAt: -1,
		});

		// Fallback to the oldest available fact/word if none exist in the last 24 hours
		if (!fact) {
			fact = await Fact.findOne().sort({ createdAt: 1 });
		}
		if (!word) {
			word = await Word.findOne().sort({ createdAt: 1 });
		}

		// If no fact or word exists, return an error
		if (!fact || !word) {
			return res.status(404).json({
				success: false,
				message: 'No facts or words available in the database',
			});
		}

		// Return only the text content
		res.status(200).json({
			success: true,
			fact: {
				fact: fact.fact,
			},
			word: {
				word: word.word,
				description: word.description,
			},
		});
	} catch (error) {
		console.error('Error fetching daily content:', error);
		res.status(500).json({
			success: false,
			message: 'Server error',
			error: error.message,
		});
	}
});
// --------------------------
// Fact Routes (Admin Only)
// --------------------------
app.post('/facts', authenticateToken, checkRole('admin'), async (req, res) => {
	try {
		const { fact } = req.body;
		if (!fact) {
			return res.status(400).json({ message: 'Fact is required' });
		}

		const newFact = new Fact({ fact });
		await newFact.save();

		console.log(`Fact added: ${newFact.fact}, ID: ${newFact._id}`);
		res.status(201).json({
			success: true,
			message: 'Fact added successfully',
			fact: newFact,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Server error',
			error: error.message,
		});
	}
});

app.put(
	'/facts/:id',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { fact } = req.body;
			const updatedFact = await Fact.findByIdAndUpdate(
				req.params.id,
				{ fact },
				{ new: true }
			);

			if (!updatedFact) {
				return res.status(404).json({ message: 'Fact not found' });
			}

			res.status(200).json({
				success: true,
				message: 'Fact updated successfully',
				fact: updatedFact,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: error.message,
			});
		}
	}
);

app.delete(
	'/facts/:id',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const deletedFact = await Fact.findByIdAndDelete(req.params.id);
			if (!deletedFact) {
				return res.status(404).json({ message: 'Fact not found' });
			}

			res
				.status(200)
				.json({ success: true, message: 'Fact deleted successfully' });
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: error.message,
			});
		}
	}
);

app.get('/facts', authenticateToken, checkRole('admin'), async (req, res) => {
	try {
		const facts = await Fact.find();
		res.status(200).json({ success: true, facts });
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: 'Server error', error: error.message });
	}
});

// --------------------------
// Word Routes (Admin Only)
// --------------------------
app.post('/words', authenticateToken, checkRole('admin'), async (req, res) => {
	try {
		const { word, description } = req.body;
		if (!word || !description) {
			return res
				.status(400)
				.json({ message: 'Word and description are required' });
		}

		const newWord = new Word({ word, description });
		await newWord.save();

		console.log(
			`Word added: ${newWord.word}, Description: ${newWord.description}, ID: ${newWord._id}`
		);
		res.status(201).json({
			success: true,
			message: 'Word added successfully',
			word: newWord,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Server error',
			error: error.message,
		});
	}
});

app.put(
	'/words/:id',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const { word, description } = req.body;
			const updatedWord = await Word.findByIdAndUpdate(
				req.params.id,
				{ word, description },
				{ new: true }
			);

			if (!updatedWord) {
				return res.status(404).json({ message: 'Word not found' });
			}

			res.status(200).json({
				success: true,
				message: 'Word updated successfully',
				word: updatedWord,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: error.message,
			});
		}
	}
);

app.delete(
	'/words/:id',
	authenticateToken,
	checkRole('admin'),
	async (req, res) => {
		try {
			const deletedWord = await Word.findByIdAndDelete(req.params.id);
			if (!deletedWord) {
				return res.status(404).json({ message: 'Word not found' });
			}

			res
				.status(200)
				.json({ success: true, message: 'Word deleted successfully' });
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Server error',
				error: error.message,
			});
		}
	}
);

app.get('/words', authenticateToken, checkRole('admin'), async (req, res) => {
	try {
		const words = await Word.find();
		res.status(200).json({ success: true, words });
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: 'Server error', error: error.message });
	}
});

// --------------------------
// Contact Us Form Submission
// --------------------------
app.post('/contact-us', async (req, res) => {
	try {
		const { firstName, lastName, email, role, phoneNumber, message } = req.body;

		// Save the form data to the database
		const newMessage = new ContactMessage({
			firstName,
			lastName,
			email,
			role,
			phoneNumber,
			message,
		});
		await newMessage.save();

		// Configure the transporter with SMTP settings
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: process.env.SMTP_SECURE === 'true', // Convert string to boolean
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const mailOptions = {
			from: process.env.SMTP_USER,
			to: process.env.ADMIN_EMAIL || 'defaultadmin@example.com', // Fallback email
			subject: 'New Contact Us Form Submission',
			text: `You have received a new message from ${firstName} ${lastName} (${role}):
			
			Email: ${email}
			Phone: ${phoneNumber}
			Message: ${message}`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: 'Form submitted successfully' });
	} catch (error) {
		console.error('Error handling contact form submission:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
});

// Test SMTP connection
app.get('/test-smtp', async (req, res) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: process.env.SMTP_SECURE === 'true',
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		// Verify connection
		await transporter.verify();
		res.status(200).json({ message: 'SMTP connection successful' });
	} catch (error) {
		console.error('SMTP connection failed:', error);
		res
			.status(500)
			.json({ message: 'SMTP connection failed', error: error.message });
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
