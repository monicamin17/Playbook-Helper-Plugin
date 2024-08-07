import * as Helper from '@figma-plugin/helpers';

export let hexMap = new Map();

export async function manageHex(colors: any[], node: SceneNode) {
    for (const val of colors) {
        const hex = Helper.figmaRGBToHex(val).toUpperCase();
        if (hex) {
            addToHexMap(hex, node.name, node.id);
        }
    }
}


export async function manageGradient(gradientStops: any[], node: SceneNode) {

    for (const stop of gradientStops) {
        const hex = Helper.figmaRGBToHex(stop.color).toUpperCase();
        if (hex) {
            addToHexMap(hex, node.name, node.id);
        }
    }
}

async function addToHexMap(hex: string, nodeName:string, nodeId: string) {
    if (!hexMap.has(hex)) {
        hexMap.set(hex, []);
    }
    hexMap.get(hex).push([nodeName, nodeId]);
}