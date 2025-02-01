import React from 'react';
import Email from '../../components/Input-fields/Email';
import logo from '../../assets/Images/Color Logo.png';

const Signup = () => {
	return (
		<div className="font-tittle min-h-screen bg-bg-color flex items-center justify-center flex-col relative">
			<img src={logo} className="w-40 h-auto absolute top-40" alt="/" />
			<div className="text-text-g font-bold text-5xl absolute top-80">
				Sign Up to Fyntrest
			</div>
			<Email />
		</div>
	);
};

export default Signup;
