const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		videoUrl: { type: String, required: true, trim: true },
		module: { type: String, required: true, trim: true },
		semester: { type: String, required: true, trim: true },
		enrolledStudents: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				progress: { type: Number, default: 0 },
			},
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt automatically
		toJSON: { virtuals: false }, // Include virtuals in JSON output
		toObject: { virtuals: false },
	}
);

// Virtual for enrolledStudentsCount
courseSchema.virtual('enrolledStudentsCount').get(function () {
	return this.enrolledStudents.length;
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
