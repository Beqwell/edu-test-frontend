import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  console.log('RequireAuth → token:', token);
  console.log('RequireAuth → expected role:', role);
  console.log('RequireAuth → actual role:', userRole);

  if (!token || userRole !== role) {
    console.warn('Access denied — redirecting...');
    return <Navigate to="/" replace />;
  }

  console.log(' Access granted');
  return children;
}
