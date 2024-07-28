import React, { useState } from "react";
import "../styles/ContentReel.scss";
import ContentReelOptionsList from "./ContentReelOptionsList";

function ContentReelLayerItem({ item, type, onSelectionChange }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(true);

  const textOptions = [
    "Duration",
    "Timestamp",
    "Author",
    "Player",
    "Team",
    "League",
    "Headline",
  ];
  const imageOptions = ["Headshot", "Thumbnail"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelectionChange(item[1], option);
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={"item"}>
      {type === "text" && (
        <div className="layerContent">
          <div className={"layerContainer"} onClick={toggleOptions}>
            <svg
              className="layerIcon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H0.55H5.5H10.45H11V0.55V3.3H9.9V1.1H6.05V9.9H7.7V11H5.5H3.3V9.9H4.95V1.1H1.1V3.3H0V0.55V0Z"
                fill="black"
              />
            </svg>
            <div className="text_info">
              <p>{item[0]}</p>
              <p>{selectedOption ? `-> ${selectedOption}` : ""}</p>
            </div>
          </div>
          {showOptions && (
            <ContentReelOptionsList
              options={textOptions}
              onOptionSelect={handleOptionSelect}
            />
          )}
        </div>
      )}

      {type === "image" && (
        <div className="layerContent">
          <div className={"layerContainer"} onClick={toggleOptions}>
            <svg
              className="layerIcon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H0.55H5.5H10.45H11V0.55V3.3H9.9V1.1H6.05V9.9H7.7V11H5.5H3.3V9.9H4.95V1.1H1.1V3.3H0V0.55V0Z"
                fill="black"
              />
            </svg>
            <div className="text_info">
              <p>{item[0]}</p>
              <p>
                {selectedOption ? (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_2426_6870"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                      >
                        <rect width="20" height="20" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_2426_6870)">
                        <path
                          d="M11.8718 13.7115L11.0977 12.9536L13.5095 10.5417H4.41663V9.45837H13.5095L11.0977 7.04649L11.8718 6.28857L15.5833 10L11.8718 13.7115Z"
                          fill="#1C1B1F"
                        />
                      </g>
                    </svg>{" "}
                    {selectedOption}
                  </>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
          {showOptions && (
            <ContentReelOptionsList
              options={imageOptions}
              onOptionSelect={handleOptionSelect}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ContentReelLayerItem;
