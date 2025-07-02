// src/pages/ResultsPage.js
import React from 'react';
import './PageStyles.css';

const ResultsPage = () => {
  return (
    <div className="page-container">
      <h2>Voting Results</h2>
      <ul className="form-box">
        <li>Candidate A: 52 votes</li>
        <li>Candidate B: 48 votes</li>
      </ul>
    </div>
  );
};

export default ResultsPage;
