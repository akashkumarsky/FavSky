import axios from 'axios';

const API_BASE_URL = 'http://localhost:8077';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Use an interceptor to dynamically set the Authorization header
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
