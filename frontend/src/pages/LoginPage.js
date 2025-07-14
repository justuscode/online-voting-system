import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
    setVoterId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ✅ Validation for Voter ID
    if (isRegistering) {
      const voterIdPattern = /^[0-9]{8,10}$/;
      if (!voterIdPattern.test(voterId)) {
        return setError('Voter ID must be 8 to 10 digits.');
      }
    }

    const url = isRegistering
      ? 'http://localhost:5000/api/auth/register'
      : 'http://localhost:5000/api/auth/login';

    const body = isRegistering
      ? { name, email, password, voterId }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) return setError(data.error || 'Failed');

      if (isRegistering) {
        alert('✅ Registered successfully! You can now vote.');
      } else {
        localStorage.setItem('token', data.token);
        alert('✅ Logged in successfully!');
        navigate('/vote');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? '📝 Register to Vote' : '🔐 Voter Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <label className="block font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Voter ID Number</label>
                <input
                  type="text"
                  placeholder="8–10 digit ID"
                  className="w-full p-2 border rounded"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          {isRegistering ? 'Already a Voter?' : 'New Voter?'}
          <button onClick={toggleMode} className="text-blue-600 ml-2 underline">
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
