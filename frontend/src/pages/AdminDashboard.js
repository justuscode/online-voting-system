import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin')) {
      navigate('/admin/login');
      return;
    }

    fetch('http://localhost:5000/api/vote/candidates')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCandidates(data);
        } else {
          setError(data.error || 'Failed to load candidates');
        }
      })
      .catch(err => setError('Something went wrong: ' + err.message));
  }, [navigate]);

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/add-candidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, party })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Candidate added!');
      setCandidates([...candidates, data]);
      setName('');
      setParty('');
    } else {
      alert(data.error || 'Error adding candidate');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧑‍💼 Admin Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>

      <form onSubmit={handleAddCandidate}>
        <input type="text" value={name} placeholder="Candidate Name" onChange={(e) => setName(e.target.value)} required />
        <input type="text" value={party} placeholder="Party Name" onChange={(e) => setParty(e.target.value)} required />
        <button type="submit">Add Candidate</button>
      </form>

      <h3>📋 Existing Candidates</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {candidates.map((c) => (
          <li key={c._id}>
            {c.name} — {c.party}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
