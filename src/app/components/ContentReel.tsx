import React, { useState, useRef } from 'react';
import ContentReelLayerItem from './ContentReelLayerItem';
import '../styles/ContentReelListItem.css';

function ContentReel({ results }) {
  console.log(results.text);
  console.log(results.image);
  const [selections, setSelections] = useState({});
  const textRef = useRef(null); // Separate ref for text items
  const imageRef = useRef(null); // Separate ref for image items

  const handleSelectionChange = (itemId, selectedOption) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [itemId]: selectedOption
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selections).length === 0) {
      alert('No changes selected. Please select options for content reel items.');
      return;
    }

    const dataToSend = [
      ...(results.text ? Object.entries(selections).map(([itemId, selectedOption]) => {
        const item = results.text.find(textItem => textItem[1] === itemId);
        return item ? {
          id: itemId,
          content: item[0],
          selectedOption: selectedOption,
          type: 'text' // Add type for differentiation
        } : null;
      }).filter(item => item !== null) : []),
  
      ...(results.image ? Object.entries(selections).map(([itemId, selectedOption]) => {
        const item = results.image.find(imageItem => imageItem[1] === itemId);
        return item ? {
          id: itemId,
          content: item[0],
          selectedOption: selectedOption,
          type: 'image' // Add type for differentiation
        } : null;
      }).filter(item => item !== null) : [])
    ];

    console.log("Sending changes:", { type: 'applyContentReelChanges', value: dataToSend });
    
    parent.postMessage({ pluginMessage: { type: 'applyContentReelChanges', value: dataToSend } }, '*');

    // Clear the selections
    setSelections({});
    
    // Use refs to manage selected elements
    if (textRef.current) {
      textRef.current.querySelectorAll('.selectedReplacement').forEach(el => el.remove());
    }
    if (imageRef.current) {
      imageRef.current.querySelectorAll('.selectedReplacement').forEach(el => el.remove());
    }
  };

  return (
    <div className={'contentReelResults'}>
      {results.text && Array.isArray(results.text) && (
        <div className={'text'} ref={textRef}>
          <h3>Text Layers</h3>
          <p>Selected at least 1 layer.</p>
          <div className={'list'}>
            {results.text.map((item) => (
              <ContentReelLayerItem 
                key={item[1]}  // Assuming item[1] is unique
                item={item} 
                type="text" 
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
          <button onClick={handleSubmit}>Submit Selections</button>
        </div>
      )}

      {results.image && Array.isArray(results.image) && (
        <div className={'image'} ref={imageRef}>
          <h3>Image Layers</h3>
          <p>Selected at least 1 layer.</p>
          <div className={'list'}>
            {results.image.map((item) => (
              <ContentReelLayerItem 
                key={item[1]}  // Assuming item[1] is unique
                item={item} 
                type="image" 
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
          <button onClick={handleSubmit}>Submit Selections</button>
        </div>
      )}
    </div>
  );
}

export default ContentReel;
