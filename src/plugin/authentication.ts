import * as API from "./access";

// Save the token to client storage and validate it
export async function saveToken(token: string) {
  const valid = await API.checkToken(token);
  if (!valid) {
    figma.ui.postMessage({ type: "invalidToken" });
    return;
  }

  await figma.clientStorage.setAsync("figmaToken", token);
  figma.ui.postMessage({ type: "tokenSaved" });
  await API.initializeData();
}

// Retrieve the token from client storage
export async function getToken(): Promise<string | undefined> {
  return await figma.clientStorage.getAsync("figmaToken");
}
