// import * as Authenticate from './authentication';

let token: string;    // Personal access token
export let keyMap: Map<string, string> = new Map(); // Map for short keys to full keys
/* The team id will be present in the URL after the word team and before your team name. */
export let teamId = '';


// Make sure this token is valid
export async function checkToken(token: string) {
  const response = await fetch(`https://api.figma.com/v1/me/`, {
    method: 'GET',
    headers: {
      'X-FIGMA-TOKEN': token, // Custom header if needed
    },
  });

  // Handle the response
  return response.ok;
}

export async function initializeData() {
  token = await figma.clientStorage.getAsync('figmaToken');
  if (token && (await checkToken(token))) {
    await loadTeam();
  } else {
    console.error('Invalid or missing token');
  }
}

export async function fetchData(term: string, id: string, endpoint: string, state?: string) {
//   let token2 = await Authenticate.getToken();
  try {
    let url = `https://api.figma.com/v1/${term}/${id}/${endpoint}`;
    if (state) {
      url += `/${state}`;
    }

    // Fetch data from the constructed URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-FIGMA-TOKEN': token, // Custom header if needed
      },
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function postData(term: string, id: string, endpoint: string, state?: string) {
  // let token2 = await Authenticate.getToken();
  try {
    let url = `https://api.figma.com/v1/${term}/${id}/${endpoint}`;
    if (state) {
      url += `/${state}`;
    }

    // Fetch data from the constructed URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-FIGMA-TOKEN': token, // Custom header if needed
      },
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function loadTeam() {
  try {
    let data = await fetchData('teams', teamId, 'projects');
    console.log(data);

    // Passes in the id for 1.Fundamentals
    await processProject(data['projects'][0].id, data['projects'][0].name);

    // Passes in id for 4. Assets
    await processProject(data['projects'][3].id, data['projects'][3].name);
  } catch (error) {
    console.error('Error loading team data:', error);
  }
}

async function processProject(projectID: string, projectName: string) {
  try {
    let data = await fetchData('projects', projectID, 'files');

    for (const file of data['files']) {
      if (file.name.toLowerCase().includes('color')) {
        await processColors(file.key, file.name);
      } else if (
        projectName.includes('Assets') &&
        (file.name.toLowerCase() === 'team logos' ||
          file.name.toLowerCase() === 'country flags' ||
          file.name.toLowerCase() === 'company logos')
      ) {
        await processAssetComponents(file.key, file.name);
      }
    }
  } catch (error) {
    console.error('Error processing project:', error);
  }
}

async function processColors(fileKey: string, fileName: string) {
  try {
    let variables = await fetchData('files', fileKey, 'variables', 'published');
    // Note: Skipping storage of large variables in clientStorage
    console.log(variables);
  
    console.log('Fetched color variables for ', fileName);
  } catch (error) {
    console.error('Error processing colors:', error);
  }
}

async function processAssetComponents(fileKey: string, fileName: string) {
  try {
    console.log(fileName);
    // Fetch asset components and component sets in parallel
    const [assetComponents, assetComponentSets] = await Promise.all([
      fetchData('files', fileKey, 'components'),
      fetchData('files', fileKey, 'component_sets'),
    ]);

    // Define a function to handle component processing
    const processComponents = (components: any[]) => {
      for (const component of components) {
        // console.log('componentkey: ', component.key);
        const shortKey = hashKey(component.key); // Shorten key
        // console.log('shortKey: ', shortKey);
        // keyMap[shortKey] = component.key; // Store full key in map
        keyMap.set(shortKey, component.key);
        // console.log('keyMap[shortKey]: ', keyMap[shortKey]);
        // assetsKeys.push(shortKey); // Store short key
      }

      // figma.clientStorage.setAsync('assets', assetsKeys);
      figma.clientStorage.setAsync('keyMap', keyMap); // Store keyMap in clientStorage
    };

    // Process asset components and component sets
    processComponents(assetComponents['meta']['components']);
    processComponents(assetComponentSets['meta']['component_sets']);
  } catch (error) {
    console.error('Error processing asset components:', error);
  }
}

export function hashKey(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).slice(0, 10);
}