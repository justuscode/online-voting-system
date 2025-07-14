import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected voter route */}
        <Route
          path="/vote"
          element={
            <PrivateRoute>
              <VotePage />
            </PrivateRoute>
          }
        />

        {/* Protected admin route */}
        <Route
          path="/admin/candidates"
          element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
