// models/user.model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	role: {
		type: String,
		enum: ['admin', 'teacher', 'student'], // Allowed roles
		default: 'student', // Default role
	},
	firstName: { type: String, required: true, trim: true },
	lastName: { type: String, trim: true },
	email: { type: String, unique: true, required: true, trim: true },
	gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
	password: { type: String, required: true },
	school: { type: String, trim: true },
	class: { type: String, trim: true },
	profilePicture: {
		type: String,
		default: '/assets/default-profile.jpg',
	},
	bio: { type: String, trim: true },
	coins: { type: Number, default: 0 },
	streaks: { type: Number, default: 0 },
	enrolledCourses: [
		{
			course: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course',
				required: true,
			},
			progress: { type: Number, default: 0 },
			completed: { type: Boolean, default: false },
			enrolledAt: { type: Date, default: Date.now },
			lastWatched: {
				module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
				video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
				updatedAt: { type: Date, default: Date.now },
			},
		},
	],
	joinDate: { type: Date, default: Date.now },
	lastLogin: { type: Date },
});

module.exports = mongoose.model('User', UserSchema);
