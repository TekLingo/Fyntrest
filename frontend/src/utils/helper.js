// utils/helper.js
export const createSlug = (str) => {
	return str
		.toLowerCase()
		.replace(/[^\w\s-]/g, '') // Remove non-word characters
		.replace(/[\s_-]+/g, '-') // Replace spaces and underscores with dashes
		.replace(/^-+|-+$/g, ''); // Trim leading/trailing dashes
};
