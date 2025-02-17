const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'School name is required'],
		unique: true,
		trim: true,
		maxlength: [100, 'School name cannot exceed 100 characters'],
	},
	address: {
		street: { type: String, trim: true },
		city: { type: String, trim: true },
		state: { type: String, trim: true },
		zipCode: { type: String, trim: true },
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Admin reference is required'],
	},
	schoolCode: {
		type: String,
		unique: true,
		uppercase: true,
		trim: true,
		validate: {
			validator: function (v) {
				return /^SCH-\d{4}$/.test(v);
			},
			message: 'School code must be in format SCH-YYYY',
		},
	},
	studentsEnrolled: {
		type: Number,
		default: 0,
		min: [0, 'Students enrolled cannot be negative'],
	},
	teachersEnrolled: {
		type: Number,
		default: 0,
		min: [0, 'Teachers enrolled cannot be negative'],
	},
	establishedYear: {
		type: Number,
		min: [1900, 'Establishment year must be after 1900'],
		max: [
			new Date().getFullYear(),
			'Establishment year cannot be in the future',
		],
	},
	phone: {
		type: String,
		validate: {
			validator: function (v) {
				return /\d{10}/.test(v);
			},
			message: 'Phone number must be 10 digits',
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: Date,
});

// Pre-save hook to generate school code
SchoolSchema.pre('save', function (next) {
	if (!this.schoolCode) {
		const year = this.establishedYear || new Date().getFullYear();
		this.schoolCode = `SCH-${year}`;
	}
	this.updatedAt = Date.now();
	next();
});

// Cascade delete classes when school is removed
SchoolSchema.pre('remove', async function (next) {
	await this.model('Class').deleteMany({ school: this._id });
	next();
});

module.exports = mongoose.model('School', SchoolSchema);
