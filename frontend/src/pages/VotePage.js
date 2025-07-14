// ✅ FILE: src/pages/VotePage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VotePage() {
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const res1 = await fetch('http://localhost:5000/api/vote/candidates', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const candidatesData = await res1.json();
        if (candidatesData.error) {
          setMessage(candidatesData.error);
        } else {
          setCandidates(candidatesData);
        }

        const res2 = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await res2.json();
        setHasVoted(userData.hasVoted);
      } catch (err) {
        setMessage('❌ Failed to load data.');
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleVote = async (id) => {
    try {
      const res = await fetch('http://localhost:5000/api/vote/cast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ candidateId: id })
      });
      const data = await res.json();
      if (data.message) {
        setMessage(data.message);
        setHasVoted(true);
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setMessage('❌ Voting failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🗳️ Cast Your Vote</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {message && (
          <p className="text-center text-blue-700 font-medium mb-4">{message}</p>
        )}

        {hasVoted ? (
          <div className="text-center text-green-600 font-semibold">
            ✅ You have already voted.
          </div>
        ) : (
          <div className="space-y-4">
            {candidates.map(c => (
              <div
                key={c._id}
                className="flex justify-between items-center border border-gray-300 p-4 rounded shadow-sm bg-gray-50"
              >
                <div>
                  <p className="text-lg font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-600">{c.party}</p>
                </div>
                <button
                  onClick={() => handleVote(c._id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VotePage;
