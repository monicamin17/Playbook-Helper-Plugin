import React, { useState } from 'react';

function Authentication({ onSubmit }) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (token) {
      onSubmit(token);
    } else {
      setError('Please enter a token.');
    }
  };

  return (
    <div className={'authContainer'}>
      <label htmlFor="tokenInput">Enter Token:</label>
      <input
        type="text"
        id="tokenInput"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your access token"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className={'error'}>{error}</p>}
    </div>
  );
}

export default Authentication;
