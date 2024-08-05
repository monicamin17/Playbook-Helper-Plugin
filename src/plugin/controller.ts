import * as Linter from "./linterHelper";
import * as Styles from "./styles";
import * as Helper from "@figma-plugin/helpers";
import * as Utilities from "@create-figma-plugin/utilities";
import * as ContentReel from "./contentReel";
// import * as API from "./access";
// import * as Authenticate from "./authentication";
import * as StickyNote from "./stickynote";
// Constants
const UI_WIDTH = 500;
const UI_HEIGHT = 600;

// State
export let userSelection: string;
export let importedLibraries: LibraryVariableCollection[] = [];

// Initialize UI
figma.showUI(__html__);
figma.ui.resize(UI_WIDTH, UI_HEIGHT);


init();

// Message handler
figma.ui.onmessage = async (msg) => {
  // console.log(msg.type);
  // console.log(msg.value);

  switch (msg.type) {
    // case "saveToken":
    //   await Authenticate.saveToken(msg.token);
    //   figma.ui.postMessage({ type: "tokenSaved" });
    //   break;
    // case "getToken":
    //   const token = await Authenticate.getToken();
    //   figma.ui.postMessage({ type: "token", token });
    //   break;
    case "stickyNote":
      await StickyNote.default(msg.value);
      break;
    case "pluginDrop":
      await StickyNote.default(msg.dropMetadata, msg.clientX, msg.clientY);
      break;
    case "contentReel":
      await ContentReel.start();
      break;
    case "applyContentReelChanges":
      for (const change of msg.value) {
        const nodeId = change.id;
        const selection = change.selectedOption;
        await ContentReel.handleSelection(nodeId, selection);
      }
      break;
    case "userSelection":
      userSelection = msg.value;
      await handleUserSelection();
      break;
    case "getSavedStyles":
      await returnSavedLibrary();
      break;
    case "deleteStyles":
      await Styles.deleteKeys(msg.value);
      await returnSavedLibrary();
    case "selectSpecificNode":
      await handleSpecificNode(msg.nodeId);
    case "selectAllNodes":
      await selectAllNodes(msg.value);
      break;
  }
};

async function returnSavedLibrary(){
  let allStyles = await Styles.getSavedKeys();
  let returnLibraries = [];
  for (const library of allStyles) {
    let libraryObject = await figma.clientStorage.getAsync(library);
    let libraryName = library;
    let lastSaved = libraryObject[1];
    console.log(libraryName, ' ', lastSaved);

    returnLibraries.push([libraryName, lastSaved]);
  }
  console.log("GETTING SAVED STYLES! ", returnLibraries);
  figma.ui.postMessage({ type: "All Saved Styles", data: returnLibraries });
}



// Retrieve the token when the plugin initializes
async function init() {
  const token = await figma.clientStorage.getAsync("figmaToken");
  if (token) {
    figma.ui.postMessage({ type: "tokenSaved", token });
  } else {
    figma.ui.postMessage({ type: "errorToken" });
  }
}

// Select/zoom into the node that the user selected
async function handleSpecificNode(nodeId: string) {
  const node = await figma.getNodeByIdAsync(nodeId);
  if (node && "type" in node) {
    // Check if the node is a SceneNode (i.e., selectable)
    const sceneNode = node as SceneNode;

    // Set the selection to this node
    figma.currentPage.selection = [sceneNode];
    figma.viewport.scrollAndZoomIntoView([sceneNode]);
  } else {
    console.log("Node not found or not selectable");
  }
}

/* If user selects any of the Linter options, reset all the data, check imported libraries, 
   and go through the selection */
async function handleUserSelection() {
  await Linter.resetData();
  // importedLibraries = [];
  console.log('importedLIbraries: ', importedLibraries);
  await logAvailableLibraries();

  if(userSelection === 'Save Styles'){
    await Styles.getLocalPaintStyles();
    await returnSavedLibrary();
    // figma.ui.postMessage({ type: 'results', data: 'Successfully stored local styles.' });
    return;
  }
  else{ 
    await checkIfBound(figma.currentPage.selection);
  }
}

// Select all of the issue nodes if the user presses the 'Select All' button
async function selectAllNodes(values: string[]) {
  const nodes: SceneNode[] = [];

  for (const nodeId of values) {
    const id = Array.isArray(nodeId) ? nodeId[1] : nodeId;
    const node = await figma.getNodeByIdAsync(id);

    if (node && !Helper.isOneOfNodeType(node, ["DOCUMENT", "PAGE"])) {
      nodes.push(node as SceneNode);
    }
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}

// Checks which libraries are imported into the file
export async function logAvailableLibraries() {
  try {
    importedLibraries = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
      console.log('after process: ', importedLibraries);
  } catch (error) {
    console.error("Error fetching available libraries: ", error);
  }
}

async function checkIfBound(selection: readonly SceneNode[]) {
  try {
    // Go through each selected node
    for (const element of selection) {
      const node = (await figma.getNodeByIdAsync(element.id)) as SceneNode;
      // console.log(node);
      await traverseNode(node);
    }

    // After scanning each node, send it back to the UI
    Linter.sendResultsToUI();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function traverseNode(node: SceneNode) {
  // Will make sure the node is not an instance, component, or component_set == will check if it's a logo
  if (await shouldSkipNode(node)) return;

  // Lint for spacing
  if (userSelection === "Spacing" || userSelection === "All") {
    console.log(node);
    await Linter.startSpacing(node);
    // return;
  }

  // Lint for nodes that have a solid paint fill
  if (
    userSelection !== "spacing" &&
    !Helper.isGroupNode(node) &&
    (node as any).fills?.[0]?.type !== "IMAGE"
  ) {
    console.log("gonna checknodecolors");
    await checkNodeColors(node);
  }

  if ("children" in node) {
    for (const child of node.children) {
      if (!child.locked) await traverseNode(child);
    }
  }
}

// Skip asset components and locked/stickynote nodes
async function shouldSkipNode(node: SceneNode): Promise<boolean> {
  // Node is locked or is a StickyNote
  if (Utilities.isLocked(node) || node.name.includes('📌 StickyNote')) return true;


  // If it's a component/instance, check if it has the keyword in the description to skip over it
  if (Helper.isOneOfNodeType(node, ["INSTANCE", "COMPONENT", "COMPONENT_SET"])) {
    const keyFound = await checkComponent(node);
    if (keyFound) return true; // Skip if key was found
  }
  return false;
}

// Scan each node's fill and stroke
async function checkNodeColors(node: SceneNode) {
  const fillableNode = node as unknown as {
    fills: Paint[];
    fillStyleId: string;
    strokes: Paint[];
    strokeStyleId: string;
  };

  await Linter.checkColors(fillableNode.fills, fillableNode.fillStyleId, node);
  await Linter.checkColors(
    fillableNode.strokes,
    fillableNode.strokeStyleId,
    node
  );
}


// Will check if the node has the word "@@PLAYBOOK_HELPER_PLUGIN: SKIP" in it's description -> keyword to skip
async function checkComponent(node: any): Promise<boolean> {
  if (Helper.isInstanceNode(node)) {
    node = await (node as InstanceNode).getMainComponentAsync();
  }

  if (Helper.isComponentNode(node) && node.parent?.type === "COMPONENT_SET") {
    node = node.parent;
  }

  if (node.type === "COMPONENT_SET" || node !== null) {
    if ((node as ComponentSetNode).description?.includes("@PLAYBOOK_HELPER_PLUGIN: SKIP")) {
      return true;
    }
  }

  return false;
}
