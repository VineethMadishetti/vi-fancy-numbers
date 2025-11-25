import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if deployed
  withCredentials: true, // IMPORTANT: Allows sending/receiving httpOnly cookies
});

export default instance;