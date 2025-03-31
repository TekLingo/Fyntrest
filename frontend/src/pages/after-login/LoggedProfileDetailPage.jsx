import React, { useEffect, useState } from 'react';
import { HiOutlinePencil } from 'react-icons/hi2';
import { LuArrowLeft } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../../assets/Images/profilePage.png';
import axiosInstance from '../../utils/axiosInstance';

const LoggedProfileDetailPage = () => {
	const navigate = useNavigate();

	// State to manage edit mode
	const [isEditMode, setIsEditMode] = useState(false);

	// State to show account deleted message
	const [accountDeleted, setAccountDeleted] = useState(false);

	// State for storing user details
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		gender: 'Prefer not to say',
		email: '',
		school: '',
		schoolCode: '',
		grade: '',
	});

	// Fetch current user details when component mounts
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axiosInstance.get('get-user');
				const data = response.data.user;
				if (data) {
					setFormData({
						firstName: data.firstName || '',
						lastName: data.lastName || '',
						gender: data.gender || 'Prefer not to say',
						email: data.email || '',
						school: data.school || '',
						schoolCode: data.schoolCode || '',
						grade: data.grade || '',
					});
				}
			} catch (error) {
				console.error('Error fetching user details:', error);
			}
		};

		fetchUserData();
	}, [navigate]);

	// Navigation function to go back
	const navBack = () => {
		navigate(-1);
	};

	// Enable edit mode when the pencil icon is clicked
	const handleEditClick = () => {
		setIsEditMode(true);
	};

	// Handle input changes for controlled components
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Save updated details to the backend
	const handleSave = async () => {
		try {
			const response = await axiosInstance.put('/user/update-user', formData);
			console.log(response.data.message);
			setIsEditMode(false);
		} catch (error) {
			console.error('Error updating user details:', error);
		}
	};

	// Handle user logout
	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	// Handle account deletion with confirmation
	const handleDelete = async () => {
		const confirmed = window.confirm(
			'Are you sure you want to delete your account? This action cannot be undone.'
		);
		if (!confirmed) return;

		try {
			const response = await axiosInstance.delete('/user/delete-user');
			console.log(response.data.message);
			// Show a sad goodbye message after deletion
			setAccountDeleted(true);
			localStorage.removeItem('token');
			// Redirect to the login page after a delay (e.g., 3 seconds)
			setTimeout(() => {
				navigate('/login');
			}, 3000);
		} catch (error) {
			console.error('Error deleting account:', error);
		}
	};

	// If account has been deleted, show a goodbye message
	if (accountDeleted) {
		return (
			<div className="flex flex-col items-center justify-center h-screen text-text-g font-body">
				<h1 className="text-3xl mb-4">We're sorry to see you go.</h1>
				<p>Your account has been deleted. Take care and come back anytime.</p>
			</div>
		);
	}

	return (
		<div className="text-text-g flex-col gap-2 flex font-body">
			{/* Makeshift Navbar */}
			<div className="h-14 px-10 flex justify-between items-end">
				<LuArrowLeft className="w-auto h-8 cursor-pointer" onClick={navBack} />
				<div>
					{isEditMode && (
						<p
							className="text-secondary-dt text-xl cursor-pointer"
							onClick={handleSave}
						>
							Save
						</p>
					)}
				</div>
			</div>

			{/* Info Section */}
			<div className="flex items-center justify-center">
				{/* Image Section */}
				<div className="flex items-center justify-center">
					<img
						src={ProfileImg}
						alt="Profile"
						className="rounded-full flex self-end w-36 h-auto border-2 border-purple-400 overflow-hidden"
					/>
					<div
						className="h-10 w-10 flex justify-center items-center cursor-pointer text-secondary-d self-end hover:bg-secondary-d hover:text-text-g rounded-full"
						onClick={handleEditClick}
					>
						<HiOutlinePencil className="w-auto h-6" />
					</div>
				</div>
			</div>

			{/* Edit Section */}
			<div className="flex w-full justify-center items-center">
				<div className="flex justify-center">
					<div className="w-full grid grid-cols-2 gap-6 p-8">
						<div className="col-span-1">
							<label className="text-text-g text-sm">First Name</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
								className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
								disabled={!isEditMode}
							/>
						</div>
						<div className="col-span-1">
							<label className="text-text-g text-sm">Last Name</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
								disabled={!isEditMode}
							/>
						</div>
						<div className="col-span-1">
							<label className="text-text-g text-sm">Gender</label>
							<select
								name="gender"
								value={formData.gender}
								onChange={handleInputChange}
								className="w-full p-2 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
								disabled={!isEditMode}
							>
								<option>Prefer not to say</option>
								<option>Male</option>
								<option>Female</option>
								<option>Other</option>
							</select>
						</div>
						<div className="col-span-1">
							<label className="text-text-g text-sm">Email Id</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
								disabled
							/>
						</div>
						<div className="col-span-2">
							<label className="text-text-g text-sm">School</label>
							<input
								type="text"
								name="school"
								value={formData.school}
								onChange={handleInputChange}
								className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
								disabled={!isEditMode}
							/>
						</div>
						<div className="col-span-1">
							<label className="text-text-g text-sm">School Code</label>
							<input
								type="text"
								name="schoolCode"
								value={formData.schoolCode}
								onChange={handleInputChange}
								className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
								disabled={!isEditMode}
							/>
						</div>
						<div className="col-span-1">
							<label className="text-text-g text-sm">Grade</label>
							<input
								type="text"
								name="grade"
								value={formData.grade}
								onChange={handleInputChange}
								className="w-full p-4 h-12 bg-bg-color text-white rounded-lg border border-secondary-lt focus:outline-none"
								disabled={!isEditMode}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Account Section */}
			<div className="flex gap-20 justify-center items-center font-body">
				<div className="cursor-pointer text-lg" onClick={handleDelete}>
					Delete Account
				</div>
				<div
					className="cursor-pointer text-[#FF474A] text-lg"
					onClick={handleLogout}
				>
					Log Out
				</div>
			</div>
		</div>
	);
};

export default LoggedProfileDetailPage;
