const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	role: { type: String, enum: ['Student', 'Teacher', 'Admin'], required: true },
	firstName: { type: String, required: true },
	lastName: { type: String },
	email: { type: String, unique: true, required: true },
	gender: { type: String, enum: ['Male', 'Female'] },
	password: { type: String, required: true },
	schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
	classId: { type: Schema.Types.ObjectId, ref: 'Class' },
	profilePicture: {
		type: String,
		default: '/assets/default-rofile.jpg',
	},
	bio: { type: String },
	coins: { type: Number, default: 0 },
	streaks: { type: Number, default: 0 },
	joinDate: { type: Date, default: Date.now },
	lastLogin: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
