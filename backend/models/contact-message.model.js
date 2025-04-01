const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		role: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		message: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
