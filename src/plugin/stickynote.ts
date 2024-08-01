// import * as Utilities from "@create-figma-plugin/utilities";
import * as Helper from "@figma-plugin/helpers";

export default async function createSticky(color:string) {
    console.log(color);
  const frame = figma.createFrame();
  frame.layoutMode = "VERTICAL";
  frame.minWidth = 240;
  frame.minHeight = 245;

  let blue = "80CAFF";
  let green = "85E0A3";
  let yellow = "FFD966";
  let purple = "D9B8FF";
  let colorFill;
  switch(color){
    case 'Blue':
      colorFill = blue;
      break;
    case 'Green':
      colorFill = green;
      break;
    case 'Yellow':
      colorFill = yellow;
      break;
    case 'Purple':
      colorFill = purple;
      break;

  }

  let rgb = await Helper.hexToFigmaRGB(colorFill);
  frame.fills = [{ type: "SOLID", color: rgb }];
  frame.verticalPadding = 20;
  frame.horizontalPadding = 20;
  const text = figma.createText();

  //   Load the font in the text node before setting the characters
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  text.fontName = { family: "Inter", style: "Medium" };
  text.characters = "Type anything here";
  text.layoutAlign = "STRETCH";

  text.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0} }];

  text.fontSize = 16;
  text.lineHeight = { value: 150, unit: "PERCENT" };
  text.letterSpacing = { value: -1.1, unit: "PERCENT" };
  frame.appendChild(text);
  frame.name = "📌 StickyNote";


  // const viewport = figma.viewport.bounds;
  // const viewportWidth = viewport.width;
  // const viewportHeight = viewport.height;
  // const frameWidth = frame.width;
  // const frameHeight = frame.height;

  // // Calculate the position to center the frame
  // const x = (viewportWidth - frameWidth) / 2;
  // const y = (viewportHeight - frameHeight) / 2;

  // frame.x = x;
  // frame.y = y;
  figma.viewport.scrollAndZoomIntoView([frame]);
  return frame;
}
