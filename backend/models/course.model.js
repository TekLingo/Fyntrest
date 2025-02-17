const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		image: { type: String, required: true, trim: true }, // File link or external URL
		modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }], // References to modules
		semester: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Semester',
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		// New field: list of enrolled students (if you wish to track it directly)
		enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true, // Adds createdAt and updatedAt automatically
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (_, ret) => {
				delete ret.id;
			},
		},
		toObject: {
			virtuals: true,
			versionKey: false,
			transform: (_, ret) => {
				delete ret.id;
			},
		},
	}
);

// Virtual for enrolledStudentsCount
CourseSchema.virtual('enrolledStudentsCount').get(function () {
	return this.enrolledStudents ? this.enrolledStudents.length : 0;
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
