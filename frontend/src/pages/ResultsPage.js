import React, { useEffect, useState } from 'react';

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/vote/results')
      .then(res => res.json())
      .then(data => {
        setResults(data.results);
        setWinner(data.winner);
        setTotalVotes(data.totalVotes);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🗳️ Live Voting Results</h2>
      <p>Total Votes Cast: <b>{totalVotes}</b></p>
      <ul>
        {results.map((c, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <b>{c.name}</b> ({c.party})<br />
            Votes: {c.votes} — {c.percent}%<br />
            <progress value={c.percent} max="100" style={{ width: '100%' }}></progress>
          </li>
        ))}
      </ul>

      {winner && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', background: '#e6ffe6' }}>
          🏆 <b>Winner:</b> {winner.name} ({winner.party}) with {winner.votes} votes
        </div>
      )}
    </div>
  );
}

export default ResultsPage;
