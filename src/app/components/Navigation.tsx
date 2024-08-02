import React, { useState } from "react";
import "../styles/UI.scss";
// import InfoIcon from '../icons/InfoIcon';
// import PanelIcon from '../icons/PanelIcon';

function Navigation({ activeTab, onTabChange }) {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const handleContentReelClick = () => {
    // setLoading(true);
    parent.postMessage(
      { pluginMessage: { type: "contentReel", value: "Content Reel" } },
      "*"
    );
  };
  const handleLinterOptionClick = (option) => {
    console.log("handleLinterOptionClick: ", option);
    // setActiveLinterOption(option);
    // setLoading(true);
    parent.postMessage(
      { pluginMessage: { type: "userSelection", value: option } },
      "*"
    );
  };

  // const handleStickyNoteClick = () => {
  //   parent.postMessage({ pluginMessage: { type: 'stickyNote', value: '' } }, '*');
  // }
  return (
    <nav className="nav_panel">
      <div className="nav_top">
        <div className="title">
          {expanded && <p>Actions</p>}
          <button
            onClick={toggleExpanded}
            className={`icon_panel_close ${
              !expanded ? "icon_panel_close" : ""
            }`}
          >
            {expanded ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.40375 5.1124V11.4584L11.5962 8.2854L8.40375 5.1124ZM1.6155 16.2854C1.168 16.2854 0.786833 16.1281 0.472 15.8134C0.157333 15.4986 0 15.1174 0 14.6699V1.9009C0 1.4534 0.157333 1.07223 0.472 0.757401C0.786833 0.442734 1.168 0.2854 1.6155 0.2854H14.3845C14.832 0.2854 15.2132 0.442734 15.528 0.757401C15.8427 1.07223 16 1.4534 16 1.9009V14.6699C16 15.1174 15.8427 15.4986 15.528 15.8134C15.2132 16.1281 14.832 16.2854 14.3845 16.2854H1.6155ZM4 15.2854V1.2854H1.6155C1.4615 1.2854 1.32042 1.34948 1.19225 1.47765C1.06408 1.60582 1 1.7469 1 1.9009V14.6699C1 14.8239 1.06408 14.965 1.19225 15.0932C1.32042 15.2213 1.4615 15.2854 1.6155 15.2854H4ZM5 15.2854H14.3845C14.5385 15.2854 14.6796 15.2213 14.8077 15.0932C14.9359 14.965 15 14.8239 15 14.6699V1.9009C15 1.7469 14.9359 1.60582 14.8077 1.47765C14.6796 1.34948 14.5385 1.2854 14.3845 1.2854H5V15.2854Z"
                  fill="#181B29"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
                className={`menu_item ${
                  activeTab === "linter" ? "activeNav" : ""
                }`}
                onClick={() => {
                  onTabChange("linter");
                  handleLinterOptionClick("All");
                }}
              >
                Linter
              </a>
              <a
                className={`menu_item ${
                  activeTab === "contentReel" ? "activeNav" : ""
                }`}
                onClick={() => {
                  onTabChange("contentReel");
                  handleContentReelClick();
                }}
              >
                Content Reel
              </a>
              <a
                className={`menu_item ${
                  activeTab === "stickyNote" ? "activeNav" : ""
                }`}
                onClick={() => {
                  onTabChange("stickyNote");
                  // handleStickyNoteClick();
                }}
              >
                Sticky Note
              </a>
            </>
          )}
        </div>
        <div className='bottomNav'>
          <div
            className="about_container"
            onClick={() => {
              onTabChange("styles");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <mask
                id="mask0_2907_44100"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="17"
                height="17"
              >
                <rect
                  x="0.636841"
                  y="0.28833"
                  width="16"
                  height="16"
                  fill="#D9D9D9"
                />
              </mask>
              <g mask="url(#mask0_2907_44100)">
                <path
                  d="M2 16V1.77778C2 1.28889 2.17407 0.87037 2.52222 0.522222C2.87037 0.174074 3.28889 0 3.77778 0H12.6667C13.1556 0 13.5741 0.174074 13.9222 0.522222C14.2704 0.87037 14.4444 1.28889 14.4444 1.77778V16L8.22222 13.3333L2 16ZM3.77778 13.2889L8.22222 11.3778L12.6667 13.2889V1.77778H3.77778V13.2889Z"
                  fill="#181B29"
                />
              </g>
            </svg>
            {expanded && <p>Styles</p>}
          </div>
          <div
            className="about_container"
            onClick={() => {
              onTabChange("about");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clipPath="url(#clip0_2595_3891)">
                <path
                  d="M8 12C8.22667 12 8.41667 11.9233 8.57 11.77C8.72333 11.6167 8.8 11.4267 8.8 11.2V8C8.8 7.77333 8.72333 7.58333 8.57 7.43C8.41667 7.27667 8.22667 7.2 8 7.2C7.77333 7.2 7.58333 7.27667 7.43 7.43C7.27667 7.58333 7.2 7.77333 7.2 8V11.2C7.2 11.4267 7.27667 11.6167 7.43 11.77C7.58333 11.9233 7.77333 12 8 12ZM8 5.6C8.22667 5.6 8.41667 5.52333 8.57 5.37C8.72333 5.21667 8.8 5.02667 8.8 4.8C8.8 4.57333 8.72333 4.38333 8.57 4.23C8.41667 4.07667 8.22667 4 8 4C7.77333 4 7.58333 4.07667 7.43 4.23C7.27667 4.38333 7.2 4.57333 7.2 4.8C7.2 5.02667 7.27667 5.21667 7.43 5.37C7.58333 5.52333 7.77333 5.6 8 5.6ZM8 16C6.89333 16 5.85333 15.79 4.88 15.37C3.90667 14.95 3.06 14.38 2.34 13.66C1.62 12.94 1.05 12.0933 0.63 11.12C0.21 10.1467 0 9.10667 0 8C0 6.89333 0.21 5.85333 0.63 4.88C1.05 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.05 4.88 0.63C5.85333 0.21 6.89333 0 8 0C9.10667 0 10.1467 0.21 11.12 0.63C12.0933 1.05 12.94 1.62 13.66 2.34C14.38 3.06 14.95 3.90667 15.37 4.88C15.79 5.85333 16 6.89333 16 8C16 9.10667 15.79 10.1467 15.37 11.12C14.95 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.95 11.12 15.37C10.1467 15.79 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z"
                  fill="#181B29"
                />
              </g>
              <defs>
                <clipPath id="clip0_2595_3891">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {expanded && <p>About</p>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
