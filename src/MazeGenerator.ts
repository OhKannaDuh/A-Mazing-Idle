import Game from "./Game";
import { MazeItemKey } from "./items/ItemConstants";
import { DIRECTIONS_ARR, MazeArray, Tile, TileVector } from "./Maze";
import { UpgradeKey } from "./upgrades/UpgradeConstants";


export const PLAYER_COLOR = '#1ec438';
export const RNG_BOT_COLOR = '#000000';
export const EMPTY_COLOR = '#FFFFFF';
export const DEAD_END_COLOR = '#F13241';
export const SMART_PATHING_PLAYER_COLOR = '#dbaed8';

export const DEFAULT_TILE_WIDTH_CSS = '20px';


export enum MazeDirectionIndex {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3
}

export enum MazeWallTypes {
  WALL = 0,
  NO_WALL = 1,
  DESTRUCTIBLE_WALL = 2,
}

export const getInverseDirectionIndex = (mazeDirIndex: MazeDirectionIndex): MazeDirectionIndex => {
  if (mazeDirIndex === MazeDirectionIndex.UP) {
    return MazeDirectionIndex.DOWN;
  } else if (mazeDirIndex === MazeDirectionIndex.DOWN) {
    return MazeDirectionIndex.UP;
  } else if (mazeDirIndex === MazeDirectionIndex.LEFT) {
    return MazeDirectionIndex.RIGHT;
  } else if (mazeDirIndex === MazeDirectionIndex.RIGHT) {
    return MazeDirectionIndex.LEFT;
  }
  return null;
}


export const getNewTilePositionByVector = (tile: Tile, vector: TileVector): Tile => {
  return { x: tile.x + vector.x, y: tile.y + vector.y };
}

export const isTileEqual = (tile1: Tile, tile2: Tile): boolean => {
  return tile1.x === tile2.x && tile1.y === tile2.y;
}

export const generateTileKey = (x: number, y: number): string => {
  return `${x}-${y}`;
}

export const generateNewMaze = (game: Game, x: number, y: number): MazeArray => {
  
  // Establish variables and starting grid
  let totalCells = x * y;
  let cells: MazeArray = new Array();
  let unvis = new Array();
  for (let i = 0; i < y; i++) {
    cells[i] = new Array();
    unvis[i] = new Array();
    for (let j = 0; j < x; j++) {
      cells[i][j] = [0, 0, 0, 0];
      unvis[i][j] = true;
    }
  }
  
  // Set a random position to start from
  let currentCell = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)];
  let path = [currentCell];
  unvis[currentCell[0]][currentCell[1]] = false;
  var visited = 1;
  
  // Loop through all available cell positions
  while (visited < totalCells) {
    // Determine neighboring cells
    var pot = [[currentCell[0]-1, currentCell[1], 0, 2],
      [currentCell[0], currentCell[1] + 1, 1, 3],
      [currentCell[0] + 1, currentCell[1], 2, 0],
      [currentCell[0], currentCell[1] - 1, 3, 1]];
    var neighbors = new Array();
    
    // Determine if each neighboring cell is in game grid, and whether it has already been checked
    for (var l = 0; l < 4; l++) {
      if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { 
        neighbors.push(pot[l]); 
      }
    }
    
    // If at least one active neighboring cell has been found
    if (neighbors.length) {
      // Choose one of the neighbors at random
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      // Remove the wall between the current cell and the chosen neighboring cell
      
      const destructibleWallSpawnProbability = game.points.getDestructibleWallSpawnProbability();
      const wallType = Math.random() < destructibleWallSpawnProbability ? MazeWallTypes.DESTRUCTIBLE_WALL : MazeWallTypes.NO_WALL;
      
      cells[currentCell[0]][currentCell[1]][next[2]] = wallType;
      cells[next[0]][next[1]][next[3]] = wallType;
      
      // Mark the neighbor as visited, and set it as the current cell
      unvis[next[0]][next[1]] = false;
      visited++;
      currentCell = [next[0], next[1]];
      path.push(currentCell);
    }
    // Otherwise go back up a step and keep going
    else {
      currentCell = path.pop();
    }
  }

  // Set entrance/exit
  cells[x-1][y-1][MazeDirectionIndex.RIGHT] = MazeWallTypes.NO_WALL;

  return cells;
}

export const generateMazeArr = (x: number, y: number, defaultValue: any): Array<Array<any>> => {
  const mazeArr = new Array<Array<any>>();
  for (let i = 0; i < y; i++) {
    mazeArr[i] = new Array<number>();
    for (let j = 0; j < x; j++) {
        mazeArr[i][j] = defaultValue;
    }
  }
  return mazeArr;
}

// Generates a maze with a number in each position representing the distance from exit using optimal pathing.
export const generateMazeSmartPathingArr = (game: Game, maze: MazeArray, exitTile: Tile): Array<Array<number>> => {
  const smartPathArr: Array<Array<number>> = generateMazeArr(maze[0].length, maze.length, 0);
  //TODO: figure out how to handle exit tile better
  const lastTile = { x: exitTile.x - 1, y: exitTile.y };
  // Mark first tile visited first -- canMove() cannot handle starting outside of the maze (ie. exit point).
  smartPathArr[lastTile.y][lastTile.x] = 1;

  const tileQueue = [lastTile];
  let stepCount = 2;
  // BFS iteration
  while(tileQueue.length > 0) {
    const loopSize = tileQueue.length;
    
    // One step in all directions for each tile
    for (let i = 0; i < loopSize; i++) {
      const tile = tileQueue.shift();

      for (let dir of DIRECTIONS_ARR) {
        // Only test valid directions (ie. non-wall, etc.)
        //TODO: this needs to handle destructible walls
        if (game.maze.canMove(tile, dir, true)) {
          const newTile = getNewTilePositionByVector(tile, dir);
          // Don't revisit tiles
          if (smartPathArr[newTile.y][newTile.x] === 0) {
            smartPathArr[newTile.y][newTile.x] = stepCount;
            tileQueue.push(newTile);
          }
        }
      }
    }
    stepCount++;
  }

  return smartPathArr;
}
