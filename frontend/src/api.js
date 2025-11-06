import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',  // Laravel API base URL
});

// Add token to requests if available (for protected routes)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;