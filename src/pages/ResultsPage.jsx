import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import LogoutButton from '../components/LogoutButton';

export default function ResultsPage() {
  const { testId } = useParams();
  const [results, setResults] = useState([]);
  const [testTitle, setTestTitle] = useState('');

  // Load results when the page loads or testId changes
  useEffect(() => {
    fetchResults();
  }, [testId]);

  // Fetch test results from the server
  const fetchResults = async () => {
    try {
      const res = await axios.get(`/results?testId=${testId}`);
      setResults(res.data);

      if (res.data.length > 0 && res.data[0].test?.title) {
        setTestTitle(res.data[0].test.title);
      }
    } catch (err) {
      console.error('Failed to load results', err);
    }
  };

  return (
    <>
      <LogoutButton />
      <div style={{ maxWidth: 800, margin: 'auto', paddingTop: '2rem' }}>
        <h2>Test Results: {testTitle}</h2>

        {results.length === 0 ? (
          <p>No results available</p>
        ) : (
          <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Correct</th>
                <th>Total</th>
                <th>Score (%)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td>{r.student?.username || 'N/A'}</td>
                  <td>{r.correctAnswers}</td>
                  <td>{r.totalQuestions}</td>
                  <td>{r.scorePercentage}%</td>
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
