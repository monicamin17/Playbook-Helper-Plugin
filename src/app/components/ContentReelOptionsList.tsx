import React from 'react';
import '../styles/ContentReel.scss';

const ContentReelOptionsList = ({ options, onOptionSelect }) => {
  return (
    <div className="options_container-Wrapper">
      <div className={`Tooltip-Tip bottom`}>
        <p>Replace with:</p>
        <div className='option_wrapper'>
        {options.map((option) => (
          <button key={option} onClick={() => onOptionSelect(option)} className="layerContainer">
            {option}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
};

export default ContentReelOptionsList;
