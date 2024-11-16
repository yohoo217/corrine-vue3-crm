//src/ai/config.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default apiClient;