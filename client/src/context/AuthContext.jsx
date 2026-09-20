import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('acf_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/api/auth/me')
      .then((res) => setUsername(res.data.username))
      .catch(() => {
        localStorage.removeItem('acf_token');
        setUsername(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(u, p) {
    const res = await api.post('/api/auth/login', { username: u, password: p });
    localStorage.setItem('acf_token', res.data.token);
    setUsername(res.data.username);
  }

  function logout() {
    localStorage.removeItem('acf_token');
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ username, isAuthed: !!username, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
