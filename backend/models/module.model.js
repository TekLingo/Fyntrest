const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	topics: [topicSchema], // Array of topic subdocuments
});

module.exports = mongoose.model('Module', moduleSchema);
