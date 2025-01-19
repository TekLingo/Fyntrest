import React from 'react';
import logo from '../assets/Images/Color Logo.png';
import Flag from '../assets/Images/flag.png';

const Footer = () => {
	return (
		<div className="bg-primary-fp w-full py-20">
			<div className="flex flex-col w-11/12 mx-auto justify-center bg-primary-fp ">
				{/* Logo Section */}
				<div className="flex pb-10">
					<img src={logo} className="w-36 h-auto" alt="" />
				</div>

				{/* Grid Section */}
				<div className="flex flex-row gap-8 items-start text-text-g px-6 font-body">
					<div className="flex-1 min-w-[175px]">
						<h2 className="font-title text-xl mb-6">Courses</h2>
						<ul className="space-y-2">
							<li>8th grade</li>
							<li>9th grade</li>
							<li>10th grade</li>
						</ul>
					</div>
					<div className="flex-1 min-w-[175px]">
						<h2 className="font-title text-xl mb-6">About</h2>
						<ul className="space-y-2">
							<li>Getting Started</li>
							<li>Out Story</li>
							<li>Vision</li>
							<li>Mission</li>
						</ul>
					</div>
					<div className="flex-1 min-w-[175px]">
						<h2 className="font-title text-xl mb-6">Company</h2>
						<ul className="space-y-2">
							<li>Careers</li>
							<li>Blog</li>
							<li>Testimonials</li>
						</ul>
					</div>
					<div className="flex-1 min-w-[175px]">
						<h2 className="font-title text-xl mb-6">Legal</h2>
						<ul className="space-y-2">
							<li>Privacy Policy</li>
							<li>Terms of service</li>
						</ul>
					</div>
					<div className="flex-1 min-w-[175px]">
						<h2 className="font-title text-xl mb-6">Social Media</h2>
						<ul className="space-y-2">
							<li>Instagram</li>
							<li>Youtube</li>
							<li>LinkedIn</li>
							<li>X/Twitter</li>
						</ul>
					</div>
					<div className="flex-1 min-w-[175px]">
						<h2 className="font-title text-xl mb-6">Contact</h2>
						<ul className="space-y-2">
							<li className="flex">
								<img src={Flag} className="mr-2" alt="Indian Flag" /> +91 00000
								00000
							</li>
							<li>Office location would come here, Pune-411052</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
