// StickyNote.js
import React, {useEffect} from "react";
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
  useEffect(() => {
    const colorBoxes = document.getElementsByClassName('colorBox');
  
    for (const color of colorBoxes) {
      color.addEventListener('dragstart', (e: DragEvent) => {
        if (e.dataTransfer && e.target instanceof HTMLElement) {
          e.dataTransfer.setData("text/plain", e.target.getAttribute('data-color') || '');
        }
      });
  
      color.addEventListener('dragend', (e: DragEvent) => {
        if (e.dataTransfer && e.target instanceof HTMLElement) {
          console.log('Sending dragend message:', {
            type: 'pluginDrop',
            clientX: e.clientX,
            clientY: e.clientY,
            dropMetadata: e.target.getAttribute('data-color') || ''
          });
          parent.postMessage({
            pluginMessage: {
              type: 'pluginDrop',
              clientX: e.clientX,
              clientY: e.clientY,
              dropMetadata: e.target.getAttribute('data-color') || ''
            }
          }, '*');
        }
      });
    }
  }, []);


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
              data-color={name}
              draggable="true"
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
