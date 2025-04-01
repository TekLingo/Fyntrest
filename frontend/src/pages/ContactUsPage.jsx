import React from 'react';
import { GoMail } from 'react-icons/go';
import { MdOutlineLocalPhone, MdOutlineLocationOn } from 'react-icons/md';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import axiosInstance from '../utils/axiosInstance';

const ContactUsPage = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const data = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			email: formData.get('email'),
			role: formData.get('role'),
			phoneNumber: formData.get('phoneNumber'),
			message: formData.get('message'),
		};

		try {
			await axiosInstance.post('/contact-us', data);
			alert('Form submitted successfully');
			e.target.reset(); // Clear the form
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('Failed to submit the form');
		}
	};

	return (
		<div className="flex flex-col gap-10">
			<Navbar2 />
			<div className="flex justify-around">
				<div className="flex flex-col gap-10">
					<div>
						<h2 className="text-3xl font-title text-secondary-l">Contact Us</h2>
					</div>
					<div className="text-text-g flex flex-col gap-4">
						<div className="flex gap-4 items-center">
							<MdOutlineLocationOn className="w-auto h-6" />
							<p className="text-white">
								Office location would come here, Pune-411052
							</p>
						</div>
						<div className="flex gap-4 items-center">
							<MdOutlineLocalPhone className="w-auto h-6" />
							<p className="text-white">+91 00000 00000</p>
						</div>
						<div className="flex gap-4 items-center">
							<GoMail className="w-auto h-6" />
							<p className="text-white">xyz.fyntrest@gmail.com</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-10">
					<h2 className="text-3xl font-title text-secondary-l">Chat with us</h2>
					<div className="flex items-center justify-center font-body">
						<form
							onSubmit={handleSubmit}
							className="w-full max-w-2xl grid grid-cols-2 gap-4"
						>
							<div className="col-span-1">
								<label className="text-sm text-white">First Name</label>
								<input
									name="firstName"
									type="text"
									className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none"
									required
								/>
							</div>
							<div className="col-span-1">
								<label className="text-sm text-white">Last Name</label>
								<input
									name="lastName"
									type="text"
									className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none"
									required
								/>
							</div>
							<div className="col-span-2">
								<label className="text-sm text-white">Email Address</label>
								<input
									name="email"
									type="email"
									className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none"
									required
								/>
							</div>
							<div className="col-span-2 flex justify-around">
								<label className="text-sm text-white flex items-center">
									<input
										name="role"
										type="radio"
										value="Student"
										className="mr-2"
										required
									/>{' '}
									Student
								</label>
								<label className="text-sm text-white flex items-center">
									<input
										name="role"
										type="radio"
										value="Parent"
										className="mr-2"
										required
									/>{' '}
									Parent
								</label>
								<label className="text-sm text-white flex items-center">
									<input
										name="role"
										type="radio"
										value="Teacher"
										className="mr-2"
										required
									/>{' '}
									Teacher
								</label>
								<label className="text-sm text-white flex items-center">
									<input
										name="role"
										type="radio"
										value="School"
										className="mr-2"
										required
									/>{' '}
									School
								</label>
							</div>
							<div className="col-span-2">
								<label className="text-sm text-white">Phone Number</label>
								<input
									name="phoneNumber"
									type="text"
									className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none"
									required
								/>
							</div>
							<div className="col-span-2">
								<label className="text-sm text-white">Message</label>
								<textarea
									name="message"
									placeholder="Leave a message"
									className="w-full p-2 bg-primary_p text-text-g rounded-lg focus:outline-none h-24"
									required
								></textarea>
							</div>
							<div className="col-span-2">
								<button
									type="submit"
									className="w-full p-2 bg-secondary-l text-white rounded-lg"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ContactUsPage;
