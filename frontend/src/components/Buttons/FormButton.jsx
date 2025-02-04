import React from 'react';

// Improved button component
const FormButton = ({ children, onClick, fullWidth = true }) => (
	<button
		className={`bg-secondary-d h-12 font-body rounded-md text-lg text-white
           hover:bg-secondary-darker transition-colors duration-200 ${
							fullWidth ? 'w-full' : 'px-8'
						}`}
		onClick={onClick}
	>
		{children}
	</button>
);

export default FormButton;
