import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TeacherPanel from './pages/TeacherPanel';
import PassTestPage from './pages/PassTestPage';
import RedirectByRole from './pages/RedirectByRole';
import RequireAuth from './components/RequireAuth';

import CourseTestsPage from './pages/CourseTestsPage';
import CreateTestPage from './pages/CreateTestPage';
import CreateQuestionsPage from './pages/CreateQuestionsPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        {/* Auto-redirect by role or show login */}
        <Route path="/" element={<RedirectByRole />} />

        {/* Registration page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Student access */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth role="student">
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/test/:id"
          element={
            <RequireAuth role="student">
              <PassTestPage />
            </RequireAuth>
          }
        />

        {/* Teacher access */}
        <Route
          path="/teacher"
          element={
            <RequireAuth role="teacher">
              <TeacherPanel />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/course/:courseId"
          element={
            <RequireAuth role="teacher">
              <CourseTestsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/course/:courseId/new-test"
          element={
            <RequireAuth role="teacher">
              <CreateTestPage />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/test/:testId/questions"
          element={
            <RequireAuth role="teacher">
              <CreateQuestionsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/test/:testId/results"
          element={
            <RequireAuth role="teacher">
              <ResultsPage />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
