const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
	word: { type: String, required: true },
	description: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Word', wordSchema);
