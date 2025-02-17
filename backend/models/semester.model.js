const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true }, // Example: "Semester 1, 2025"
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // References courses
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Semester', SemesterSchema);
