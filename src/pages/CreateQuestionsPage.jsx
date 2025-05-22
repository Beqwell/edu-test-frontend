import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import LogoutButton from '../components/LogoutButton';

export default function CreateQuestionsPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [isMultiple, setIsMultiple] = useState(false);
  const [answerOptions, setAnswerOptions] = useState([{ text: '', isCorrect: false }]);
  const [message, setMessage] = useState('');
  const [existingQuestions, setExistingQuestions] = useState([]);
  const [courseId, setCourseId] = useState(null); // used for navigation after publishing

  // Load existing questions and course ID for redirection
  useEffect(() => {
    fetchExistingQuestions();
  }, [testId]);

  // Fetch existing questions for this test
  const fetchExistingQuestions = async () => {
    try {
      const res = await axios.get(`/tests/${testId}`);
      setExistingQuestions(res.data.questions || []);
      setCourseId(res.data.courseId);
    } catch (err) {
      console.error('Failed to fetch questions', err);
    }
  };

  // Add a new answer option field
  const handleAddOption = () => {
    setAnswerOptions([...answerOptions, { text: '', isCorrect: false }]);
  };

  // Handle changes to answer option fields
  const handleOptionChange = (index, field, value) => {
    const updated = [...answerOptions];
    if (field === 'isCorrect') {
      if (isMultiple) {
        updated[index].isCorrect = value.target.checked;
      } else {
        updated.forEach((opt, i) => {
          opt.isCorrect = i === index;
        });
      }
    } else {
      updated[index].text = value;
    }
    setAnswerOptions(updated);
  };

  // Submit new question to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const hasCorrect = answerOptions.some(opt => opt.isCorrect);
    if (!hasCorrect) {
      setMessage('There must be at least one correct answer');
      return;
    }

    try {
      await axios.post(`/tests/${testId}/questions`, {
        text: questionText,
        isMultiple,
        answers: answerOptions
      });

      setQuestionText('');
      setIsMultiple(false);
      setAnswerOptions([{ text: '', isCorrect: false }]);
      setMessage('Question added');
      await fetchExistingQuestions();
    } catch (err) {
      console.error('Failed to add question', err);
      setMessage('Failed to add question');
    }
  };

  // Publish the test and navigate back to course test list
  const handlePublish = async () => {
    try {
      await axios.post(`/tests/${testId}/publish`);
      navigate(`/teacher/course/${courseId}`);
    } catch (err) {
      console.error('Failed to publish test', err);
      alert('Failed to publish the test');
    }
  };

  return (
    <>
      <LogoutButton />
      <div style={{ maxWidth: 700, margin: 'auto', paddingTop: '2rem' }}>
        <h2>Add questions to test #{testId}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Question text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            style={{ width: '100%', height: '80px', marginBottom: '1rem' }}
          />

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              checked={isMultiple}
              onChange={(e) => setIsMultiple(e.target.checked)}
            />
            {' '}Allow multiple correct answers
          </label>

          <div>
            {answerOptions.map((option, i) => (
              <div key={i} style={{ marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Answer option"
                  value={option.text}
                  onChange={(e) => handleOptionChange(i, 'text', e.target.value)}
                  required
                  style={{ width: '60%' }}
                />
                <label style={{ marginLeft: '1rem' }}>
                  <input
                    type={isMultiple ? 'checkbox' : 'radio'}
                    name="correctOption"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(i, 'isCorrect', e)}
                  />
                  {' '}Correct
                </label>
              </div>
            ))}
          </div>

          <button type="button" onClick={handleAddOption} style={{ marginTop: '1rem' }}>
            Add another option
          </button>

          <br /><br />
          <button type="submit">Save Question</button>
        </form>

        {message && (
          <p style={{ marginTop: '1rem', color: message.includes('Failed') ? 'red' : 'green' }}>
            {message}
          </p>
        )}

        <h3 style={{ marginTop: '3rem' }}>Existing Questions:</h3>
        {existingQuestions.length === 0 ? (
          <p>No questions yet</p>
        ) : (
          <ol>
            {existingQuestions.map((q) => (
              <li key={q.id} style={{ marginBottom: '1rem' }}>
                <strong>{q.question_text}</strong> {q.question_type === 'multiple' ? '(multiple correct)' : '(single correct)'}
                <ul>
                  {q.answers.map((a) => (
                    <li key={a.id}>
                      {a.answer_text} {a.is_correct ? '✅' : ''}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        )}

        <hr style={{ marginTop: '2rem' }} />
        <button
          onClick={handlePublish}
          style={{ backgroundColor: 'green', color: 'white', padding: '0.8rem 1.5rem', fontWeight: 'bold' }}
          disabled={existingQuestions.length === 0}
        >
          Publish Test
        </button>
      </div>
    </>
  );
}
