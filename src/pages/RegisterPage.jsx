import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle user registration and redirect to login
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/auth/register', {
        username,
        password,
        role,
      });

      navigate('/', { state: { registered: true } });
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: '3rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br /><br />

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select><br /><br />

        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
