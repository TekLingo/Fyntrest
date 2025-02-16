import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/color-logo.png';
import axiosInstance from '../../utils/axiosInstance';

const Register = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleClick = async () => {
		try {
			setError('');
			const response = await axiosInstance.post('/register', {
				email,
			});

			navigate('/verify', { state: { email } });
			console.log('Register response:', response.data);
		} catch (error) {
			console.error('Full error details:', {
				message: error.message,
				response: error.response?.data,
				status: error.response?.status,
				headers: error.response?.headers,
			});
			setError(error.response?.data?.message || error.message);
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
						<label className="text-md font-medium mb-2">Email Address</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full h-12 rounded-md p-2 text-lg text-text-d text-body bg-secondary-lt"
						/>
					</div>
					<div className="w-full h-full mt-4">
						<button
							className="w-full h-12 rounded-md text-md bg-secondary-l"
							onClick={handleClick}
						>
							Verify
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

export default Register;
