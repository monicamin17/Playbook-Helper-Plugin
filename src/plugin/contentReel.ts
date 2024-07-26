import * as Utilities from "@create-figma-plugin/utilities";
import * as Helper from "@figma-plugin/helpers";
const frameToNodes: Map<string, { parentFrameName:string, textNodes: [string, string][], imageNodes?: [string, string][], article?: Article }> = new Map();
// <frameId, {[nodes.name, node.id], article?}

export let textNodes: [string, string][] = [];
export let imageNodes: [string, string][] = [];
export let textOptions = [
  "Headline",
  "Duration",
  "Timestamp",
  "Author",
  "Team",
  "Player",
  "League"
];
const accessToken = "50faf2503afd19c54d1173aa12b818aaa6732cbf";

class Article {
  promoTitle: string;
  url: string;
  author: string;
  timeStamp: string;
  duration: string;
  team: string;

  constructor(
    title: string,
    url: string,
    author: string,
    timeStamp: string,
    duration: string,
    team: string
  ) {
    this.promoTitle = title;
    this.url = url;
    this.author = author;
    this.timeStamp = timeStamp;
    this.duration = duration;
    this.team = team;
  }
}

class Player {
  firstName: string;
  lastName: string;
  team: string;

  constructor(firstName: string, lastName: string, team: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.team = team;
  }
}

// Scan through all selected nodes
export async function start() {
  for (const node of figma.currentPage.selection) {
    await Utilities.traverseNodeAsync(node, parseNodes);
  }

  const framesObject = Object.fromEntries(frameToNodes);

  figma.ui.postMessage({ type: "results", data: { text: textNodes, image: imageNodes, frames: framesObject } });
}

function parseFrameId(id:string){
  const trimmedString = id.startsWith('I') ? id.substring(1) : id;
  const parts = trimmedString.split(';');
  const firstPart = parts[0];
  return firstPart;
}

// Check if each node is TEXT or IMAGE
async function parseNodes(node: any) {
  if (Helper.isTextNode(node) && Helper.isVisibleNode(node)) {
    const parentFrame = getParentFrame(node);
    if (parentFrame) {
      let parentId = parseFrameId(parentFrame.id);
      let frameData = frameToNodes.get(parentId) || { parentFrameName: '', textNodes: [], imageNodes: [], article: null };
      frameData.textNodes.push([node.name, node.id]);
      frameData.parentFrameName = parentFrame.name;
      frameToNodes.set(parentId, frameData);
    } else {
      textNodes.push([node.name, node.id]);
    }
  } else if (node?.fills?.[0]?.type === "IMAGE" && Helper.isVisibleNode(node)) {
    const parentFrame = getParentFrame(node);
    if (parentFrame) {
      let parentId = parseFrameId(parentFrame.id);
      let frameData = frameToNodes.get(parentId) || {  parentFrameName: '', textNodes: [], imageNodes: [], article: null };
      frameData.imageNodes.push([node.name, node.id]);
      frameData.parentFrameName = parentFrame.name;
      frameToNodes.set(parentId, frameData);
    } else {
      imageNodes.push([node.name, node.id]);
    }
  }
}

// Helper function to get the parent frame of a node
function getParentFrame(node: BaseNode): InstanceNode | ComponentNode | null {
  let parent = node.parent;
  while (parent) {
    // Make sure the parent is an instance
    if (parent.type === "INSTANCE" || parent.type === "COMPONENT") {
      return parent;
    }
    parent = parent.parent;
  }
  return null;
}

export async function handleSelection(nodeId: string, option: string) {
  // Determine the frame parent of the node
  const node = await figma.getNodeByIdAsync(nodeId);
  const parentFrame = getParentFrame(node);

  if (parentFrame) {
    const frameData = frameToNodes.get(parentFrame.id);
    if (frameData && !frameData.article) {
      // Fetch and store the article information for the frame
      const league = getRandomLeague();
      frameData.article = await fetchValidArticle(league);
    }
  }

  // Apply the article information or other options
  let info = parentFrame ? frameToNodes.get(parentFrame.id)?.article : null;
  if (info) {
    switch (option) {
      case "Headline":
        if (info instanceof Article) {
          replaceText(nodeId, info.promoTitle);
        }
        break;
      case "Duration":
        replaceText(nodeId, getRandomDuration());
        break;
      case "Timestamp":
        replaceText(nodeId, getRandomHoursAgo());
        break;
      case "Author":
        if (info instanceof Article) {
          replaceText(nodeId, info.author);
        }
        break;
      case "Team":
        if (info instanceof Article) {
          replaceText(nodeId, info.team);
        }
        break;
      case "Player":
        if (info instanceof Article) {
          replaceText(nodeId, info.team);
        }
        break;
      case "League":
        replaceText(nodeId, getRandomLeague());
        break;
      case "Thumbnail":
        if (info instanceof Article) {
          replaceImg(nodeId, info.url);
        }
        break;
      case 'Test':
        await fetchLeague('NFL', 'article');
    }
  }
}

