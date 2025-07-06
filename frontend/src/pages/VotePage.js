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

    fetch('http://localhost:5000/api/vote/candidates', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error);
          return;
        }
        setCandidates(data);
      });

    // Check if user has already voted
    fetch('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setHasVoted(data.hasVoted);
      });
  }, [token, navigate]);

  const handleVote = (id) => {
    fetch('http://localhost:5000/api/vote/cast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ candidateId: id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setMessage(data.message);
          setHasVoted(true);
        } else {
          setMessage(data.error || 'Something went wrong');
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🗳️ Cast Your Vote</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <br /><br />
      {message && <p><b>{message}</b></p>}
      <ul>
        {candidates.map(c => (
          <li key={c._id} style={{ marginBottom: '10px' }}>
            <b>{c.name}</b> ({c.party}) <br />
            {hasVoted ? (
              <i>You have already voted.</i>
            ) : (
              <button onClick={() => handleVote(c._id)}>Vote</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VotePage;
