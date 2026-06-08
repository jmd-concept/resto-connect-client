import axios from 'axios';

export const API_CONFIG = {
    development: {
        apiBaseUrl: process.env.NEXT_PUBLIC_DEV_BACKEND_URL || 'http://127.0.0.1:5003/endPoint' || 'http://localhost:5003/endPoint',
    },
    production: {
        apiBaseUrl: process.env.NEXT_PUBLIC_PRO_BACKEND_URL || 'https://jmd-restoconnect-backend.vercel.app',
    },
};

const env = process.env.NODE_ENV || 'development';
const API_BASE_URL = API_CONFIG[env]?.apiBaseUrl || API_CONFIG.development.apiBaseUrl;

// INSTANCE
const http = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 50000,
    validateStatus: (status) => {
        return status < 500;
    }
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        // ignorer les 401 normaux
        if (error.response?.status === 401) {
            return Promise.reject(error);
        }

        console.error(error);
        return Promise.reject(error);
    }
);

export default http
