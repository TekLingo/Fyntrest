const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
	question: { type: String, required: true, trim: true },
	options: [{ type: String, required: true }], // Array of options
	answer: { type: String, required: true, trim: true }, // Correct answer
});

const QuizSchema = new mongoose.Schema(
	{
		questions: [QuestionSchema], // Embed questions directly
		videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }], // References Video model
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt
	}
);

module.exports = mongoose.model('Quiz', QuizSchema);
