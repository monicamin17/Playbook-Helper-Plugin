import React, { useState } from "react";
// import '../styles/ListItem.css';
import "../styles/Linter.scss";

function ListItem({ item, type }) {
  console.log("item:", item);
  console.log("type:", type);
  console.log(type.includes("Radius"));
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleSelectAll = () => {
    parent.postMessage(
      { pluginMessage: { type: "selectAllNodes", value: item[1] } },
      "*"
    );
  };

  const handleNodeSelect = (nodeId, index) => {
    setActiveIndex(index);

    parent.postMessage(
      { pluginMessage: { type: "selectSpecificNode", nodeId: nodeId } },
      "*"
    );
  };

  const renderSVG = () => {
    if (type.toLowerCase().includes("bottom left")) {
      return <img src="../assets/bottom_left_radius.png"></img>;
    } else if (type.toLowerCase().includes("bottom right")) {
      return <img src="../assets/bottom_right_radius.png"></img>;
    } else if (type.toLowerCase().includes("top left")) {
      return <img src="../assets/top_left_radius.png"></img>;
    } else if (type.toLowerCase().includes("top right")) {
      return <img src="../assets/top_right_radius.png"></img>;
    } else if (type.toLowerCase().includes("left padding")) {
      return <img src="../assets/left_padding.png"></img>;
    } else if (type.toLowerCase().includes("right padding")) {
      return <img src="../assets/right_padding.png"></img>;
    } else if (type.toLowerCase().includes("top padding")) {
      return <img src="../assets/top_padding.png"></img>;
    } else if (type.toLowerCase().includes("bottom padding")) {
      return <img src="../assets/bottom_padding.png"></img>;
    } else if (type.toLowerCase().includes("paddingtopbottom")) {
      return <img src="../assets/vertical_padding.png"></img>;
    } else if (type.toLowerCase().includes("paddingsides")) {
      return <img src="../assets/horizontal_padding.png"></img>;
    } else if (type.toLowerCase().includes("itemspacing")) {
      return <img src="../assets/vertical_spacing.png"></img>;
    } else if (type.toLowerCase().includes("radius")) {
      return <svg width="34px" height="34px" href="../assets/radius.png"></svg>;
    }
  };

  const dynamicStyle = {
    backgroundColor:
      type.toLowerCase().includes("radius") ||
      type.toLowerCase().includes("padding")
        ? "transparent"
        : item[0],
    borderRadius: type === "style" ? "50%" : "4px",
  };

  return (
    <div className={"issueContainer"}>
      {/* Swatch Box */}
      <div className={"swatch"} style={dynamicStyle}>
        {type.toLowerCase().includes("radius") ||
        type.toLowerCase().includes("padding")
          ? renderSVG()
          : null}
      </div>

      {/* Container for color information */}
      <div className="mainContent">
        {/* Container for text */}
        <div className="textInfo">
          {type === "hex" ? (
            <p className={"primaryIssueText"}>{item[0]}</p>
          ) : type.toLowerCase().includes("radius") ||
            type.toLowerCase().includes("spacing") ||
            type.toLowerCase().includes("padding") ? (
            <p className={"primaryIssueText"}>{item[0]}px</p>
          ) : (
            // Case for variables
            <div className="tag">
              <p className={"primaryIssueText"}>{item[1][0][4]}</p>
            </div>
          )}

          {/* Show library name if not a hex issue */}
          {!type.toLowerCase().includes("hex") ? (
            <>
              {!type.toLowerCase().includes("variable") ? (
                // Label for spacing
                <p className={"secondaryIssueText"}>{item[1][0][2]}</p>
              ) : (
                // Label for variables
                <p className={"secondaryIssueText"}>{item[1][0][3]}</p>
              )}
            </>
          ) : null}
        </div>

        {/* Container for frames */}
        {expanded && (
          <div className={"affectedLayersContainer"}>
            <p className="affectedLayersLabel">Affected Layers</p>
            <div className={"affectedLayersList"}>
              {item[1].map((node, index) => (
                <div
                  key={index}
                  className={`affectedLayersItem ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleNodeSelect(node[1], index)}
                >
                  <p className="affectedLayersItemText">{node[0]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Container for right-side icons (select all, # issues) */}
      <div className="rightContainer">
        {/* Arrow */}
        <div className="issueDropDown" onClick={() => setExpanded(!expanded)}>
          <div className={`${"arrow"} ${expanded ? expanded : ""}`}>
            <p>{item[1].length}</p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99995 11.7116L6.49683 8.2085H13.5031L9.99995 11.7116Z"
              fill="#1C1B1F"
            />
          </svg>
        </div>

        {/* Select All Icon */}
        <div className="selectAllContainer" onClick={handleSelectAll}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="181B29"
          >
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-80q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
