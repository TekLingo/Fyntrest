require('dotenv').config();
const config = require('../config.json');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); // Adjust the path to your User model

(async () => {
	try {
		// Connect to the database
		await mongoose.connect(config.connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Check if an admin already exists
		const existingAdmin = await User.findOne({ role: 'admin' });
		if (existingAdmin) {
			console.log('Admin account already exists:', existingAdmin.email);
			process.exit(0);
		}

		// Create the admin user
		const admin = new User({
			email: 'admin@fyntrest.com', // Replace with your desired admin email
			password: await bcrypt.hash('Admin@123', 10), // Replace with your desired password
			firstName: 'Admin',
			lastName: 'User',
			role: 'admin',
			gender: 'Other', // Add a valid gender value
		});

		await admin.save();
		console.log('Admin account created successfully:', admin.email);
		process.exit(0);
	} catch (error) {
		console.error('Error creating admin account:', error);
		process.exit(1);
	}
})();
