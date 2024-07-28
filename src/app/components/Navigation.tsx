import React, { useState } from 'react';
import '../styles/UI.scss';
// import InfoIcon from '../icons/InfoIcon';
// import PanelIcon from '../icons/PanelIcon';

function Navigation({ activeTab, onTabChange }) {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const handleContentReelClick = () => {
    // setLoading(true);
    parent.postMessage({ pluginMessage: { type: 'contentReel', value: 'Content Reel' } }, '*');
  };
  const handleLinterOptionClick = (option) => {
    console.log('handleLinterOptionClick: ', option);
    // setActiveLinterOption(option);
    // setLoading(true);
    parent.postMessage({ pluginMessage: { type: 'userSelection', value: option } }, '*');
  };

  // const handleStickyNoteClick = () => {
  //   parent.postMessage({ pluginMessage: { type: 'stickyNote', value: '' } }, '*');
  // }
  return (
    <nav className="nav_panel">
      <div className="nav_top">
        <div className="title">
          {expanded && <p>Actions</p>}
          <button onClick={toggleExpanded} className={`icon_panel_close ${!expanded ? 'icon_panel_close' : ''}`}>
            {expanded ? (
              <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.40375 5.1124V11.4584L11.5962 8.2854L8.40375 5.1124ZM1.6155 16.2854C1.168 16.2854 0.786833 16.1281 0.472 15.8134C0.157333 15.4986 0 15.1174 0 14.6699V1.9009C0 1.4534 0.157333 1.07223 0.472 0.757401C0.786833 0.442734 1.168 0.2854 1.6155 0.2854H14.3845C14.832 0.2854 15.2132 0.442734 15.528 0.757401C15.8427 1.07223 16 1.4534 16 1.9009V14.6699C16 15.1174 15.8427 15.4986 15.528 15.8134C15.2132 16.1281 14.832 16.2854 14.3845 16.2854H1.6155ZM4 15.2854V1.2854H1.6155C1.4615 1.2854 1.32042 1.34948 1.19225 1.47765C1.06408 1.60582 1 1.7469 1 1.9009V14.6699C1 14.8239 1.06408 14.965 1.19225 15.0932C1.32042 15.2213 1.4615 15.2854 1.6155 15.2854H4ZM5 15.2854H14.3845C14.5385 15.2854 14.6796 15.2213 14.8077 15.0932C14.9359 14.965 15 14.8239 15 14.6699V1.9009C15 1.7469 14.9359 1.60582 14.8077 1.47765C14.6796 1.34948 14.5385 1.2854 14.3845 1.2854H5V15.2854Z"
                  fill="#181B29"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.714 11.173V4.827L8.52155 8L11.714 11.173ZM1.7333 16C1.2858 16 0.904631 15.8427 0.589798 15.528C0.275131 15.2132 0.117798 14.832 0.117798 14.3845V1.6155C0.117798 1.168 0.275131 0.786833 0.589798 0.472C0.904631 0.157333 1.2858 0 1.7333 0H14.5023C14.9498 0 15.331 0.157333 15.6458 0.472C15.9605 0.786833 16.1178 1.168 16.1178 1.6155V14.3845C16.1178 14.832 15.9605 15.2132 15.6458 15.528C15.331 15.8427 14.9498 16 14.5023 16H1.7333ZM4.1178 15V1H1.7333C1.5793 1 1.43821 1.06408 1.31005 1.19225C1.18188 1.32042 1.1178 1.4615 1.1178 1.6155V14.3845C1.1178 14.5385 1.18188 14.6796 1.31005 14.8077C1.43821 14.9359 1.5793 15 1.7333 15H4.1178ZM5.1178 15H14.5023C14.6563 15 14.7974 14.9359 14.9255 14.8077C15.0537 14.6796 15.1178 14.5385 15.1178 14.3845V1.6155C15.1178 1.4615 15.0537 1.32042 14.9255 1.19225C14.7974 1.06408 14.6563 1 14.5023 1H5.1178V15Z"
                  fill="#181B29"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="menu_items">
          {expanded && (
            <>
              <a
                className={`menu_item ${activeTab === 'linter' ? 'activeNav' : ''}`}
                onClick={() => {
                  onTabChange('linter');
                  handleLinterOptionClick('All');
                }}
              >
                Linter
              </a>
              <a
                className={`menu_item ${activeTab === 'contentReel' ? 'activeNav' : ''}`}
                onClick={() => {
                  onTabChange('contentReel');
                  handleContentReelClick();
                }}
              >
                Content Reel
              </a>
              <a
                className={`menu_item ${activeTab === 'stickyNote' ? 'activeNav' : ''}`}
                onClick={() => {
                  onTabChange('stickyNote');
                  // handleStickyNoteClick();
                }}
              >
                Sticky Note
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
