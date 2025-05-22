import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import LogoutButton from '../components/LogoutButton';

export default function TeacherPanel() {
  const [courseName, setCourseName] = useState('');
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Load all teacher's courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await axios.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to load courses', err);
    }
  };

  // Create a new course
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/courses', { name: courseName });
      setCourseName('');
      fetchCourses();
      alert(`Course created. Join code: ${res.data.join_code}`);
    } catch (err) {
      console.error('Failed to create course', err);
    }
  };

  // Delete a course with confirmation
  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course? All related tests and results will also be deleted!');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/courses/${courseId}`);
      fetchCourses();
    } catch (err) {
      console.error('Failed to delete course', err);
    }
  };

  return (
    <>
      <LogoutButton />
      <div style={{ maxWidth: 800, margin: 'auto', paddingTop: '2rem' }}>
        <h2>Create Course</h2>
        <form onSubmit={handleCreateCourse} style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: '1rem' }}>Create</button>
        </form>

        <h2>Your Courses</h2>
        {courses.length === 0 ? (
          <p>No courses created</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course.id} style={{ marginBottom: '1rem' }}>
                <strong>{course.name}</strong> (Join code: {course.join_code})<br />
                <button onClick={() => navigate(`/teacher/course/${course.id}`)} style={{ marginRight: '1rem' }}>
                  View Tests
                </button>
                <button onClick={() => handleDeleteCourse(course.id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                  Delete Course
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
