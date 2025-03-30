const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
	question: { type: String, required: true, trim: true },
	options: [{ type: String, required: true }], // Array of options
	answer: { type: String, required: true, trim: true }, // Correct answer
});

module.exports = mongoose.model('Question', QuestionSchema);
