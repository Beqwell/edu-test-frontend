import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import LogoutButton from '../components/LogoutButton';

export default function CreateTestPage() {
  const { courseId } = useParams();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Create a new test and navigate to the question creation page
  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/tests', {
        title,
        courseId,
        isVisible: true
      });

      const testId = res.data.id;
      navigate(`/teacher/test/${testId}/questions`);
    } catch (err) {
      console.error('Failed to create test', err);
      setError('Failed to create the test');
    }
  };

  return (
    <>
      <LogoutButton />
      <div style={{ maxWidth: 600, margin: 'auto', paddingTop: '2rem' }}>
        <h2>Create a test for course #{courseId}</h2>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Test title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
          <button type="submit">Create Test</button>
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </form>
      </div>
    </>
  );
}
