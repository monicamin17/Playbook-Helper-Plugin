//@collapse
import * as Utilities from "@create-figma-plugin/utilities";
import * as Helper from "@figma-plugin/helpers";
const frameToNodes: Map<
  string,
  {
    parentFrameName: string;
    textNodes: [string, string][];
    imageNodes: [string, string][];
    news: News;
    player: Player;
  }
> = new Map();
// <frameId, {[nodes.name, node.id], [nodes.name, node.id], News, Player}

export let textNodes: [string, string][] = [];
export let imageNodes: [string, string][] = [];

/* Token to access data endpoints for the Primpy API */
const accessToken = "50faf2503afd19c54d1173aa12b818aaa6732cbf";

class Player {
  firstName: string;
  lastName: string;
  headshotUrl: string;
  team: string;

  constructor(firstName: string, lastName: string, headshotUrl: string, team: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.headshotUrl = headshotUrl;
    this.team = team;
  }
}

class News {
  promoTitle: string;
  imgUrl: string;
  author: string;
  timeStamp: string;
  duration: string;
  arena: string;

  constructor(
    title: string,
    imgUrl: string,
    author: string,
    timeStamp: string,
    duration: string,
    arena: string
  ) {
    this.promoTitle = title;
    this.imgUrl = imgUrl;
    this.author = author;
    this.timeStamp = timeStamp;
    this.duration = duration;
    this.arena = arena;
  }
}
// Scan through all selected nodes
export async function start() {
  // refresh data
  frameToNodes.clear();
  textNodes = [];
  imageNodes = [];

  // Go through each node
  for (const node of figma.currentPage.selection) {
    await Utilities.traverseNodeAsync(node, parseNodes);
  }

  // If you have frame sections, turn it into an object
  const framesObject = Object.fromEntries(frameToNodes);

  // Return data to UI
  figma.ui.postMessage({
    type: "results",
    data: { text: textNodes, image: imageNodes, frames: framesObject },
  });
}

// Check if each node is TEXT or IMAGE
async function parseNodes(node: any) {
  if (!Helper.isVisibleNode(node)) return;
  if(node.locked) return;

  const parentFrame = getParentFrame(node);
  let parentId: string | undefined;
  let frameData: {
    parentFrameName: string;
    textNodes: [string, string][];
    imageNodes: [string, string][];
    news: News;
    player: Player;
  };

  // Process parent frame data if it exists
  if (parentFrame) {
    parentId = parseFrameId(parentFrame.id);
    frameData = frameToNodes.get(parentId) || {
      parentFrameName: "",
      textNodes: [],
      imageNodes: [], // Initialize imageNodes as an empty array
      news: null,
      player: null,
    };
    frameData.parentFrameName = parentFrame.name;
  }

  // Process text nodes
  if (Helper.isTextNode(node)) {
    if (frameData) {
      // Will not find nodes that are part of the $spacing parts components
      if(!frameData.parentFrameName.includes('$spacing-')){
      frameData.textNodes.push([node.name, node.id]);
      frameToNodes.set(parentId!, frameData);
      }
    } else {
      textNodes.push([node.name, node.id]);
    }
  }
  // Process image nodes
  else if (node?.fills?.[0]?.type === "IMAGE") {
    if (frameData) {
      frameData.imageNodes.push([node.name, node.id]);
      frameToNodes.set(parentId!, frameData);
    } else {
      imageNodes.push([node.name, node.id]);
    }
  }
}

 // Helper function to get the frame ID
 function parseFrameId(id: string) {
  const trimmedString = id.startsWith("I") ? id.substring(1) : id;
  const parts = trimmedString.split(";");
  const firstPart = parts[0];
  return firstPart;
}

// Helper function to get the parent frame of a node
function getParentFrame(node: BaseNode): InstanceNode | ComponentNode | BaseNode | null {
  let parent = node.parent;
  let topmostFrame: FrameNode | null = null;

  while (parent) {
    // Make sure the parent is an instance
    if (parent.type === "INSTANCE" || parent.type === "COMPONENT") {
      return parent;
    }
    else if(parent.type === 'FRAME'){
      topmostFrame = parent;
    }
    else if(parent.type ==='PAGE'){
      return topmostFrame;
    }
    parent = parent.parent;
  }
  return null;
}

// Apply user's changes after they submit
export async function handleSelection(nodeId: string, option: string) {

  // Only call these functions when required
  let getPlayerInfo = option === 'Player' || option === 'Team' || option === 'Headshot';
  let getNewsInfo = option === 'Headline' || option === 'Author' || option === 'League' || option === 'Thumbnail';


  const node = await figma.getNodeByIdAsync(nodeId);
  const parentFrame = getParentFrame(node);
  
  const league = getRandomLeague();
  let news;
  let player;

  
  if (parentFrame) {
    const frameData = frameToNodes.get(parseFrameId(parentFrame.id));
    if (frameData) {
      if (!frameData.news && getNewsInfo) {
        frameData.news = await getArenaNews(league);
      }
      if (!frameData.player && getPlayerInfo) {
        frameData.player = await getPlayer(league);
      }
      news = frameData.news;
      player = frameData.player;
    }
  } else {
    if(getNewsInfo) news = await getArenaNews(league);
    if(getPlayerInfo) player = await getPlayer(league);
  }

  if (!news && getNewsInfo) {
    console.error('Failed to retrieve news information');
    news = await getArenaNews(league);
  }
  if(!player && getPlayerInfo){
    console.error('Failed to retrieve player information');
    player = await getPlayer(league);
  }

  switch (option) {
    case "Headline":
      replaceText(node.id, news.promoTitle);
      break;
    case "Duration":
      let duration = getRandomDuration();
      replaceText(node.id, duration);
      break;
    case "Timestamp":
      let timestamp = getTimeStamp();
      replaceText(node.id, timestamp);
      break;
    case "Author":
      replaceText(node.id, news.author);
      break;
    case "Player":
      replaceText(node.id, player.firstName + " " + player.lastName);
      break;
    case "Team":
      replaceText(node.id, player.team);
      break;
    case "League":
      replaceText(node.id, news.arena);
      break;
    case "Thumbnail":
      replaceImg(node.id, news.imgUrl);
      break;
    case "Headshot":
      replaceImg(node.id, player.headshotUrl);
      break;
  }
  
}

