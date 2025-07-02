// src/pages/VotePage.js
import React from 'react';
import './PageStyles.css';

const VotePage = () => {
  return (
    <div className="page-container">
      <h2>Cast Your Vote</h2>
      <form className="form-box">
        <label>
          <input type="radio" name="candidate" value="Candidate A" /> Candidate A
        </label>
        <label>
          <input type="radio" name="candidate" value="Candidate B" /> Candidate B
        </label>
        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
};

export default VotePage;
