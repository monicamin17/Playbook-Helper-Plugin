import * as Helper from '@figma-plugin/helpers';

export let hexMap = new Map();

export async function manageHex(colors: any[], node: SceneNode) {
    for (const val of colors) {
        const hex = Helper.figmaRGBToHex(val).toUpperCase();
        console.log(hex);
        if (hex) {
            addToHexMap(hex, node.name, node.id);
        }
    }
}


export async function manageGradient(gradientStops: any[], node: SceneNode) {
    console.log('gradientStops: ', gradientStops);

    for (const stop of gradientStops) {
        console.log(stop.color);
        const hex = Helper.figmaRGBToHex(stop.color).toUpperCase();
        if (hex) {
            console.log(hex);
            addToHexMap(hex, node.name, node.id);
        }
    }
    console.log('reached end');
}

async function addToHexMap(hex: string, nodeName:string, nodeId: string) {
    if (!hexMap.has(hex)) {
        hexMap.set(hex, []);
    }
    hexMap.get(hex).push([nodeName, nodeId]);
}