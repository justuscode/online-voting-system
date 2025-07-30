import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected user routes */}
            <Route
              path="/vote"
              element={
                <PrivateRoute>
                  <VotePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/results"
              element={
                <PrivateRoute>
                  <ResultsPage />
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

            {/* Fallback route */}
            <Route
              path="*"
              element={
                <div className="p-8 text-center text-lg text-gray-600">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
