import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthed, loading } = useAuth();

  if (loading) return <div className="container" style={{ padding: '60px 0' }}>Loading…</div>;
  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  return children;
}
