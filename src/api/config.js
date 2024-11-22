//src/ai/config.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://wangcom.online/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});


apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 確保格式為 `Bearer <token>`
    }
    return config;
  },
  error => Promise.reject(error)
);

export default apiClient;