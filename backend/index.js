require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const path = require('path');

const jwt = require('jsonwebtoken');

const User = require('./models/user.model');

const { authenticateToken } = require('./utilities');

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Create Account
app.post('/create-account', async (req, res) => {
	const { firstName, lastName, email, role, password, confirmPassword } =
		req.body;

	// Validate inputs
	if (
		!firstName ||
		!lastName ||
		!email ||
		!role ||
		!password ||
		!confirmPassword
	) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	if (password !== confirmPassword) {
		return res.status(400).json({ message: 'Passwords do not match' });
	}

	try {
		const isUser = await User.findOne({ email });
		if (isUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			firstName,
			lastName,
			email,
			role,
			password: hashedPassword,
			profilePicture: '/assets/default-profile.jpg',
		});

		await user.save();

		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '72h',
			}
		);

		return res.status(201).json({
			error: false,
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
			},
			accessToken,
			message: 'Registration Successful',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
});

// Login
app.post('/login', async function (req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(401).json({ message: 'User not Found' });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json({ message: 'Invalid email or password' });
	}

	const accessToken = jwt.sign(
		{ userId: user._id },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: '72h',
		}
	);

	return res.status(201).json({
		error: false,
		user: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		},
		accessToken,
		message: 'Login successful',
	});
});

// Get User
app.get('/get-user', authenticateToken, async (req, res) => {
	const { userId } = req.user;

	const isUser = await User.findOne({ _id: userId });

	if (!isUser) {
		return res.status(401);
	}

	return res.json({
		user: isUser,
		message: '',
	});
});

app.listen(8000);
module.exports = app;
