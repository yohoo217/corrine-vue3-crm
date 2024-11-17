//src/ai/config.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api', // 如果要改在本地或是線上運作，這裡要改
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