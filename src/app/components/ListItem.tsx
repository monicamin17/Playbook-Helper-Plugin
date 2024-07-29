import React, { useState } from "react";
// import '../styles/ListItem.css';
import "../styles/Linter.scss";
// import bottomLeftRadius from '../assets/bottom_left_radius.png';
function ListItem({ item, type }) {
  console.log("item:", item);
  console.log("type:", type);
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
    if (type.toLowerCase().includes("bottomleft")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.3129 21.3159H16.5167C14.9889 21.3159 13.7504 20.0774 13.7504 18.5495V12.7534H12.7504V18.5495C12.7504 20.6297 14.4366 22.3159 16.5167 22.3159H22.3129V21.3159Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("bottomright")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.7504 21.3159H18.5465C20.0743 21.3159 21.3129 20.0774 21.3129 18.5495V12.7534H22.3129V18.5495C22.3129 20.6297 20.6266 22.3159 18.5465 22.3159H12.7504V21.3159Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("topleft")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.3129 13.7534H16.5167C14.9889 13.7534 13.7504 14.992 13.7504 16.5198V22.3159H12.7504V16.5198C12.7504 14.4397 14.4366 12.7534 16.5167 12.7534H22.3129V13.7534Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("topright")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.7504 13.7534H18.5465C20.0743 13.7534 21.3129 14.992 21.3129 16.5198V22.3159H22.3129V16.5198C22.3129 14.4397 20.6266 12.7534 18.5465 12.7534H12.7504V13.7534Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("leftpadding")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.2841 9.56494V24.4399H12.2841L12.2841 9.56494H11.2841ZM15.4714 13.7512H21.9714V20.2512H15.4714V13.7512ZM14.4714 12.7512H15.4714H21.9714H22.9714V13.7512V20.2512V21.2512H21.9714H15.4714H14.4714V20.2512V13.7512V12.7512Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("rightpadding")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.5684 9.56445V24.4395H21.5684L21.5684 9.56445H22.5684ZM18.3811 13.7507H11.8811V20.2507H18.3811V13.7507ZM19.3811 12.7507H18.3811H11.8811H10.8811V13.7507V20.2507V21.2507H11.8811H18.3811H19.3811V20.2507V13.7507V12.7507Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("toppadding")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.5625 12.1973H24.4375V11.1973H9.5625V12.1973ZM13.7499 15.3211H20.2499V21.8211H13.7499V15.3211ZM12.7499 14.3211H13.7499H20.2499H21.2499V15.3211V21.8211V22.8211H20.2499H13.7499H12.7499V21.8211V15.3211V14.3211Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("bottompadding")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.5625 21.2095H24.4375V22.2095H9.5625V21.2095ZM13.7499 18.0856H20.2499V11.5856H13.7499V18.0856ZM12.7499 19.0856H13.7499H20.2499H21.2499V18.0856V11.5856V10.5856H20.2499H13.7499H12.7499V11.5856V18.0856V19.0856Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("paddingtopbottom")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.5625 10.627H24.4375V9.62695H9.5625V10.627ZM20.2499 13.7508H13.7499V20.2508H20.2499V13.7508ZM13.7499 12.7508H12.7499V13.7508V20.2508V21.2508H13.7499H20.2499H21.2499V20.2508V13.7508V12.7508H20.2499H13.7499ZM24.4377 23.3804H9.56273V24.3804H24.4377V23.3804Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("paddingsides")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.3751 24.4395V9.56445H24.3751V24.4395H23.3751ZM9.56213 24.4398V9.56479L10.5621 9.56479L10.5621 24.4398H9.56213ZM13.7494 13.751H20.2494V20.251H13.7494V13.751ZM12.7494 12.751H13.7494H20.2494H21.2494V13.751V20.251V21.251H20.2494H13.7494H12.7494V20.251V13.751V12.751Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("itemspacing")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.093 23.3755H12.2804H13.2804V22.3755V11.6255V10.6255H12.2804H10.093V11.6255H12.2804V22.3755H10.093V23.3755ZM23.9066 11.6255H21.7191V22.3755H23.9066V23.3755H21.7191H20.7191V22.3755V11.6255V10.6255H21.7191H25.0316H26.0316V10.6256H23.9066V11.6255ZM16.4681 13.8121V20.1871H17.2214V13.8121H16.4681Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("counteraxisspacing")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.6252 10.0918L10.6252 12.28L10.6252 13.28L11.6252 13.28L22.3752 13.28L23.3752 13.28L23.3752 12.28L23.3752 10.0918L22.3752 10.0918L22.3752 12.28L11.6252 12.28L11.6252 10.0918L10.6252 10.0918ZM22.3752 23.907L22.3752 21.7188L11.6252 21.7188L11.6252 23.907L10.6252 23.907L10.6252 21.7188L10.6252 20.7188L11.6252 20.7188L22.3752 20.7188L23.3752 20.7188L23.3752 21.7188L23.3752 23.907L22.3752 23.907ZM20.1874 16.4681L13.8124 16.4681L13.8124 17.4681L20.1874 17.4681L20.1874 16.4681Z"
            fill="#181B29"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("radius")) {
      return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2382 14H13.6693C13.2997 14 13 14.2997 13 14.6693V17.2382H12V14.6693C12 13.7474 12.7474 13 13.6693 13H16.2382V14ZM13.6693 22H16.2382V23H13.6693C12.7474 23 12 22.2526 12 21.3307V18.7618H13V21.3307C13 21.7003 13.2997 22 13.6693 22ZM20.58 22H18.011V23H20.58C21.5019 23 22.2493 22.2526 22.2493 21.3307V18.7618H21.2493V21.3307C21.2493 21.7003 20.9496 22 20.58 22ZM20.58 14H18.011V13H20.58C21.5019 13 22.2493 13.7474 22.2493 14.6693V17.2382H21.2493V14.6693C21.2493 14.2997 20.9496 14 20.58 14Z"
            fill="#181B29"
          />
        </svg>
      );
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
        type.toLowerCase().includes("padding") ||
        type.toLowerCase().includes("spacing")
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
          <div
            className={`affectedLayersContainer ${expanded ? "expanded" : ""}`}
          >
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
            className={expanded ? "rotated" : ""}
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
          >
            <path
              d="M0 3.3875L0.8875 2.5L5 6.6125L9.1125 2.5L10 3.3875L5 8.3875L0 3.3875Z"
              fill="#CC0E00"
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
