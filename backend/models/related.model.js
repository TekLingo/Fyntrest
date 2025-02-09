const mongoose = require('mongoose');

const RelatedCourseSchema = new mongoose.Schema({
	title: { type: String, required: true },
	img: { type: String, required: true }, // URL or image path
});

module.exports = mongoose.model('Related', RelatedCourseSchema);
