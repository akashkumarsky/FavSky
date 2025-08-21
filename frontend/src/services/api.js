import axios from 'axios';

// Define the base URL for your backend API
const API_URL = 'http://localhost:8077';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
