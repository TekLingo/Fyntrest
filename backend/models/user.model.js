// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	role: {
		type: String,
		enum: ['admin', 'teacher', 'student'], // now 'student' is allowed
		default: 'student', // optional: automatically defaults to 'student' if not provided
	},
	firstName: { type: String, required: true },
	lastName: String,
	email: { type: String, unique: true, required: true },
	gender: { type: String, enum: ['Male', 'Female', 'Other'] },
	password: { type: String, required: true },
	school: { type: String },
	class: { type: String },
	profilePicture: {
		type: String,
		default: '/assets/default-profile.jpg',
	},
	bio: String,
	coins: { type: Number, default: 0 },
	streaks: { type: Number, default: 0 },
	enrolledCourses: [
		{
			course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
			progress: { type: Number, default: 0 },
			completed: { type: Boolean, default: false },
		},
	],
	joinDate: { type: Date, default: Date.now },
	lastLogin: Date,
});

module.exports = mongoose.model('User', userSchema);
