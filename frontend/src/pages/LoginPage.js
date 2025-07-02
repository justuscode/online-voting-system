import React, { useState } from 'react';
import axios from 'axios';
import './PageStyles.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (res.data.success) {
        navigate('/vote');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error or invalid credentials');
    }
  };

  return (
    <div className="page-container">
      <h2>Login to Online Voting System</h2>
      <form onSubmit={handleLogin} className="form-box">
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