function getValidArticle(data: any): any {
  const num_articles = data.data.length;
  let articleObject;
  let imgSrc = null;
  let attempts = 0;
  const maxAttempts = num_articles * 2; // or any other reasonable number

  do {
    if (attempts >= maxAttempts) {
      console.warn(
        "No article found with valid imgSrc after",
        maxAttempts,
        "attempts"
      );
      return null; // or handle this case as appropriate for your application
    }
    const randomIndex = Math.floor(Math.random() * num_articles);
    articleObject = data.data[randomIndex];
    imgSrc = articleObject.promoImage.path;
    attempts++;
  } while (imgSrc === null || imgSrc === undefined);

  return articleObject;
}

async function getArenaNews(arenaName: string) {
  const url = `https://sdf-api.cbssports.cloud/primpy/highlander/arena/news/${arenaName}?access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const articleObject = getValidArticle(data);


    // Extract article information
    let promoTitle = articleObject.promoTitle;
    let author = articleObject.author.name;
    let imgSrc = articleObject.promoImage.path;
    let primaryTopic = articleObject.primaryTopic;
    let timeStamp = getTimeStamp();
    let duration = getRandomDuration();
    let currentArticle = new News(
      promoTitle,
      imgSrc,
      author,
      timeStamp,
      duration,
      primaryTopic
    );

    return currentArticle;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getTimeStamp() {
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

// Returns a random league
function getRandomLeague() {
  const leagues = ["NFL", "MLB", "NBA", "WNBA"];
  const randomIndex = Math.floor(Math.random() * leagues.length);
  return leagues[randomIndex];
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
  if (
    node &&
    (node.type === "INSTANCE" ||
      node.type === "RECTANGLE" ||
      node.type === "FRAME" ||
      node.type === "ELLIPSE" ||
      node.type === "STAR" ||
      node.type === "VECTOR")
  ) {
    try {
      // Create an image from the URL
      const image = await figma.createImageAsync(url);

      // Cast node to a type that supports fills
      const fillableNode = node as
        | InstanceNode
        | RectangleNode
        | FrameNode
        | EllipseNode
        | StarNode
        | VectorNode;

      // Update the fills property
      fillableNode.fills = [
        {
          type: "IMAGE",
          imageHash: image.hash,
          scaleMode: "FILL",
        },
      ];
    } catch (error) {
      console.error("Error creating image:", error);
    }
  } else {
    console.error("Node type does not support fills or node is null.");
  }
}

  async function getPlayer(league: string): Promise<Player> {
    while (league === "WNBA") league = getRandomLeague();
    const url = `https://sdf-api.cbssports.cloud/primpy/highlander/roster/league/${league}?rosterStatus=ACT&assocType=C&seasonType=regular&seasonYear=2024&access_token=${accessToken}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (!data.data || data.data.length === 0) {
        throw new Error("No player data available");
      }
  
      let num_players = data.data.length;
      const randomIndex = Math.floor(Math.random() * num_players);
      const playerObject = data.data[randomIndex];
  
      if (!playerObject || !playerObject.firstName || !playerObject.lastName) {
        throw new Error("Invalid player data structure");
      }
  
      // Extract player information
      let firstName = playerObject.firstName;
      let lastName = playerObject.lastName;
      let team = await getTeam(playerObject.playerTeamAssociations[0].teamId);
      let headshotUrl = await getHeadshot(playerObject.playerId);

      let currentPlayer = new Player(firstName, lastName, headshotUrl, team);

      return currentPlayer;
    } catch (error) {
      console.error("Error fetching player data:", error);
      // Return a default Player object or rethrow the error
      return new Player("Unknown", "Player", "", "Unknown Team");

    }
  }

// Returns a team name given team id
async function getTeam(teamId: string) {
  const url = `https://sdf-api.cbssports.cloud/primpy/highlander/team/${teamId}?access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data.data.location + " " + data.data.nickName;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Returns a headshot url given player id
async function getHeadshot(playerId: string): Promise<string> {

  const url = `https://sportshubqa.cbsistatic.com/i/sports/player/headshot/${playerId}.png`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Return the URL if the fetch was successful
    return url;
  } catch (error) {
    console.error("Error fetching headshot:", error);
    // Return a default image URL or empty string in case of error
    return '';
  }
}

