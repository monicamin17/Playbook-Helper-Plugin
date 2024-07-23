import React, { useState } from 'react';

// Main component to render the list
function IssueList({ values, id }) {
  return (
    <div id="missingList">
      {values.map((value, index) => (
        <ListItem 
          key={index} 
          hex={value[0]} 
          nodeArray={value[1]} 
          type={id === "hexColors" ? "hex" : id === "missingVariables" ? "variable" : "style"}
        />
      ))}
    </div>
  );
}

// Component for each list item
function ListItem({ hex, nodeArray, type }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectAllClick = () => {
    // Implement your handleSelectAllClick logic here
    console.log("Select all clicked for", nodeArray);
  };

  const toggleExpandedList = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div id="listItem">
      <div 
        id="swatch" 
        style={{
          backgroundColor: hex,
          width: "50px",
          height: "50px",
          borderRadius: type === "style" ? "50%" : "0"
        }}
      />
      <div id="contentContainer">
        <div id="issueContainer">
          {type === "hex" ? (
            <p id="hexValue">{hex}</p>
          ) : (
            <p id="name">{nodeArray[0][4]}</p>
          )}
          <p>•</p>
          <p id="numIssues">{nodeArray.length}</p>
          <div className="arrowSVGContainer" onClick={toggleExpandedList}>
            <svg width="24" height="43" viewBox="0 0 24 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG path here */}
            </svg>
          </div>
        </div>
        {type !== "hex" && <p id="libName">{nodeArray[0][3]}</p>}
        <p id="selectAll" onClick={handleSelectAllClick}>Select All</p>
      </div>
      {isExpanded && (
        <ExpandedList nodeArray={nodeArray} />
      )}
    </div>
  );
}

// Component for the expanded list
function ExpandedList({ nodeArray }) {
  return (
    <div className="expandedListContainer">
      {nodeArray.map((node, index) => (
        <div key={index} className="expandedListItem">
          {node[0]} {/* Assuming the first element is the node name */}
        </div>
      ))}
    </div>
  );
}

// Usage
function App() {
  const sampleData = [
    ["#FF0000", [["Node1", "id1", "other data"], ["Node2", "id2", "other data"]]],
    ["#00FF00", [["Node3", "id3", "other data"], ["Node4", "id4", "other data"]]]
  ];

  return (
    <div>
      <IssueList values={sampleData} id="hexColors" />
    </div>
  );
}

export default App;