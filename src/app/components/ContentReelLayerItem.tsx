import React, { useState , useCallback, useEffect} from "react";
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
  const imageOptions = ["Headshot","Thumbnail"];

  const handleOptionSelect = useCallback((option) => {
    // setIsLoading(true);
    // Simulating an async operation
    setTimeout(() => {
      setSelectedOption(option);
      onSelectionChange(item[1], option);
      setShowOptions(false);
      // setIsLoading(false);
    }, 100);
  }, [item, onSelectionChange]);

  const toggleOptions = useCallback(() => {
    setShowOptions(prev => !prev);
  }, []);

  useEffect(() => {
    // Any side effects that need to happen when the component mounts
    // or when certain props change
  }, [item, type]);

  return (
    <div className={"item"}>
      {type === "text" && (
        <div className="layerContent">
          <div className={"layerContainer"} onClick={toggleOptions}>
            <svg
              className="layerIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 15 14"
              fill="none"
            >
              <g clipPath="url(#clip0_2426_6758)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.5 0H1.2H7.5H13.8H14.5V0.7V4.2H13.1V1.4H8.2V12.6H10.3V14H7.5H4.7V12.6H6.8V1.4H1.9V4.2H0.5V0.7V0Z"
                  fill="#707381"
                />
              </g>
              <defs>
                <clipPath id="clip0_2426_6758">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
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
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 15 14"
              fill="none"
            >
              <g clipPath="url(#clip0_2426_6760)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 1H1V8.79289L3.72978 6.06311L4.08333 5.70956L4.43689 6.06311L11.3738 13H13V1ZM1 13V10.2071L4.08333 7.12377L9.95956 13H1ZM1 0C0.447715 0 0 0.447716 0 1V13C0 13.5523 0.447716 14 1 14H13C13.5523 14 14 13.5523 14 13V1C14 0.447715 13.5523 0 13 0H1ZM10.6667 4.66667C10.6667 5.40305 10.0697 6 9.33333 6C8.59695 6 8 5.40305 8 4.66667C8 3.93029 8.59695 3.33333 9.33333 3.33333C10.0697 3.33333 10.6667 3.93029 10.6667 4.66667ZM11.6667 4.66667C11.6667 5.95533 10.622 7 9.33333 7C8.04467 7 7 5.95533 7 4.66667C7 3.378 8.04467 2.33333 9.33333 2.33333C10.622 2.33333 11.6667 3.378 11.6667 4.66667Z"
                  fill="#707381"
                />
              </g>
              <defs>
                <clipPath id="clip0_2426_6758">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="text_info">
              <p>{item[0]}</p>
              <p>
                {selectedOption ? (
                  <div className="selectedOptionContainer">
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
                  </div>
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
