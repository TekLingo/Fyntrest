const mongoose = require('mongoose');

// models/enrollment.model.js
const enrollmentSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Course',
			required: true,
		}, // Changed from courseId
		progress: { type: Number, default: 0 },
		lastWatched: {
			module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
			video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
			updatedAt: Date,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
