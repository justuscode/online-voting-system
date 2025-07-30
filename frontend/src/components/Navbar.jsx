import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navLinkClass = (path) =>
    location.pathname === path
      ? 'text-white bg-blue-700 px-3 py-2 rounded-lg'
      : 'text-blue-700 hover:text-white hover:bg-blue-500 px-3 py-2 rounded-lg transition';

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          
        </Link>

        <nav className="space-x-4 hidden md:block">
          <Link to="/" className={navLinkClass('/')}>Home</Link>
          <Link to="/vote" className={navLinkClass('/vote')}>Vote</Link>
          <Link to="/results" className={navLinkClass('/results')}>Results</Link>
          <Link to="/admin/login" className={navLinkClass('/admin/login')}>Admin</Link>
        </nav>

        <div className="hidden md:block">
          <Link to="/login" className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
            Sign In
          </Link>
        </div>

        {/* Mobile Hamburger (Optional) */}
        {/* Add your hamburger/mobile menu here if needed */}
      </div>
    </header>
  );
};

export default Header;
