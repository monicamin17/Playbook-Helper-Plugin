import React, { useState, useRef } from "react";
import ContentReelLayerItem from "./ContentReelLayerItem";
import "../styles/ContentReel.scss";

type NodeItem = [string, string];

interface FrameData {
  parentFrameName: string;
  textNodes: NodeItem[];
  imageNodes?: NodeItem[];
  article: any | null;
}

interface Results {
  text?: NodeItem[];
  image?: NodeItem[];
  frames?: Record<string, FrameData>;
}

interface ContentReelProps {
  results: Results;
}

function ContentReel({ results }: ContentReelProps) {
  // console.log("Results.text: ", results.text);
  // console.log("Results.image: ", results.image);
  // console.log("Results.frames: ", results.frames);

  const [selections, setSelections] = useState({});
  const textRef = useRef(null); // Separate ref for text items
  const imageRef = useRef(null); // Separate ref for image items
  const framesRef = useRef(null); // Separate ref for image items

  const handleSelectionChange = (itemId, selectedOption) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [itemId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selections).length === 0) {
      alert(
        "No changes selected. Please select options for content reel items."
      );
      return;
    }

  
    const dataToSend = [
      ...(results.text
        ? Object.entries(selections)
            .map(([itemId, selectedOption]) => {
              const item = results.text.find(
                (textItem) => textItem[1] === itemId
              );
              return item
                ? {
                    id: itemId,
                    content: item[0],
                    selectedOption: selectedOption,
                    type: "text",
                  }
                : null;
            })
            .filter((item) => item !== null)
        : []),

      ...(results.image
        ? Object.entries(selections)
            .map(([itemId, selectedOption]) => {
              const item = results.image.find(
                (imageItem) => imageItem[1] === itemId
              );
              return item
                ? {
                    id: itemId,
                    content: item[0],
                    selectedOption: selectedOption,
                    type: "image",
                  }
                : null;
            })
            .filter((item) => item !== null)
        : []),

      ...(results.frames
        ? Object.entries(results.frames).flatMap(([frameId, frameData]) => [
            ...(frameData.textNodes
              ? Object.entries(selections)
                  .map(([itemId, selectedOption]) => {
                    const item = frameData.textNodes.find(
                      (textItem) => textItem[1] === itemId
                    );
                    return item
                      ? {
                          id: itemId,
                          content: item[0],
                          selectedOption: selectedOption,
                          type: "text",
                          frameId: frameId,
                        }
                      : null;
                  })
                  .filter((item) => item !== null)
              : []),
            ...(frameData.imageNodes
              ? Object.entries(selections)
                  .map(([itemId, selectedOption]) => {
                    const item = frameData.imageNodes.find(
                      (imageItem) => imageItem[1] === itemId
                    );
                    return item
                      ? {
                          id: itemId,
                          content: item[0],
                          selectedOption: selectedOption,
                          type: "image",
                          frameId: frameId,
                        }
                      : null;
                  })
                  .filter((item) => item !== null)
              : []),
          ])
        : []),
    ];

    console.log("Sending changes:", {
      type: "applyContentReelChanges",
      value: dataToSend,
    });

    parent.postMessage(
      { pluginMessage: { type: "applyContentReelChanges", value: dataToSend } },
      "*"
    );

    // Clear the selections
    setSelections({});

    // Use refs to manage selected elements
    if (textRef.current) {
      textRef.current
        .querySelectorAll(".selectedReplacement")
        .forEach((el) => el.remove());
    }
    if (imageRef.current) {
      imageRef.current
        .querySelectorAll(".selectedReplacement")
        .forEach((el) => el.remove());
    }
  };

  // Check if there are any selections
  const hasSelections = Object.keys(selections).length > 0;
  const handleReload = () => {
    parent.postMessage(
      { pluginMessage: { type: "contentReel", value: 'Content Reel' } },
      "*"
    );
  };
  return (
    <div className={"contentReelBody"}>
      <div className="contentReelResults">
        {((!results.text || results.text?.length === 0) && (!results.image || results.image?.length === 0) && (!results.frames || Object.keys(results.frames).length === 0)) && (
          <div className='empty_content_container'>
            <p>No text or image layers found. Please try again.</p>
          </div>
        )}

        {results.text && Array.isArray(results.text) &&  results.text.length > 0 && (
          <div className={"content_container"} ref={textRef}>
            <div className={"titleContainer"}>
              <h3 className="layerTitle">Text Layers</h3>
              <p className="description">Selected at least 1 layer.</p>
            </div>
            <div className={"list"}>
              {results.text.map((item) => (
                <ContentReelLayerItem
                  key={item[1]} // Assuming item[1] is unique
                  item={item}
                  type="text"
                  onSelectionChange={handleSelectionChange}
                />
              ))}
            </div>
          </div>
        )}

        {results.image && Array.isArray(results.image) &&  results.image.length > 0&& (
          <div className={"content_container"} ref={imageRef}>
            <div className={"titleContainer"}>
              <h3 className="layerTitle">Image Layers</h3>
              <p className="description">Select at least one layer to update its content.</p>
            </div>
            <div className={"list"}>
              {results.image.map((item) => (
                <ContentReelLayerItem
                  key={item[1]} // Assuming item[1] is unique
                  item={item}
                  type="image"
                  onSelectionChange={handleSelectionChange}
                />
              ))}
            </div>
          </div>
        )}

        {results.frames &&
          typeof results.frames === "object" &&
          Object.keys(results.frames).length > 0 && (
            <div className={"content_container"} ref={framesRef}>
              <div className={"titleContainer"}>
                <h3 className="layerTitle">Frames</h3>
                <p className="description">Select at least one layer to update its content.</p>
              </div>
              <div className={"list"}>
                {Object.entries(results.frames).map(([frameId, frameData]) => (
                  <div key={frameId} className={"frame_item"}>
                    <h4>{frameData.parentFrameName}</h4>
                    {frameData.textNodes && frameData.textNodes.length > 0 && (
                      <div className={"text-nodes"}>
                        <h5>Text Nodes</h5>
                        <div className={"list"}>
                          {frameData.textNodes.map((item) => (
                            <ContentReelLayerItem
                              key={item[1]}
                              item={item}
                              type="text"
                              onSelectionChange={handleSelectionChange}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {frameData.imageNodes &&
                      frameData.imageNodes.length > 0 && (
                        <div className={"image-nodes"}>
                          <h5>Image Nodes</h5>
                          <div className={"list"}>
                            {frameData.imageNodes.map((item) => (
                              <ContentReelLayerItem
                                key={item[1]}
                                item={item}
                                type="image"
                                onSelectionChange={handleSelectionChange}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      <div className="contentReel_submitContainer">
        <button
          className="contentReel_submit"
          onClick={handleSubmit}
          disabled={!hasSelections}
        >
          Submit Selections
        </button>
        {/* Refresh Icon */}
        <div className="refreshContainer" onClick={handleReload}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_2426_6858"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_2426_6858)">
              <path
                d="M10.0321 15.5832C8.48165 15.5832 7.16352 15.0403 6.07769 13.9546C4.99172 12.8689 4.44873 11.5511 4.44873 10.0011C4.44873 8.45109 4.99172 7.13282 6.07769 6.0463C7.16352 4.95977 8.48165 4.4165 10.0321 4.4165C10.9508 4.4165 11.793 4.62268 12.5585 5.03505C13.3239 5.44755 13.9604 5.99296 14.4679 6.6713V4.4165H15.5512V8.67921H11.2885V7.59609H13.8094C13.4119 6.95817 12.8827 6.44935 12.2219 6.06963C11.5612 5.68977 10.8312 5.49984 10.0321 5.49984C8.78206 5.49984 7.71956 5.93734 6.84456 6.81234C5.96956 7.68734 5.53206 8.74984 5.53206 9.99984C5.53206 11.2498 5.96956 12.3123 6.84456 13.1873C7.71956 14.0623 8.78206 14.4998 10.0321 14.4998C11.1987 14.4998 12.1987 14.1144 13.0321 13.3436C13.8654 12.5728 14.3446 11.6248 14.4696 10.4998H15.5785C15.4642 11.9432 14.879 13.1512 13.8229 14.124C12.7668 15.0968 11.5032 15.5832 10.0321 15.5832Z"
                fill="#1C1B1F"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ContentReel;
