import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Quan trọng để gửi cookies (JWT)
});

// Tự động thêm Bearer Token nếu có
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Lỗi khi lấy access_token từ localStorage:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
