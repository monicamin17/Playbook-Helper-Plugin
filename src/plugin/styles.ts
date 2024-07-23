// Functions for getting styles from files.
export async function getLocalPaintStyles() {
  const fileName = figma.root.name;
  const paintStyles = await figma.getLocalPaintStylesAsync();
  const paintStylesData = paintStyles.map(style => ({
    id: style.id,
    name: style.name,
    paint: style.paints[0]
  }));

  // TEST!
  // console.log(paintStylesData);

  saveToLocalStorage(paintStylesData, fileName);
  return paintStylesData;
}

/*
async function getLocalTextStyles() {
  const textStyles = figma.getLocalTextStyles();
  const textStylesData = textStyles.map(style => ({
    id: style.id,
    key: style.key,
    name: style.name,
    description: style.description,
    style: {
      fontFamily: style.fontName.family,
      fontStyle: style.fontName.style,
      fontSize: style.fontSize,
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeight,
      textDecoration: style.textDecoration,
      textAlignHorizontal: style.textAlignHorizontal,
      textAlignVertical: style.textAlignVertical,
      textAutoResize: style.textAutoResize,
      paragraphIndent: style.paragraphIndent,
      paragraphSpacing: style.paragraphSpacing,
      textCase: style.textCase
    }
  }));

  return textStylesData;
}
*/
/*
async function getLocalEffectStyles() {
  const effectStyles = figma.getLocalEffectStyles();
  const effectStylesData = effectStyles.map(style => ({
    id: style.id,
    name: style.name,
    effects: style.effects
  }));

  return effectStylesData;
}
*/

async function saveToLocalStorage(data:any, fileName:any) {
  figma.clientStorage.setAsync(fileName, data);
  // console.log('Successfully stored local styles.');
}

export async function getSavedKeys(){
  let keys = await figma.clientStorage.keysAsync();
  return keys;
}


//   module.exports = {
//     getLocalPaintStyles,
//     saveToLocalStorage,
//     // getLocalTextStyles,
//     // getLocalEffectStyles
//   };