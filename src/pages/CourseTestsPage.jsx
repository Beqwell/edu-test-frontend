import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import LogoutButton from '../components/LogoutButton';

export default function CourseTestsPage() {
  const { courseId } = useParams();
  const [tests, setTests] = useState([]);
  const [courseName, setCourseName] = useState('');
  const navigate = useNavigate();

  // Fetch all tests for the given course
  useEffect(() => {
    fetchTests();
    fetchCourseName();
  }, [courseId]);

  // Load tests by course ID
  const fetchTests = async () => {
    try {
      const res = await axios.get(`/tests/by-course?courseId=${courseId}`);
      setTests(res.data);
    } catch (err) {
      console.error('Failed to load tests', err);
    }
  };

  // Load course name based on course ID
  const fetchCourseName = async () => {
    try {
      const res = await axios.get('/courses');
      const course = res.data.find(c => c.id === parseInt(courseId));
      if (course) setCourseName(course.name);
    } catch (err) {
      console.error('Failed to load course name', err);
    }
  };

  // Navigate to test creation page
  const handleCreateTest = () => {
    navigate(`/teacher/course/${courseId}/new-test`);
  };

  // Navigate to view results of a specific test
  const handleViewResults = (testId) => {
    navigate(`/teacher/test/${testId}/results`);
  };

  return (
    <>
      <LogoutButton />
      <div style={{ maxWidth: 800, margin: 'auto', paddingTop: '2rem' }}>
        <h2>Tests in Course: {courseName}</h2>

        <button onClick={handleCreateTest} style={{ marginBottom: '1.5rem' }}>
          Create New Test
        </button>

        {tests.length === 0 ? (
          <p>No tests available in this course</p>
        ) : (
          <ul>
            {tests.map((test) => (
              <li key={test.id} style={{ marginBottom: '1rem' }}>
                <strong>{test.title}</strong>{' '}
                <button onClick={() => handleViewResults(test.id)}>
                  View Results
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
