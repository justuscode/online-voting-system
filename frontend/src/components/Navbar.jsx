import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">🗳️ Online Voting System</div>
        <div className="flex gap-6 items-center">
          <Link to="/vote" className="hover:text-gray-300">Vote</Link>
          <Link to="/results" className="hover:text-gray-300">Results</Link>
          {user?.role === 'admin' && (
            <Link to="/admin/candidates" className="hover:text-gray-300">Admin</Link>
          )}
          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
