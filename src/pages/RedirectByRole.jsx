import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

export default function RedirectByRole() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Check user role from localStorage and redirect accordingly
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'teacher') {
      navigate('/teacher');
    } else if (token && role === 'student') {
      navigate('/dashboard');
    } else {
      setShowLogin(true); // show login page if no token is found
    }

    setDone(true);
  }, [navigate]);

  if (!done || !showLogin) return null;

  return <LoginPage />;
}
