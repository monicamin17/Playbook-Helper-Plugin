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
  console.log(results);
  const [selections, setSelections] = useState({});
  const textRef = useRef(null); // Separate ref for text items
  const imageRef = useRef(null); // Separate ref for image items
  const framesRef = useRef(null); // Separate ref for image items
  const [resetTrigger, setResetTrigger] = useState(0);

  console.log('selections: ', selections);
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
    console.log(dataToSend);
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
    // setSelections({});

    // if (textRef.current) {
    //   textRef.current
    //     .querySelectorAll(".selectedReplacement")
    //     .forEach((el) => el.remove());
    // }
    // if (imageRef.current) {
    //   imageRef.current
    //     .querySelectorAll(".selectedReplacement")
    //     .forEach((el) => el.remove());
    // }
    // if (framesRef.current) {
    //   framesRef.current
    //     .querySelectorAll(".selectedReplacement")
    //     .forEach((el) => el.remove());
    // }
    parent.postMessage(
      { pluginMessage: { type: "contentReel", value: "Content Reel" } },
      "*"
    );
    setSelections({});
    setResetTrigger(prev => prev + 1)
  };
  return (
    <div className={"contentReelBody"}>
      <div className="contentReelResults">
        {(!results.text || results.text?.length === 0) &&
          (!results.image || results.image?.length === 0) &&
          (!results.frames || Object.keys(results.frames).length === 0) && (
            <div className="empty_content_container">
              <p>No text or image layers found. Please try again.</p>
            </div>
          )}

        {results.text &&
          Array.isArray(results.text) &&
          results.text.length > 0 && (
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
                    resetTrigger={resetTrigger}
                  />
                ))}
              </div>
            </div>
          )}

        {results.image &&
          Array.isArray(results.image) &&
          results.image.length > 0 && (
            <div className={"content_container"} ref={imageRef}>
              <div className={"titleContainer"}>
                <h3 className="layerTitle">Image Layers</h3>
                <p className="description">
                  Select at least one layer to update its content.
                </p>
              </div>
              <div className={"list"}>
                {results.image.map((item) => (
                  <ContentReelLayerItem
                    key={item[1]} // Assuming item[1] is unique
                    item={item}
                    type="image"
                    onSelectionChange={handleSelectionChange}
                    resetTrigger={resetTrigger}
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
                <p className="description">
                  Select at least one layer to update its content.
                </p>
              </div>
              <div className={"list"}>
                {Object.entries(results.frames).map(([frameId, frameData]) => (
                  <div key={frameId} className={"frame_item"}>
                    <h4>{frameData.parentFrameName}</h4>
                    {frameData.textNodes && frameData.textNodes.length > 0 && (
                      <div className={"text-nodes"}>
                        <h5>Text Layers</h5>
                        <div className={"list"}>
                          {frameData.textNodes.map((item) => (
                            <ContentReelLayerItem
                              key={item[1]}
                              item={item}
                              type="text"
                              onSelectionChange={handleSelectionChange}
                              resetTrigger={resetTrigger}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {frameData.imageNodes &&
                      frameData.imageNodes.length > 0 && (
                        <div className={"image-nodes"}>
                          <h5>Image Layers</h5>
                          <div className={"list"}>
                            {frameData.imageNodes.map((item) => (
                              <ContentReelLayerItem
                                key={item[1]}
                                item={item}
                                type="image"
                                onSelectionChange={handleSelectionChange}
                                resetTrigger={resetTrigger}
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
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              d="M7.03612 14.5C5.07179 14.5 3.40806 13.822 2.04493 12.466C0.681644 11.1101 0 9.45518 0 7.5014C0 5.54762 0.681644 3.89228 2.04493 2.53537C3.40806 1.17846 5.07179 0.5 7.03612 0.5C8.13297 0.5 9.17096 0.742589 10.1501 1.22777C11.129 1.7131 11.9433 2.39786 12.5928 3.28203V0.5H14V6.20757H8.26298V4.8078H11.9687C11.4743 3.90667 10.7886 3.19679 9.91178 2.67817C9.03508 2.15939 8.07653 1.9 7.03612 1.9C5.47254 1.9 4.14349 2.44444 3.04899 3.53333C1.95448 4.62222 1.40722 5.94444 1.40722 7.5C1.40722 9.05556 1.95448 10.3778 3.04899 11.4667C4.14349 12.5556 5.47254 13.1 7.03612 13.1C8.24008 13.1 9.32677 12.7578 10.2962 12.0733C11.2656 11.3889 11.9458 10.4867 12.3367 9.36667H13.8196C13.3939 10.8899 12.5553 12.1262 11.3038 13.0757C10.0523 14.0252 8.62972 14.5 7.03612 14.5Z"
              fill="#181B29"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ContentReel;
