import axios from 'axios';

// In dev, Vite proxies /api and /uploads to the backend (see vite.config.js),
// so this can stay relative — no need to hardcode a host/port.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/' });


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('acf_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
