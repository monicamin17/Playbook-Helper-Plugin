// cornerRadius<radiusValue, nodeIds[]>
export let bottomLeftRadiusMap = new Map();
export let bottomRightRadiusMap = new Map();
export let topLeftRadiusMap = new Map();
export let topRightRadiusMap = new Map();
export let radiusMap = new Map();

export let itemSpacingMap = new Map();
export let paddingLeftMap = new Map();
export let paddingRightMap = new Map();
export let paddingSidesMap = new Map();

export let paddingTopMap = new Map();
export let paddingBottomMap = new Map();
export let paddingTopBottomMap = new Map();

// let spatialSystemId = "NJRBXzVYuATYIywvZftwDP";

export async function checkSpacing(node: any) {
  let boundVariables = node["boundVariables"];
  let verticalSpacing = false;
  let horizontalSpacing = false;

  // No item spacing
  if (boundVariables["itemSpacing"] === undefined && node.itemSpacing !== 0) {
    addToMap(itemSpacingMap, node.itemSpacing,  node.name, node.id, "Item Spacing Missing");
  }

  // Side paddings missing
  if (
    boundVariables["paddingLeft"] === undefined &&
    boundVariables["paddingRight"] === undefined &&
    node.paddingLeft !== 0 &&
    node.paddingRight === node.paddingLeft
  ) {
    addToMap(
      paddingSidesMap,
      node.paddingLeft,
       node.name, node.id,
      "Side Padding Missing"
    );
    horizontalSpacing = true;
    
  }

  if(!horizontalSpacing){
    // Left padding missing
    if (boundVariables["paddingLeft"] === undefined && node.paddingLeft !== 0) {
      addToMap(paddingLeftMap, node.paddingLeft, node.name, node.id, "Left Padding Missing");
    }

    // Right padding missing
    if (boundVariables["paddingRight"] === undefined && node.paddingRight !== 0) {
      addToMap(
        paddingRightMap,
        node.paddingRight,
        node.name, node.id,
        "Right Padding Missing"
      );
    }
  }
  // Top/Bottom padding missing
  if (
    boundVariables["paddingTop"] === undefined &&
    boundVariables["paddingBottom"] === undefined &&
    node.paddingBottom !== 0 &&
    node.paddingTop === node.paddingBottom
  ) {
    addToMap(
      paddingTopBottomMap,
      node.paddingBottom,
       node.name, node.id,
      "Top/Bottom Padding Missing"
    );
    verticalSpacing = true;
  }

  if(!verticalSpacing){
    // Top padding missing
    if (boundVariables["paddingTop"] === undefined && node.paddingTop !== 0) {
      addToMap(paddingTopMap, node.paddingTop,  node.name, node.id, "Top Padding Missing");
    }

    // Bottom padding missing
    if (
      boundVariables["paddingBottom"] === undefined &&
      node.paddingBottom !== 0
    ) {
      addToMap(
        paddingBottomMap,
        node.paddingBottom,
        node.name, node.id,
        "Bottom Padding Missing"
      );
    }
  }
}

export async function checkRadius(node: any) {
  let boundVariables = node["boundVariables"];

  // All radius have the same value
  if (
    boundVariables["bottomLeftRadius"] === undefined &&
    boundVariables["bottomRightRadius"] === undefined &&
    boundVariables["topLeftRadius"] === undefined &&
    boundVariables["topRightRadius"] === undefined &&
    node.bottomLeftRadius === node.bottomRightRadius &&
    node.bottomLeftRadius === node.topLeftRadius &&
    node.bottomLeftRadius === node.topRightRadius &&
    node.bottomLeftRadius !== 0
  ) {
    addToMap(radiusMap, node.bottomLeftRadius,  node.name, node.id, "Radius missing");
    return;
  }

  if (
    boundVariables["bottomLeftRadius"] === undefined &&
    node.bottomLeftRadius !== 0
  ) {
    addToMap(
      bottomLeftRadiusMap,
      node.bottomLeftRadius,
       node.name, node.id,
      "Bottom Left Radius missing"
    );
  }

  if (
    boundVariables["bottomRightRadius"] === undefined &&
    node.bottomRightRadius !== 0
  ) {
    addToMap(
      bottomRightRadiusMap,
      node.bottomRightRadius,
       node.name, node.id,
      "Bottom Right Radius missing"
    );
  }

  if (
    boundVariables["topLeftRadius"] === undefined &&
    node.topLeftRadius !== 0
  ) {
    addToMap(
      topLeftRadiusMap,
      node.topLeftRadius,
       node.name, node.id,
      "Top Left Radius missing"
    );
  }

  if (
    boundVariables["topRightRadius"] === undefined &&
    node.topRightRadius !== 0
  ) {
    addToMap(
      topRightRadiusMap,
      node.topRightRadius,
       node.name, node.id,
      "Top Right Radius missing"
    );
  }

}

async function addToMap(
  cornerMap: any,
  value: number,
  nodeName:string,
  nodeId: string,
  errorMsg: string
) {
  if (!cornerMap.has(value)) {
    cornerMap.set(value, []);
  }

  cornerMap.get(value).push([nodeName, nodeId, errorMsg]);
}

// export async function fixIssues() {
//   try {
//     // Fetch the data from API
//     let response = await API.fetchData("files", spatialSystemId, "variables", "local");
//     console.log("spatialSystem: ", response);

//     let variables = response["meta"].variables;

//     // Filter spacing variables in their name
//     const spacingVariables = Object.values(variables).filter((variable) =>
//       (variable as Variable).name.toLowerCase().includes("spacing")
//     );

//     // Create a map for quick lookup
//     const variableMap = new Map<string, Variable>();
//     spacingVariables.forEach((variable) => {
//       const v = variable as Variable;
//       variableMap.set(v.id, v);
//     });

//     // Fetch variable objects from Figma to ensure they exist
//     const variableObjects = await Promise.all(
//       spacingVariables.map(async (variable) => {
//         const variableId = (variable as Variable).id;
//         try {
//           return await figma.variables.getVariableByIdAsync(variableId);
//         } catch (error) {
//           console.error(`Error fetching variable with ID ${variableId}: ${error}`);
//           return null;
//         }
//       })
//     );

//     const variableObjectMap = new Map(
//       variableObjects.filter((v): v is Variable => v !== null).map((v) => [v.id, v])
//     );

//     console.log(Array.from(variableObjectMap.entries()));

//     for (const variable of spacingVariables) {
//       const variableId = (variable as Variable).id;
//       const valuesByMode = (variable as Variable).valuesByMode;

//       // Log or process each mode value
//       // console.log(`Variable ID: ${variableId}`);
//       for (const [modeId, value] of Object.entries(valuesByMode)) {
//         console.log(`Mode ID: ${modeId}, Value: ${value}`);
        
//         for (const [spacingValue, nodes] of itemSpacingMap) {
//           if (spacingValue === value) {
//             for (const nodeId of nodes) {
//               try {
//                 let node = await figma.getNodeByIdAsync(nodeId[0]);
//                 if (node?.type === 'FRAME') {
//                   // Retrieve the variable object from the map
//                   const variableObject = variableObjectMap.get(variableId);
//                   if (variableObject) {
//                     node.setBoundVariable("itemSpacing", variableObject);
//                   } else {
//                     console.error(`Variable with ID ${variableId} not found in the variable object map.`);
//                   }
//                 }
//               } catch (error) {
//                 console.error(`Error getting node by ID ${nodeId[0]}: ${error}`);
//               }
//             }
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error(`Error fetching data or processing variables: ${error}`);
//   }
// }
