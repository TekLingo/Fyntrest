const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true },
	url: { type: String, required: true, trim: true }, // File or external link
	duration: { type: Number }, // Duration in seconds (optional)
	description: { type: String, trim: true }, // Optional video description
	thumbnail: { type: String, trim: true }, // Optional thumbnail image URL
	views: { type: Number, default: 0 }, // Optional counter for video views
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', VideoSchema);
