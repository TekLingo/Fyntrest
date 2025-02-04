import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormButton from '../../components/Buttons/FormButton';
import axiosInstance from '../../utils/axiosInstance';

const PersonalInfo = () => {
	const [activeSection, setActiveSection] = useState('personal');
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		gender: '',
		password: '',
		school: '',
		class: '',
	});

	const handleInputChange = useCallback((e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}, []);

	const validateForm = () => {
		if (
			!formData.firstName ||
			!formData.lastName ||
			!formData.gender ||
			!formData.password
		) {
			setError('Please fill in all required fields.');
			return false;
		}
		setError('');
		return true;
	};

	const handleSubmit = useCallback(async () => {
		if (!validateForm()) return;
		try {
			const registrationToken = localStorage.getItem('registrationToken');
			const response = await axiosInstance.post(
				'/api/auth/complete-registration',
				{
					token: registrationToken,
					...formData,
				}
			);

			localStorage.removeItem('registrationToken');
			localStorage.setItem('token', response.data.token);
			navigate('/logged/home');
		} catch (error) {
			setError('Registration failed. Please try again.');
			console.error('Registration error:', error);
		}
	}, [formData, navigate]);

	return (
		<div className="flex flex-col items-center w-full h-screen absolute top-20">
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

			{error && <p className="text-red-500 mt-4">{error}</p>}

			<div className="w-full flex justify-center">
				<div className="p-6 w-3/4 rounded-lg">
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
										className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
									/>
								</div>
							</div>
							<div className="flex flex-col w-1/3">
								<label className="text-sm font-medium mb-2 text-text-g">
									Class
								</label>
								<select
									className="w-full h-12 rounded-md p-2 text-lg text-text-d bg-secondary-lt border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
									type="text"
									name="class"
									value={formData.class}
									onChange={handleInputChange}
								>
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
