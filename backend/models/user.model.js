// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	role: {
		type: String,
		enum: ['Student', 'Teacher', 'Admin'],
		required: true,
	},
	firstName: { type: String, required: true },
	lastName: String,
	email: { type: String, unique: true, required: true },
	gender: { type: String, enum: ['Male', 'Female', 'Other'] },
	password: { type: String, required: true },
	school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
	class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
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
