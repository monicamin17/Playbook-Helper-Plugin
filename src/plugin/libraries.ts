import * as Helper from '@figma-plugin/helpers';
import { importedLibraries } from './controller';
import * as Styles from './styles';
export let missingVariables = new Map();
export let missingStyles = new Map();

export async function checkVariable(color: any, node: SceneNode) {
    const variableId = color['boundVariables'].color.id;
    const hex = Helper.figmaRGBToHex(color.color).toUpperCase();
    if (hex) await connectedLibrary(node, variableId, hex);
}

async function connectedLibrary(node: SceneNode, variableId: string, hex: string) {
    const variable = await figma.variables.getVariableByIdAsync(variableId);
    if (!variable) return;

    const collection = await figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId);
    const collectionName = collection?.name;

    if (!isCollectionImported(collectionName) && collection?.remote) {
        addMissingVariable(hex, node, variableId, collectionName, variable.name);
    }
}

function isCollectionImported(collectionName: string | undefined): boolean {
    return importedLibraries.some(lib => lib.name === collectionName);
}

function addMissingVariable(hex: string, node: SceneNode, variableId: string, collectionName: string | undefined, variableName: string) {
    if (!missingVariables.has(hex)) {
        missingVariables.set(hex, []);
    }
    const varInfo = [node.name, node.id, variableId, collectionName, variableName];
    missingVariables.get(hex).push(varInfo);
}


export async function checkStyle(styleId: string, node: SceneNode) {
    const importedStyle = await figma.getStyleByIdAsync(styleId);
    if (!importedStyle) return;

    const keys = await Styles.getSavedKeys();

    // Make sure keys is able to enumerated
    if (!Array.isArray(keys)) return;

    for (const library of keys) {
        /* allColorNames[0] contains all the style information. allColorNames[1] contains the date it was saved. */
        const allColorNames = await figma.clientStorage.getAsync(library);

        /* Check if the style name matches */
        const matchingColor = allColorNames[0].find((color: any) => color.name === importedStyle.name);
        let style = await figma.getStyleByIdAsync(importedStyle.id);
        

        for(const key of importedLibraries){
            if(library === key.libraryName) return;
        }
        
        if (matchingColor && (!isLibraryImported(library) || style.remote)) {
            addMissingStyle(importedStyle, node, library, styleId);
            break;
        }
    } 
}

async function isLibraryImported(library: string): Promise<boolean> {
    const importedLibraries = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
    return importedLibraries.some(lib => lib.libraryName === library);
}

function addMissingStyle(style: BaseStyle, node: SceneNode, styleId: string, library: string) {
    if (style.type === 'PAINT' && Array.isArray(style.paints) && style.paints.length > 0) {
        const color = style.paints[0]?.color;
        const hex = Helper.figmaRGBToHex(color).toUpperCase();
        if (!missingStyles.has(hex)) {
            missingStyles.set(hex, []);
        }
        const styleInfo = [node.name, node.id, styleId, library, style.name];

        missingStyles.get(hex).push(styleInfo);
    }
}