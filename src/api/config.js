//src/ai/config.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === "production" 
    ? "https://wangcom.online/api" // 正式環境的 API 路徑
    : "http://localhost:5001/api", // 本地開發的 API 路徑
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