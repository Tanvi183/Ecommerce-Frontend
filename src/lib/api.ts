import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Crucial for sending/receiving cookies (like our refresh token)
});

// Request Interceptor: Attach Access Token to every request
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to silently refresh the token via HttpOnly cookie
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = res.data;

        // Update the in-memory Zustand store with the new access token
        const { user } = useAuthStore.getState();
        if (user) {
           useAuthStore.getState().setAuth(user, accessToken);
        }

        // Retry the original failed request with the new access token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If the refresh token is also invalid/expired, completely clear auth state
        useAuthStore.getState().clearAuth();
        
        // Optionally, redirect to login page here, or just reject the promise
        if (typeof window !== 'undefined') {
            // window.location.href = '/auth/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
