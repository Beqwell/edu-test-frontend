import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TeacherPanel from './pages/TeacherPanel';
import PassTestPage from './pages/PassTestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teacher" element={<TeacherPanel />} />
      <Route path="/test/:id" element={<PassTestPage />} />
    </Routes>
  );
}

export default App;
