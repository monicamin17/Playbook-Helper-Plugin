// StickyNote.js
import React from "react";
import "../styles/stickynote.scss";

const colors = [
  { name: "Blue", hex: "#80CAFF" },
  { name: "Green", hex: "#85E0A3" },
  { name: "Purple", hex: "#D9B8FF" },
  { name: "Yellow", hex: "#FFD966" },
];
// In UI

function StickyNote() {
  const handleStickyNoteClick = (color) => {
    parent.postMessage(
      { pluginMessage: { type: "stickyNote", value: color } },
      "*"
    );
  };

  return (
    <div className="stickyNoteResults">
      <div className='stickyNoteInfo'>
        <h2 className="stickyNoteTitle">Sticky Notes</h2>
        <p className="description">Select a color to create your sticky note!</p>
      </div>
      <div className="allColorsContainer">
        {colors.map(({ name, hex }) => (
          <div
            key={name} // Use the unique `name` as the key
            className="colorContainer"
          >
            <div
              onClick={() => handleStickyNoteClick(name)}
              className="colorBox"
              style={{
                backgroundColor: hex,
                cursor: "pointer",
              }}
              
            ></div>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickyNote;
