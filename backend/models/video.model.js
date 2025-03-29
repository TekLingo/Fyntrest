const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		url: { type: String, required: true, trim: true }, // File or external link
		duration: { type: Number, min: 0 }, // Duration in seconds
		description: { type: String, trim: true, required: true },
		views: { type: Number, default: 0, min: 0 }, // Counter for video views
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt
	}
);

module.exports = mongoose.model('Video', VideoSchema);
