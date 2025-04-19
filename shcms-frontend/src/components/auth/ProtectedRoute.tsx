// src/components/auth/ProtectedRoute.tsx
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
}