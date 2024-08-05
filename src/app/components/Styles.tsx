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
          <p>{edit ? "Done" : "Select"}</p>
        
            
          </div>
        </div>
        <div className="stylesCategories">
          <p>Library: </p>
          <p>Save Date:</p>
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
            <p>No saved styles. Please open a file to save a library.</p>
          </div>
        )}
      </div>

      <div className="footer">
        {edit ? (
          <button className="stylesBtn deleteBtn" onClick={() => handleDelete()}>
            Delete From Storage
          </button>
        ) : (
          <button className="stylesBtn" onClick={() => handleSave()}>
            Save Styles
          </button>
        )}
      </div>
    </>
  );
}

export default Styles;
