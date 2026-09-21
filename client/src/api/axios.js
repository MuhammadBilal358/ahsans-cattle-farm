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

// If an admin session expires (JWT is valid for 12h), the API answers 401.
// Clear the stale token and send the admin back to the login page instead of
// showing confusing "could not save" errors on every action.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || '';
    const hadToken = !!localStorage.getItem('acf_token');
    if (status === 401 && hadToken && !url.includes('/api/auth/login')) {
      localStorage.removeItem('acf_token');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.assign('/admin/login');
      }
    }
    return Promise.reject(err);
  }
);

export default api;
