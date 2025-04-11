import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/color-logo.png';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const { login } = useAuth();

	const handleNavigate = () => {
		navigate('/register');
	};

	const handleLogin = async () => {
		try {
			setError('');
			const response = await axiosInstance.post('/login', {
				email: email.trim().toLowerCase(),
				password,
			});

			const { token, role } = response.data;
			login(token, role);

			// Redirect based on role
			const from = location.state?.from?.pathname || '/';
			switch (role.toLowerCase()) {
				case 'admin':
					navigate('/admin/dashboard', { replace: true });
					break;
				case 'teacher':
					navigate('/teacher/dashboard', { replace: true });
					break;
				case 'student':
					navigate('/logged/home', { replace: true });
					break;
				default:
					navigate(from, { replace: true });
			}
		} catch (error) {
			console.error('Login error:', error);
			setError(error.response?.data?.message || error.message);
		}
	};

	return (
		<div className="flex flex-col gap-8 justify-center items-center bg-primary-b h-screen w-full text-text-g">
			<div>
				<img src={logo} alt="" className="w-auto h-24" />
			</div>
			<div className="font-title text-3xl">
				<h2>Log in to Fyntrest</h2>
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
				<div className="flex flex-col w-full relative">
					<label className="text-md font-medium mb-2">Password</label>
					<div className="relative w-full">
						<input
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full rounded-md h-12 p-2 text-lg text-text-d bg-secondary-lt pr-10"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-3 flex items-center text-text-d"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<FaEyeSlash className="text-primary-fp" />
							) : (
								<FaEye className="text-primary-fp" />
							)}
						</button>
					</div>
				</div>
				{error && <div className="text-red-500 text-sm">{error}</div>}
				<div className="w-full h-full mt-4">
					<button
						className="w-full h-12 rounded-md text-md bg-secondary-l hover:bg-secondary-d transition-colors"
						onClick={handleLogin}
					>
						Login
					</button>
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<p className="text-text-g">Forgot Password?</p>
					<p className="text-text-g">
						Don't have an account?
						<span
							className="text-secondary-lt ml-2 cursor-pointer hover:text-secondary-d"
							onClick={handleNavigate}
						>
							Register!
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
