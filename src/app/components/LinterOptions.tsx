// LinterOptions.js
import React from 'react';
import '../styles/LinterOptions.css';

function LinterOptions({ onClick, activeOption }) {
  const options = ['All', 'Enabled Libraries', 'Disconnected Hex', 'Spacing'];

  return (
    <div className={'linterOptions'}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onClick(option)}
          className={activeOption === option ? 'activeButton' : ''}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default LinterOptions;
