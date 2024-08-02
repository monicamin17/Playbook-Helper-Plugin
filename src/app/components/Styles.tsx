import React, { useState } from "react";
import "../styles/Linter.scss";
import "../styles/ContentReel.scss";

function Styles({ results }) {
  const [edit, setEdit] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const handleCheckboxChange = (name) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = new Set(prevSelectedItems);
      if (updatedSelectedItems.has(name)) {
        updatedSelectedItems.delete(name);
      } else {
        updatedSelectedItems.add(name);
      }
      return updatedSelectedItems;
    });
  };

  const handleSave = () => {
    parent.postMessage(
      { pluginMessage: { type: "userSelection", value: "Save Styles" } },
      "*"
    );
  };

  const handleDelete = () => {
    const namesToDelete = Array.from(selectedItems);

    parent.postMessage(
      { pluginMessage: { type: "deleteStyles", value: namesToDelete } },
      "*"
    );
    setEdit(false);
  };

  return (
    <>
      <div className="stylesHeading">
        <div className="stylesCategories">
          <h2>Saved Styles</h2>
          <div className='editContainer' onClick={() => setEdit(!edit)}>
          <p>Edit</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1.77778 14.2222H3.04444L11.7333 5.53333L10.4667 4.26667L1.77778 12.9556V14.2222ZM0 16V12.2222L11.7333 0.511111C11.9111 0.348148 12.1074 0.222222 12.3222 0.133333C12.537 0.0444444 12.763 0 13 0C13.237 0 13.4667 0.0444444 13.6889 0.133333C13.9111 0.222222 14.1037 0.355556 14.2667 0.533333L15.4889 1.77778C15.6667 1.94074 15.7963 2.13333 15.8778 2.35556C15.9593 2.57778 16 2.8 16 3.02222C16 3.25926 15.9593 3.48519 15.8778 3.7C15.7963 3.91481 15.6667 4.11111 15.4889 4.28889L3.77778 16H0ZM11.0889 4.91111L10.4667 4.26667L11.7333 5.53333L11.0889 4.91111Z"
                fill="#181B29"
              />
            </svg>
            
          </div>
        </div>
        <div className="stylesCategories">
          <p>Style Library: </p>
          <p>Last Saved:</p>
        </div>
      </div>

      <div className="results">
        {results.length > 0 ? (
          results.map(([name, date], index) => (
            <div key={index} className="styleListItem">
              <div className="inputElement">
                {edit ? (
                  <input
                    type="checkbox"
                    checked={selectedItems.has(name)}
                    onChange={() => handleCheckboxChange(name)}
                  />
                ) : null}
                <div className="tag">
                  <p className="primaryIssueText">{name}</p>
                </div>
              </div>
              <p className="secondaryIssueText">{date}</p>
            </div>
          ))
        ) : (
          <div className="empty_content_container">
            <p>No saved styles. Please open a style file to save.</p>
          </div>
        )}
      </div>

      <div className="footer">
        {edit ? (
          <button className="stylesBtn" onClick={() => handleDelete()}>
            Delete from Storage
          </button>
        ) : (
          <button className="stylesBtn" onClick={() => handleSave()}>
            Save Styles
          </button>
        )}
        ;
      </div>
    </>
  );
}

export default Styles;
