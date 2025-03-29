const mongoose = require('mongoose');

const CourseEnrollmentSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},
	progress: {
		type: Number,
		default: 0, // Tracks overall course progress (percentage)
		min: 0,
		max: 100,
	},
	enrolledAt: {
		type: Date,
		default: Date.now,
	},
	lastWatched: {
		module: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Module',
		},
		video: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Video',
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
});

module.exports = mongoose.model('Enrollment', CourseEnrollmentSchema);
