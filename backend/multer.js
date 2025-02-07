const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/course-videos'); // Save videos in the 'uploads/course-videos' folder
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Generate unique filenames
	},
});

// File filter to allow only video files
const fileFilter = (req, file, cb) => {
	const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type. Only video files are allowed.'), false);
	}
};

// Initialize multer with the configuration
const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
});

module.exports = upload;
