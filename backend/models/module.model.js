const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true },
	description: { type: String },
	image: { type: String, required: true, trim: true }, // Can be a file link or external link
	videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }], // References multiple videos
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Module', ModuleSchema);
