import * as Linter from './linterHelper';
import * as Styles from './styles';
import * as Helper from '@figma-plugin/helpers';
import * as Utilities from '@create-figma-plugin/utilities';
import * as ContentReel from './contentReel';
import * as API from './access';
import * as Authenticate from './authentication';

// Constants
const UI_WIDTH = 600;
const UI_HEIGHT = 600;

// State
export let userSelection: string;
export let importedLibraries: LibraryVariableCollection[] = [];

// interface ContentReelChange {
//   item: [string, string]; // Assuming item is a tuple of [nodeName, nodeId]
//   option: string;
// }

// Initialize UI
figma.showUI(__html__);
figma.ui.resize(UI_WIDTH, UI_HEIGHT);
// Test -- reset data
// figma.clientStorage.deleteAsync("figmaToken");
// figma.clientStorage.deleteAsync("keyMap");

// Retrieve the token when the plugin initializes
async function init() {
  const token = await figma.clientStorage.getAsync('figmaToken');
  // console.log(token);
  if (token) {
    console.log('token: ', token);
    figma.ui.postMessage({ type: 'tokenSaved', token });
  } else {
    figma.ui.postMessage({ type: 'errorToken' });
  }
}

init();
// Message handler
figma.ui.onmessage = async (msg) => {
  // console.log(msg);
  // console.log(msg.type);
  // console.log(msg.value[0]);
  // console.log(msg.value[0].id);
  switch (msg.type) {
    case 'saveToken':
      await Authenticate.saveToken(msg.token);
      figma.ui.postMessage({ type: 'tokenSaved' });
      break;
    case 'getToken':
      const token = await Authenticate.getToken();
      figma.ui.postMessage({ type: 'token', token });
      break;
    case 'contentReel':
      await ContentReel.start();
      break;
    case 'applyContentReelChanges':
      
      for(const change of msg.value){
          const nodeId = change.id;
        const selection = change.selectedOption;
        await ContentReel.handleSelection(nodeId, selection);
      }

      
      // figma.closePlugin();
      break;
    case 'userSelection':
      console.log('entered userSelection, ', msg.value);
      userSelection = msg.value[2];
      await handleUserSelection();
      break;
    case 'selectSpecificNode':
      await handleSpecificNode(msg.nodeId);
    case 'saveStyles':
      await Styles.getLocalPaintStyles();
      break;
    case 'selectAllNodes':
      await selectAllNodes(msg.value);
      break;
  }
};
async function handleSpecificNode(nodeId: string) {
  const node = await figma.getNodeByIdAsync(nodeId);
  if (node && 'type' in node) {
    // Check if the node is a SceneNode (i.e., selectable)
    const sceneNode = node as SceneNode;

    // Set the selection to this node
    figma.currentPage.selection = [sceneNode];
    figma.viewport.scrollAndZoomIntoView([sceneNode]);
  } else {
    console.log('Node not found or not selectable');
  }
}

// Helper functions
async function handleUserSelection() {
  await Linter.resetData();
  await logAvailableLibraries();
  await checkIfBound(figma.currentPage.selection);
}

async function selectAllNodes(values: string[]) {
  const nodes: SceneNode[] = [];

  for (const nodeId of values) {
    const id = Array.isArray(nodeId) ? nodeId[1] : nodeId;
    const node = await figma.getNodeByIdAsync(id);

    if (node && !Helper.isOneOfNodeType(node, ['DOCUMENT', 'PAGE'])) {
      nodes.push(node as SceneNode);
    }
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}

export async function logAvailableLibraries() {
  try {
    importedLibraries = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  } catch (error) {
    console.error('Error fetching available libraries: ', error);
  }
}

async function checkIfBound(selection: readonly SceneNode[]) {
  try {
    for (const element of selection) {
      // Go through each node
      const node = (await figma.getNodeByIdAsync(element.id)) as SceneNode;
      console.log(node);
      await traverseNode(node);
    }
    Linter.sendResultsToUI();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function traverseNode(node: SceneNode) {
  // Will make sure the node is not an instance, component, or component_set == will check if it's a logo
  if (await shouldSkipNode(node)) return;
  console.log(userSelection);
  // Lint for spacing
  if (userSelection === 'Spacing' || userSelection === 'All') {
    console.log(node);
    await Linter.startSpacing(node);
    // return;
  }

  // Lint for nodes that have a solid paint fill
  if (userSelection !== 'spacing' && !Helper.isGroupNode(node) && (node as any).fills?.[0]?.type !== 'IMAGE') {
    await checkNodeColors(node);
  }

  if ('children' in node) {
    for (const child of node.children) {
      if (!child.locked) await traverseNode(child);
    }
  }
}

async function shouldSkipNode(node: SceneNode): Promise<boolean> {
  if (userSelection === 'Content Reel') return true;
  // Skip the node if it's locked
  if (Utilities.isLocked(node)) return true;

  if (Helper.isOneOfNodeType(node, ['INSTANCE', 'COMPONENT', 'COMPONENT_SET'])) {
    const keyFound = await checkComponent(node);
    if (keyFound) return true; // Skip if key was found
  }
  return false;
}

async function checkNodeColors(node: SceneNode) {
  const fillableNode = node as unknown as {
    fills: Paint[];
    fillStyleId: string;
    strokes: Paint[];
    strokeStyleId: string;
  };
  await Linter.checkColors(fillableNode.fills, fillableNode.fillStyleId, node);
  await Linter.checkColors(fillableNode.strokes, fillableNode.strokeStyleId, node);
}

// Design Linter: Ignore components if they are from the Assets Library
// Content Reel: Should not ignore any components
async function checkComponent(node: any): Promise<boolean> {
  if (Helper.isInstanceNode(node)) {
    node = await (node as InstanceNode).getMainComponentAsync();
  }

  if (Helper.isComponentNode(node) && node.parent?.type === 'COMPONENT_SET') {
    node = node.parent;
  }

  if (node.type === 'COMPONENT_SET' || node !== null) {
    // Hash the key to get the short key
    const shortKey = API.hashKey(node.key); // Ensure node.key is a string

    // Check if the short key is in assetsKeys
    if (API.keyMap.has(shortKey)) {
      console.log('key was found');
      return true;
    } else {
      console.log('key was not found');
      return false;
    }
  }
  return false;
}
