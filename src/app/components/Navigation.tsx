// Navigation.js
import React from 'react';
import '../styles/Navigation.css'; // Import regular CSS

function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="nav">
      <a
        className={activeTab === 'contentReel' ? 'activeNav' : ''}
        onClick={() => onTabChange('contentReel')}
      >
        Content Reel
      </a>
      <a
        className={activeTab === 'linter' ? 'activeNav' : ''}
        onClick={() => onTabChange('linter')}
      >
        Linter
      </a>
    </nav>
  );
}

export default Navigation;
