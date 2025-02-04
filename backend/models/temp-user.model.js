// models/temp-user.model.js
const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	otp: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 600 }, // Auto-delete after 10 mins
});

module.exports = mongoose.model('TempUser', tempUserSchema);
