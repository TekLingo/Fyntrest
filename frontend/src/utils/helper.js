export const createSlug = (str) => {
	return str
		.toLowerCase()
		.replace(/[^\w\s-]/g, '') // Remove non-word characters
		.replace(/[\s_-]+/g, '-') // Replace spaces and underscores with dashes
		.replace(/^-+|-+$/g, ''); // Trim leading/trailing dashes
};

export const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};