async function replaceText(nodeId: string, replaceText: string) {
  let node = await figma.getNodeByIdAsync(nodeId);
  await Utilities.loadFontsAsync([node as TextNode]);
  if (node?.type === "TEXT") {
    node.characters = replaceText; // Replace text with selected option
  }
}

async function replaceImg(nodeId: string, url: string) {
    const node = await figma.getNodeByIdAsync(nodeId);

    // Check if node exists and has a type that supports fills
    if (node && (node.type === 'INSTANCE' || node.type === 'RECTANGLE' || node.type === 'FRAME' || node.type === 'ELLIPSE' || node.type === 'STAR' || node.type === 'VECTOR')) {
        try {
            // Create an image from the URL
            const image = await figma.createImageAsync(url);
            console.log(image);

            // Cast node to a type that supports fills
            const fillableNode = node as (InstanceNode | RectangleNode | FrameNode | EllipseNode | StarNode | VectorNode);

            // Update the fills property
            fillableNode.fills = [
                {
                    type: 'IMAGE',
                    imageHash: image.hash,
                    scaleMode: 'FILL',
                },
            ];
        } catch (error) {
            console.error('Error creating image:', error);
        }
    } else {
        console.error('Node type does not support fills or node is null.');
    }
}


// Returns a random league
function getRandomLeague() {
  const leagues = ["NFL", "PGA", "MLB", "NBA", "WNBA", "MLS"];
  const randomIndex = Math.floor(Math.random() * leagues.length);
  return leagues[randomIndex];
}



async function fetchLeague(league: string, option: string) {
  const seasonType = "regular";

  const url = `https://sdf-api.cbssports.cloud/primpy/highlander/teams/league/${league}?seasonType=${seasonType}&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Extract team IDs
    const teamIds = data.data.map((team: { teamId: number }) => team.teamId);

    // console.log(teamIds);
    const randomTeamId = teamIds[Math.floor(Math.random() * teamIds.length)];

    // console.log('Random Team ID:', randomTeamId);
    return await fetchTeams(randomTeamId, option);

    // return teamIds;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchTeams(teamId: string, option: string) {
  const url = `https://sdf-api.cbssports.cloud/primpy/highlander/team/${teamId}?resources=players&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log(data);
    // Extract team IDs
    const teamNickname = data.data["nickName"];

    const playerIds = data.data["players"].map(
      (player: { playerId: number }) => player.playerId
    );

    const randomPlayerId =
      playerIds[Math.floor(Math.random() * playerIds.length)];

    console.log("Random Player ID:", randomPlayerId);

    if (option === "player") {
      return await fetchPlayer(randomPlayerId, teamNickname);
    } else {
      return await fetchArticle(teamId, teamNickname, getRandomLeague());
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchPlayer(playerIds: string, teamNickname: string) {
  const url = `https://sdf-api.cbssports.cloud/primpy/highlander/player/?playerIds=${playerIds}&resources=metaData&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    const firstName = data.data[0].firstName;
    const lastName = data.data[0].lastName;
    const player = new Player(firstName, lastName, teamNickname);
    return player;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchArticle(
  teamIds: string,
  teamName: string,
  league: string
): Promise<Article | null> {
  const url = `https://sdf-api.cbssports.cloud/primpy/highlander/team/news?teamIds=${teamIds}&access_token=${accessToken}`;
  console.log(league);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.data.length === 0) {
      return null; // No articles found
    }
    console.log(data);

    const promoTitle = data.data[0].promoTitle;
    const author = data.data[0].author["name"];
    const timestamp = getRandomHoursAgo();
    const thumbnailURL = data.data[0].promoImage["path"];
    const duration = getRandomDuration();

    const articleInfo = new Article(
      promoTitle,
      thumbnailURL,
      author,
      timestamp,
      duration,
      teamName
    );
    return articleInfo;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function getRandomHoursAgo() {
  // Generate a random number of hours between 1 and 24
  const randomHours = Math.floor(Math.random() * 24) + 1;

  // Format the output as "X hrs ago"
  return `${randomHours}h ago`;
}

function getRandomDuration() {
  const hours = Math.floor(Math.random() * 24); // Generates a random number between 0 and 23
  const minutes = Math.floor(Math.random() * 60); // Generates a random number between 0 and 59

  // Format the hours and minutes to ensure two digits
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}


async function fetchValidArticle(league: string): Promise<Article | null> {
    const seasonType = "regular";
    const url = `https://sdf-api.cbssports.cloud/primpy/highlander/teams/league/${league}?seasonType=${seasonType}&access_token=${accessToken}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      const teamIds = data.data.map((team: { teamId: number }) => team.teamId);
      console.log(teamIds);

      // Shuffle the teamIds array to randomize the order
      for (let i = teamIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [teamIds[i], teamIds[j]] = [teamIds[j], teamIds[i]];
      }
  
      for (const teamId of teamIds) {
        const article = await fetchArticle(teamId, teamId,league);
        if (article !== null) {
          return article;
        }
      }
  
      console.log("No articles found for any team in the league.");
      return null;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }