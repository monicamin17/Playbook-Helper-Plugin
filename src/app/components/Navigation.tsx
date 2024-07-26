import React, { useState } from 'react';
import '../styles/UI.scss';
// import InfoIcon from '../icons/InfoIcon';
// import PanelIcon from '../icons/PanelIcon';


function Navigation({ activeTab, onTabChange }) {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="nav_panel">
      <div className="nav_top">
        <div className="title">
          {expanded && <p>Actions</p>}
          <button onClick={toggleExpanded} className={`icon_panel_close ${!expanded ? 'icon_panel_close' : ''}`}>
            {expanded ? 'c' : 'c'}
          </button>
        </div>

        <div className="menu_items">
          {expanded && (
            <>
              <a
                className={`menu_item ${activeTab === 'contentReel' ? 'activeNav' : ''}`}
                onClick={() => onTabChange('contentReel')}
              >
                Content Reel
              </a>
              <a
                className={`menu_item ${activeTab === 'linter' ? 'activeNav' : ''}`}
                onClick={() => onTabChange('linter')}
              >
                Linter
              </a>
            </>
          )}
        </div>

        <div className="about_container">
          {/* <InfoIcon></InfoIcon> */}
          {expanded && <p>About</p>}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
