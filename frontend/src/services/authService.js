import api from './api';

const AuthService = {
  // Function to handle user login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/signin', { email, password });
      if (response.data.jwt) {
        localStorage.setItem('jwt', response.data.jwt);
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Function to handle user registration
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      if (response.data.jwt) {
        localStorage.setItem('jwt', response.data.jwt);
      }
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  // Function to handle user logout
  logout: () => {
    localStorage.removeItem('jwt');
  },

  // Function to get the current user's profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/users/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
};

export default AuthService;
