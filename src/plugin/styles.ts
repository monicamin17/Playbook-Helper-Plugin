const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Get the local styles of the current file
export async function getLocalPaintStyles() {
  const fileName = figma.root.name;
  const paintStyles = await figma.getLocalPaintStylesAsync();
  const paintStylesData = paintStyles.map(style => ({
    id: style.id,
    name: style.name,
    paint: style.paints[0]
  }));


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
  

  let today = new Date();
  console.log(today.getDate());
  let dd = today.getDate();
  let mm = months[today.getMonth()];
  let yyyy = today.getFullYear();
  let todayDate = mm + ' ' + dd + ', ' + yyyy;

  figma.clientStorage.setAsync(fileName, [data, todayDate]);
  return;
}

export async function getSavedKeys(){
  let keys = await figma.clientStorage.keysAsync();
  return keys;
}

export async function deleteKeys(keys: string[]){
  for(const key of keys){
    await figma.clientStorage.deleteAsync(key);
  }
}
