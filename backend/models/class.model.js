const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
	school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'School',
		required: true,
	},
	className: {
		type: String,
		required: true,
		enum: ['8th', '9th', '10th', '11th', '12th'],
	},
	academicYear: {
		type: String,
		required: true,
		pattern: /^\d{4}-\d{4}$/,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	students: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	subjects: [String],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: Date,
});

module.exports = mongoose.model('Class', classSchema);
