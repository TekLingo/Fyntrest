import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/color-logo.png';
import axiosInstance from '../../utils/axiosInstance';

const Verify = () => {
	const [otp, setOtp] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const { email } = location.state || {}; // Get email from previous step

	// Update handleClick in Verify component
	const handleClick = async () => {
		try {
			console.log('Sending OTP verification request with email:', email);
			const response = await axiosInstance.post(
				'/verify-otp',
				{ email, otp },
				{ headers: { 'Content-Type': 'application/json' } }
			);

			console.log('Verification successful:', response.data);
			localStorage.setItem('registrationToken', response.data.token);
			navigate('/personal-info');
		} catch (error) {
			console.error('Verification error:', error);
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error('Server responded with:', error.response.data);
				console.error('Status code:', error.response.status);
			} else if (error.request) {
				// The request was made but no response was received
				console.error('No response received:', error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error('Request setup error:', error.message);
			}
		}
	};

	const handleLoginClick = () => {
		navigate('/login');
	};

	return (
		<div>
			<div className="flex flex-col gap-10 justify-center items-center bg-primary-b h-screen w-full text-text-g">
				<div>
					<img src={logo} alt="" className="w-auto h-24" />
				</div>
				<div className="font-title text-3xl">
					<h2>Register to Fyntrest</h2>
				</div>
				<div className="flex flex-col items-center gap-6 p-4 w-96">
					<div className="flex flex-col w-full">
						<label className="text-md font-medium mb-2">Enter Otp</label>
						<input
							type="otp"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
						/>
					</div>
					<div className="w-full h-full mt-4">
						<button
							className="w-full h-12 rounded-md text-md bg-secondary-l"
							onClick={handleClick}
						>
							Reigster
						</button>
					</div>
					<div className="flex flex-col justify-center items-center">
						<p>
							Already have an account?
							<span
								className="text-secondary-lt ml-1 cursor-pointer"
								onClick={handleLoginClick}
							>
								Login!
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Verify;
