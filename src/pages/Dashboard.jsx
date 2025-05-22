import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

export default function Dashboard() {
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinCode, setJoinCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Check auth and load tests/results on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'student') {
      navigate('/');
      return;
    }

    fetchTests();
    fetchResults();
  }, []);

  // Fetch available tests for student
  const fetchTests = async () => {
    try {
      const res = await axios.get('/tests');
      setTests(res.data);
    } catch (err) {
      console.error('Failed to fetch tests', err);
      if (err.response?.status === 401) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch student's past results
  const fetchResults = async () => {
    try {
      const res = await axios.get('/results');
      setResults(res.data);
    } catch (err) {
      console.error('Failed to fetch results', err);
    }
  };

  // Join a course using a join code
  const handleJoinCourse = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await axios.post('/courses/join', { join_code: joinCode });
      setMessage('Successfully joined the course.');
      fetchTests();
    } catch (err) {
      console.error(err);
      setMessage('Failed to join course.');
    }
  };

  if (loading) return <p>Loading tests...</p>;

  return (
    <>
      <LogoutButton />
      <div style={{ maxWidth: 800, margin: 'auto', paddingTop: '2rem' }}>
        <h2>Available Tests</h2>

        <form onSubmit={handleJoinCourse} style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Enter course join code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: '1rem' }}>
            Join Course
          </button>
        </form>

        {message && <p>{message}</p>}

        {tests.length === 0 ? (
          <p>No tests available</p>
        ) : (
          <ul>
            {tests.map((test) => (
              <li key={test.id}>
                <strong>{test.title}</strong> ({test.course?.name || 'No course'}){' '}
                <button onClick={() => navigate(`/test/${test.id}`)}>
                  Pass Test
                </button>
              </li>
            ))}
          </ul>
        )}

        <h2 style={{ marginTop: '3rem' }}>Your Results</h2>
        {results.length === 0 ? (
          <p>No results yet.</p>
        ) : (
          <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
            <thead>
              <tr>
                <th>Test</th>
                <th>Course</th>
                <th>Correct Answers</th>
                <th>Total Questions</th>
                <th>Score (%)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td>{r.testTitle || r.test?.title || 'Untitled'}</td>
                  <td>{r.test?.course?.name || 'No course'}</td>
                  <td>{r.correctAnswers}</td>
                  <td>{r.totalQuestions}</td>
                  <td>{r.scorePercentage}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
