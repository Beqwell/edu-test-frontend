import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function PassTestPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the test data on page load
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`/tests/${id}`);
        setTest(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load the test.');
      }
    };

    fetchTest();
  }, [id]);

  // Handle answer selection for single or multiple choice
  const handleChange = (questionId, answerId, isMultiple) => {
    setAnswers((prev) => {
      const prevAnswers = prev[questionId] || [];
      if (isMultiple) {
        if (prevAnswers.includes(answerId)) {
          return {
            ...prev,
            [questionId]: prevAnswers.filter((a) => a !== answerId),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...prevAnswers, answerId],
          };
        }
      } else {
        return {
          ...prev,
          [questionId]: [answerId],
        };
      }
    });
  };

  // Submit the test answers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { answers };
      const res = await axios.post(`/tests/${id}/pass`, payload);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to submit the answers.');
    }
  };

  if (error) return <p>{error}</p>;
  if (!test) return <p>Loading test...</p>;

  // Render result summary if test was submitted
  if (result) {
    return (
      <div style={{ maxWidth: 700, margin: 'auto', paddingTop: '2rem' }}>
        <h2>Test Result</h2>
        <p>Correct answers: {result.correctAnswers}</p>
        <p>Total questions: {result.totalQuestions}</p>
        <p>Score: {result.scorePercentage}%</p>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  // Render the test form
  return (
    <div style={{ maxWidth: 700, margin: 'auto', paddingTop: '2rem' }}>
      <h2>{test.title}</h2>
      <form onSubmit={handleSubmit}>
        {test.questions.map((question) => {
          const isMultiple = question.question_type === 'multiple';
          return (
            <div key={question.id} style={{ marginBottom: '2rem' }}>
              <p><strong>{question.question_text}</strong></p>
              {question.answers.map((answer) => (
                <label key={answer.id} style={{ display: 'block', marginBottom: '0.5rem' }}>
                  <input
                    type={isMultiple ? 'checkbox' : 'radio'}
                    name={`question-${question.id}`}
                    value={answer.id}
                    checked={(answers[question.id] || []).includes(answer.id)}
                    onChange={() => handleChange(question.id, answer.id, isMultiple)}
                  />
                  {' '}
                  {answer.answer_text}
                </label>
              ))}
            </div>
          );
        })}
        <button type="submit">Submit Test</button>
      </form>
    </div>
  );
}
