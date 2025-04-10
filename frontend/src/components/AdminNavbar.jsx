import React, { useEffect, useState } from 'react';
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';

const AdminNavbar = () => {
	const [isnoti, setnoti] = useState(false);
	const [user, setUser] = useState({ firstName: '', lastName: '' });

	// Function to get initials
	const getInitials = (firstName, lastName) => {
		if (!firstName) return '';
		const firstInitial = firstName.charAt(0).toUpperCase();
		const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
		return `${firstInitial}${lastInitial}`;
	};

	const initials = getInitials(user.firstName, user.lastName);

	// Fetch user data from the backend
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch('http://localhost:8000/get-user', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
					},
				});
				if (response.ok) {
					const data = await response.json();
					setUser(data.user);
				} else {
					console.error('Failed to fetch user data');
				}
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};
		fetchUser();
	}, []);

	const noti = () => {
		setnoti(!isnoti);
	};

	return (
		<div className="h-16 text-text-g">
			{/* navbar content */}
			<div className="w-2/5 h-full place-self-end font-body">
				{/* navbar content */}
				<div className="flex items-center w-full h-full gap-8">
					<input
						type="text"
						className="border-none focus:outline-none rounded-full bg-primary_p px-4 w-2/3 h-10"
						placeholder="Search student, school, course, quiz etc.."
					/>
					<div>
						{isnoti ? (
							<IoMdNotificationsOutline size={30} className="cursor-pointer" />
						) : (
							<IoMdNotifications size={30} className="cursor-pointer" />
						)}
					</div>
					<div className="bg-secondary-dt p-2 flex items-center justify-center rounded-full">
						<p className="text-xl">{initials}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminNavbar;
