import axios from 'axios';
import { BASE_URL } from './constants';

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('token');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// Handle specific error status codes
			switch (error.response.status) {
				case 401:
					// Handle unauthorized access
					localStorage.removeItem('token');
					window.location.href = '/login';
					break;
				case 403:
					// Handle forbidden access
					window.location.href = '/unauthorized';
					break;
				case 404:
					// Handle not found
					console.error('Resource not found');
					break;
				default:
					console.error('An error occurred:', error.response.data);
			}
		} else if (error.request) {
			// The request was made but no response was received
			console.error('No response received:', error.request);
		} else {
			// Something happened in setting up the request
			console.error('Error setting up request:', error.message);
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
