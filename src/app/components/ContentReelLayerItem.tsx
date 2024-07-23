import React, { useState, useEffect } from 'react';
import '../styles/ContentReelListItem.css';

function ContentReelLayerItem({ item, type, onSelectionChange }) {
  const [showOptions, setShowOptions] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const textOptions = ['Duration', 'Timestamp', 'Author', 'Player', 'Headline'];
  const imageOptions = ['Headshot', 'Thumbnail'];

  useEffect(() => {
    setShowOptions(true);
  }, [item]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    onSelectionChange(item[1], option); // Send the selection to the parent
  };

  return (
    <div className={'item'}>
      {type === 'text' && (
        <div className="layerContent">
          <div className={'textNode'}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H0.55H5.5H10.45H11V0.55V3.3H9.9V1.1H6.05V9.9H7.7V11H5.5H3.3V9.9H4.95V1.1H1.1V3.3H0V0.55V0Z" fill="black"/>
            </svg>

            <div className="textContent" onClick={toggleOptions}>
              <p>{item[0]}</p>
              <p>{selectedOption ? `-> ${selectedOption}` : ''}</p>
            </div>
          </div>
          {showOptions && (
            <div className="options">
              <p onClick={toggleOptions}>Replace with</p>

              <div className="optionButtons">
                {textOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={selectedOption === option ? 'selected' : ''}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

{type === 'image' && (
        <div className="layerContent">
          <div className={'textNode'}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H0.55H5.5H10.45H11V0.55V3.3H9.9V1.1H6.05V9.9H7.7V11H5.5H3.3V9.9H4.95V1.1H1.1V3.3H0V0.55V0Z"
                fill="black"
              />
            </svg>

            <div className="textContent" onClick={toggleOptions}>
              <p>{item[0]}</p>
              <p>{selectedOption ? `-> ${selectedOption}` : ''}</p>
            </div>
          </div>
          {showOptions && (
            <div className="options">
              <p onClick={toggleOptions}>Replace with</p>

              <div className="optionButtons">
                {imageOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={selectedOption === option ? 'selected' : ''}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ContentReelLayerItem;