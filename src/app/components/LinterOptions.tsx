// LinterOptions.js
import React from 'react';
// import '../styles/LinterOptions.css';
import '../styles/Linter.scss';

function LinterOptions({ onClick, activeOption }) {
  // const options = ['All', 'Enabled Libraries', 'Disconnected Hex', 'Spacing'];
  const options = ['All', 'Library', 'Hex', 'Spacing'];

  return (
    <div className={'linterFilters'}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onClick(option)}
          className={`linter_button ${activeOption === option ? 'active_linter_button' : ''}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default LinterOptions;
