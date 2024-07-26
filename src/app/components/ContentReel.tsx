import React, { useState, useRef } from 'react';
import ContentReelLayerItem from './ContentReelLayerItem';
import '../styles/ContentReelListItem.css';
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
  console.log('Results.text: ', results.text);
  console.log('Results.image: ', results.image);
  console.log('Results.frames: ', results.frames);
  // console.log(results.frames.)

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
      alert('No changes selected. Please select options for content reel items.');
      return;
    }

    const dataToSend = [
      ...(results.text
        ? Object.entries(selections)
            .map(([itemId, selectedOption]) => {
              const item = results.text.find((textItem) => textItem[1] === itemId);
              return item
                ? {
                    id: itemId,
                    content: item[0],
                    selectedOption: selectedOption,
                    type: 'text',
                  }
                : null;
            })
            .filter((item) => item !== null)
        : []),

      ...(results.image
        ? Object.entries(selections)
            .map(([itemId, selectedOption]) => {
              const item = results.image.find((imageItem) => imageItem[1] === itemId);
              return item
                ? {
                    id: itemId,
                    content: item[0],
                    selectedOption: selectedOption,
                    type: 'image',
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
                    const item = frameData.textNodes.find((textItem) => textItem[1] === itemId);
                    return item
                      ? {
                          id: itemId,
                          content: item[0],
                          selectedOption: selectedOption,
                          type: 'text',
                          frameId: frameId,
                        }
                      : null;
                  })
                  .filter((item) => item !== null)
              : []),
            ...(frameData.imageNodes
              ? Object.entries(selections)
                  .map(([itemId, selectedOption]) => {
                    const item = frameData.imageNodes.find((imageItem) => imageItem[1] === itemId);
                    return item
                      ? {
                          id: itemId,
                          content: item[0],
                          selectedOption: selectedOption,
                          type: 'image',
                          frameId: frameId,
                        }
                      : null;
                  })
                  .filter((item) => item !== null)
              : []),
          ])
        : []),
    ];

    console.log('Sending changes:', { type: 'applyContentReelChanges', value: dataToSend });

    parent.postMessage({ pluginMessage: { type: 'applyContentReelChanges', value: dataToSend } }, '*');

    // Clear the selections
    setSelections({});

    // Use refs to manage selected elements
    if (textRef.current) {
      textRef.current.querySelectorAll('.selectedReplacement').forEach((el) => el.remove());
    }
    if (imageRef.current) {
      imageRef.current.querySelectorAll('.selectedReplacement').forEach((el) => el.remove());
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
                key={item[1]} // Assuming item[1] is unique
                item={item}
                type="text"
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
          {/* <button onClick={handleSubmit}>Submit Selections</button> */}
        </div>
      )}

      {results.image && Array.isArray(results.image) && (
        <div className={'image'} ref={imageRef}>
          <h3>Image Layers</h3>
          <p>Selected at least 1 layer.</p>
          <div className={'list'}>
            {results.image.map((item) => (
              <ContentReelLayerItem
                key={item[1]} // Assuming item[1] is unique
                item={item}
                type="image"
                onSelectionChange={handleSelectionChange}
              />
            ))}
          </div>
          {/* <button onClick={handleSubmit}>Submit Selections</button> */}
        </div>
      )}

      {results.frames && typeof results.frames === 'object' && Object.keys(results.frames).length > 0 && (
        <div className={'frames'} ref={framesRef}>
          <h3>Frames</h3>
          <p>Selected at least 1 frame.</p>
          <div className={'list'}>
            {Object.entries(results.frames).map(([frameId, frameData]) => (
              <div key={frameId} className={'frame-item'}>
                <h4>Frame: {frameData.parentFrameName}</h4>
                {frameData.textNodes && frameData.textNodes.length > 0 && (
                  <div className={'text-nodes'}>
                    <h5>Text Nodes</h5>
                    {frameData.textNodes.map((item) => (
                      <ContentReelLayerItem
                        key={item[1]}
                        item={item}
                        type="text"
                        onSelectionChange={handleSelectionChange}
                      />
                    ))}
                  </div>
                )}
                {frameData.imageNodes && frameData.imageNodes.length > 0 && (
                  <div className={'image-nodes'}>
                    <h5>Image Nodes</h5>
                    {frameData.imageNodes.map((item) => (
                      <ContentReelLayerItem
                        key={item[1]}
                        item={item}
                        type="image"
                        onSelectionChange={handleSelectionChange}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleSubmit}>Submit Selections</button>
    </div>
  );
}

export default ContentReel;
