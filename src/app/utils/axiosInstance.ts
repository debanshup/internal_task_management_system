import axios from 'axios';

const axiosInstance = axios.create({
  // Dynamically set the base URL based on the environment
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // If you're using cookies for authentication
});

export default axiosInstance;
