import axios from 'axios';

// This line checks if Vercel provided a URL. If not, it uses localhost.
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default instance;