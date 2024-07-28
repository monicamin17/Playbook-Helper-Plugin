import React from 'react';
// import '../styles/LinterOptions.css';

function ContentReelOptions({ onClick }) {
  return (
    <div className={'contentReelOptions'}>
      <button onClick={onClick}>Scan text and images</button>
    </div>
  );
}

export default ContentReelOptions;