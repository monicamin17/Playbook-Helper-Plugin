import * as Libraries from "./libraries";
import * as Hex from "./hex";
import * as Main from "./controller";
import * as Spacing from "./spacing";
import * as Helper from "@figma-plugin/helpers";


// export let userSelection = 'All';
export let importedLibraries: any[] = [];

// Handle the colors appropriately (if it's a gradient or not)
export async function checkColors(
  colors: any[],
  styleId: string,
  node: SceneNode
) {
  if (!Array.isArray(colors) || colors.length === 0) return;
  for (const color of colors) {
    if (color.type === 'IMAGE' || color.type === 'VIDEO') return;
    if (checkColorsType(color, styleId)) {
      console.log('color: ', color);
      console.log('color.color: ', color.color);
      if(color.color){
        await Hex.manageHex([color.color], node);
      }
      else{
        await Hex.manageGradient(color.gradientStops, node);
      }
    } else if (!checkColorsType(color, styleId)) {
      await handleUnimportedColor(color, styleId, node);
    }
  }
}

function checkColorsType(color: any, styleId: string) : boolean{
  const hasNoBoundVariables = !color?.boundVariables || Object.keys(color.boundVariables).length === 0;
  console.log('hasNoBoundVariables: ', hasNoBoundVariables);
  return (
    hasNoBoundVariables &&
    styleId === ""
  );
}


async function handleUnimportedColor(
  color: any,
  styleId: string,
  node: SceneNode
) {
  console.log('what');
  if (styleId !== "") {
    await Libraries.checkStyle(styleId, node);
  } else {
    await Libraries.checkVariable(color, node);
  }
}

export async function resetData() {
  console.log('resetting')
  Libraries.missingVariables.clear();
  Libraries.missingStyles.clear();
  Hex.hexMap.clear();
  Spacing.bottomLeftRadiusMap.clear();
  Spacing.bottomRightRadiusMap.clear();
  Spacing.topLeftRadiusMap.clear();
  Spacing.topRightRadiusMap.clear();
  Spacing.radiusMap.clear();
  Spacing.itemSpacingMap.clear();
  Spacing.paddingLeftMap.clear();
  Spacing.paddingRightMap.clear();
  Spacing.paddingSidesMap.clear();
  Spacing.paddingTopMap.clear();
  Spacing.paddingBottomMap.clear();
  Spacing.paddingTopBottomMap.clear();
}

// If user lints for spacing, start the functions
export async function startSpacing(node: any) {
  console.log(node.type);
  if(Helper.isTextNode(node) || node.type === 'VECTOR' || node.type === 'BOOLEAN_OPERATION' || node.type === 'GROUP' || node.type === 'LINE') return; 
  Spacing.checkRadius(node);

  // Only frames in autolayout can have padding/spacing
  if (Helper.isFrameNode(node) && node["layoutMode"] !== "NONE")
    Spacing.checkSpacing(node);
}


export async function sendResultsToUI() {
  const results: {
    missingVariables?: any[];
    missingStyles?: any[];
    hexColors?: any[];
    bottomLeftRadiusMap?: any[];
    bottomRightRadiusMap?: any[];
    topLeftRadiusMap?: any[];
    topRightRadiusMap?: any[];
    radiusMap?: any[];
    itemSpacingMap?: any[];
    counterAxisSpacing?: any[];
    paddingLeftMap?: any[];
    paddingRightMap?: any[];
    paddingSidesMap?: any[];
    paddingTopMap?: any[];
    paddingBottomMap?: any[];
    paddingTopBottomMap?: any[];
  } = {};
console.log(results);
  if (Main.userSelection === "Library" || Main.userSelection === "All") {
    if (Libraries.missingVariables.size > 0) {
      results.missingVariables = Array.from(
        Libraries.missingVariables.entries()
      );
    }

    if (Libraries.missingStyles.size > 0) {
      results.missingStyles = Array.from(Libraries.missingStyles.entries());
    }
  }

  if (
    (Main.userSelection === "Hex" || Main.userSelection === "All") &&
    Hex.hexMap.size > 0
  ) {
    results.hexColors = Array.from(Hex.hexMap.entries());
  }

  if (Main.userSelection === "Spacing" || Main.userSelection === "All") {
    if (Spacing.bottomLeftRadiusMap.size > 0) {
      results.bottomLeftRadiusMap = Array.from(
        Spacing.bottomLeftRadiusMap.entries()
      );
    }

    if (Spacing.bottomRightRadiusMap.size > 0) {
      results.bottomRightRadiusMap = Array.from(
        Spacing.bottomRightRadiusMap.entries()
      );
    }

    if (Spacing.topLeftRadiusMap.size > 0) {
      results.topLeftRadiusMap = Array.from(Spacing.topLeftRadiusMap.entries());
    }

    if (Spacing.topRightRadiusMap.size > 0) {
      results.topRightRadiusMap = Array.from(
        Spacing.topRightRadiusMap.entries()
      );
    }

    if (Spacing.radiusMap.size > 0) {
      results.radiusMap = Array.from(Spacing.radiusMap.entries());
    }

    if (Spacing.itemSpacingMap.size > 0) {
      results.itemSpacingMap = Array.from(Spacing.itemSpacingMap.entries());
    }

    if (Spacing.counterAxisSpacing.size > 0) {
      results.counterAxisSpacing = Array.from(Spacing.counterAxisSpacing.entries());
    }

    if (Spacing.paddingLeftMap.size > 0) {
      results.paddingLeftMap = Array.from(Spacing.paddingLeftMap.entries());
    }

    if (Spacing.paddingRightMap.size > 0) {
      results.paddingRightMap = Array.from(Spacing.paddingRightMap.entries());
    }

    if (Spacing.paddingSidesMap.size > 0) {
      results.paddingSidesMap = Array.from(Spacing.paddingSidesMap.entries());
    }

    if (Spacing.paddingTopMap.size > 0) {
      results.paddingTopMap = Array.from(Spacing.paddingTopMap.entries());
    }

    if (Spacing.paddingBottomMap.size > 0) {
      results.paddingBottomMap = Array.from(Spacing.paddingBottomMap.entries());
    }

    if (Spacing.paddingTopBottomMap.size > 0) {
      results.paddingTopBottomMap = Array.from(
        Spacing.paddingTopBottomMap.entries()
      );
    }
  }
  console.log(results);

  // Determine message type based on the results content
  let messageType = "results";
  if (Object.keys(results).length === 0) {
    messageType = "none";
  }
  console.log('messageType: ', messageType);

  // Spacing.fixIssues();
  // Post message to the UI
  figma.ui.postMessage({ type: messageType, data: results });
}
