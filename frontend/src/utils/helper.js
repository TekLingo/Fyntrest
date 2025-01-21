export const createSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

export default {
  createSlug,
};
