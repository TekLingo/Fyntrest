const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, trim: true },
		image: { type: String, required: true, trim: true }, // File link or external link
		videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }], // References multiple videos
		status: {
			type: String,
			enum: ['locked', 'unlocked', 'completed'],
			default: 'locked',
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt
	}
);

module.exports = mongoose.model('Module', ModuleSchema);
