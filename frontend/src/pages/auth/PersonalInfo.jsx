import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../components/Buttons/FormButton';
import axiosInstance from '../../utils/axiosInstance';

const PersonalInfo = () => {
	const [activeSection, setActiveSection] = useState('personal');
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		gender: '',
		password: '',
		school: '',
		class: '',
	});
	const navigate = useNavigate();

	// Handle input changes
	const handleInputChange = useCallback((e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	// Validate all required fields are present
	const validateForm = () => {
		const {
			firstName,
			lastName,
			gender,
			password,
			school,
			class: classVal,
		} = formData;
		if (
			!firstName ||
			!lastName ||
			!gender ||
			!password ||
			!school ||
			!classVal
		) {
			setError('Please fill in all required fields.');
			return false;
		}
		setError('');
		return true;
	};

	// Handle form submission for completing registration
	const handleSubmit = useCallback(async () => {
		if (!validateForm()) return;

		// Retrieve the registration token saved after OTP verification
		const registrationToken = localStorage.getItem('registrationToken');
		if (!registrationToken) {
			setError(
				'Registration token missing. Please restart the registration process.'
			);
			return;
		}

		// Build the payload. Ensure formData does not include any "token" field.
		const payload = {
			token: registrationToken,
			...formData,
		};

		console.log('Payload:', JSON.stringify(payload));

		try {
			// Override any Authorization header added by the axios interceptor
			const response = await axiosInstance.post(
				'/complete-registration',
				payload,
				{ headers: { Authorization: '' } }
			);
			console.log('Registration success:', response.data);
			localStorage.removeItem('registrationToken');
			localStorage.setItem('token', response.data.token);
			navigate('/logged/home');
		} catch (error) {
			console.error('Registration error:', error);
			if (error.response?.data?.message) {
				setError(`Registration failed: ${error.response.data.message}`);
				console.error('Request failed with status code 400');
				console.error('Headers sent:', error.config.headers);
				console.error('Data sent:', error.config.data);
				console.error('Status text:', error.response.statusText);
			} else {
				setError('Registration failed. Please try again.');
			}
		}
	}, [formData, navigate]);

	return (
		<div className="flex flex-col items-center w-full h-screen absolute top-20">
			{/* Step Navigation */}
			<div className="flex justify-center items-center">
				{['personal', 'details', 'payment'].map((section, index) => (
					<div key={section} className="flex flex-col items-center">
						<div
							className={`h-16 w-60 flex flex-col justify-center items-center gap-4 border-b-2 cursor-pointer ${
								activeSection === section
									? 'border-secondary-lt text-text-g'
									: 'border-transparent text-[#787878]'
							}`}
							onClick={() => setActiveSection(section)}
						>
							<p
								className={`border rounded-full w-6 h-6 flex items-center justify-center ${
									activeSection === section
										? 'border-transparent bg-secondary-lt text-white'
										: 'border-[#787878] bg-[#787878] text-text-d'
								}`}
							>
								{index + 1}
							</p>
							<p className="mb-6 capitalize">{section.replace('-', ' ')}</p>
						</div>
					</div>
				))}
			</div>

			{/* Error Message */}
			{error && <p className="text-red-500 mt-4">{error}</p>}

			<div className="w-full flex justify-center">
				<div className="p-6 w-3/4 rounded-lg">
					{/* Personal Information Section */}
					{activeSection === 'personal' && (
						<div className="flex flex-col gap-8 pt-6">
							<h2 className="text-text-g font-bold font-title text-3xl">
								Let's get to know you..
							</h2>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col">
									<label className="text-sm font-medium mb-2 text-text-g">
										First Name
									</label>
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										onChange={handleInputChange}
										className="w-full h-12 rounded-md p-2 text-lg bg-secondary-lt"
									/>
								</div>
								<div className="flex flex-col">
									<label className="text-sm font-medium mb-2 text-text-g">
										Last Name
									</label>
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										onChange={handleInputChange}
										className="w-full h-12 rounded-md p-2 text-lg bg-secondary-lt"
									/>
								</div>
								<div className="flex flex-col">
									<label className="text-sm font-medium mb-2 text-text-g">
										Gender
									</label>
									<select
										name="gender"
										value={formData.gender}
										onChange={handleInputChange}
										className="w-full h-12 rounded-md p-2 text-lg bg-secondary-lt border"
									>
										<option value="">Select</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div className="flex flex-col">
									<label className="text-sm font-medium mb-2 text-text-g">
										Set Password
									</label>
									<input
										type="password"
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										className="w-full h-12 rounded-md p-2 text-lg bg-secondary-lt"
									/>
								</div>
							</div>
							<FormButton onClick={() => setActiveSection('details')}>
								Next
							</FormButton>
						</div>
					)}

					{/* Additional Details Section */}
					{activeSection === 'details' && (
						<div className="flex flex-col gap-4 pt-6 justify-center items-center">
							<h2 className="text-text-g font-bold font-title text-3xl">
								Some more details
							</h2>
							<div className="flex flex-col w-1/3">
								<div className="flex flex-col">
									<label className="text-sm font-medium mb-2 text-text-g">
										School
									</label>
									<input
										type="text"
										name="school"
										value={formData.school}
										onChange={handleInputChange}
										className="w-full h-12 rounded-md p-2 text-lg text-text-d bg-secondary-lt"
									/>
								</div>
							</div>
							<div className="flex flex-col w-1/3">
								<label className="text-sm font-medium mb-2 text-text-g">
									Class
								</label>
								<select
									name="class"
									value={formData.class}
									onChange={handleInputChange}
									className="w-full h-12 rounded-md p-2 text-lg text-text-d bg-secondary-lt border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value="">Select Class</option>
									<option value="8th">8th</option>
									<option value="9th">9th</option>
									<option value="10th">10th</option>
								</select>
							</div>
							<FormButton onClick={() => setActiveSection('payment')}>
								Next
							</FormButton>
						</div>
					)}

					{/* Payment Section */}
					{activeSection === 'payment' && (
						<div className="flex flex-col gap-8 pt-6">
							<h2 className="text-text-g font-bold font-title text-3xl">
								Payment Details
							</h2>
							<FormButton onClick={handleSubmit}>Proceed to Pay</FormButton>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
