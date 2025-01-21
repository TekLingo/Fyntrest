export const createSlug = (title) => {
	// Ensure this returns a valid slug
	if (!title) {
		console.error('Title is undefined or empty');
		return '';
	}
	return title.toLowerCase().replace(/\s+/g, '-');
};
