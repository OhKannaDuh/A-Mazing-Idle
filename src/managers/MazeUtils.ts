import Game from "managers/Game";
import { Array2D, MazeGridArray, Tile, TileVector } from "managers/MazeManager";
import { Maze } from "models/Maze";
import { MazeCell } from "models/MazeCell";


export const DEFAULT_TILE_WIDTH_CSS = '20px';

export enum MazeGridType {
  SQUARE = "SQUARE",
  RECTANGLE = "RECTANGLE",
  PLUS_SIGN = "PLUS_SIGN",
  DIAMOND = "DIAMOND"
}

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
  OUT_OF_BOUNDS_WALL = 3,
}

export const DIRECTION_UP: TileVector = {x: 0, y: -1};
export const DIRECTION_DOWN: TileVector = {x: 0, y: 1};
export const DIRECTION_LEFT: TileVector = {x: -1, y: 0};
export const DIRECTION_RIGHT: TileVector = {x: 1, y: 0};

export const DIRECTIONS_ARR: TileVector[] = [DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT];
export const STARTING_POSITION = {x: 0, y: 0};

export const DEFAULT_MAZE_SIZE = 4;


export const getTileVectorFromMazeDirectionIndex = (mazeDirIndex: MazeDirectionIndex): TileVector => {
  if (mazeDirIndex === MazeDirectionIndex.UP) {
    return DIRECTION_UP;
  } else if (mazeDirIndex === MazeDirectionIndex.DOWN) {
    return DIRECTION_DOWN;
  } if (mazeDirIndex === MazeDirectionIndex.LEFT) {
    return DIRECTION_LEFT;
  } if (mazeDirIndex === MazeDirectionIndex.RIGHT) {
    return DIRECTION_RIGHT;
  } 
  return null;
}

export const getMazeDirectionIndexFromTileVector = (tileVector: TileVector): MazeDirectionIndex => {
  if (isTileEqual(tileVector, DIRECTION_UP)) {
    return MazeDirectionIndex.UP;
  } else if (isTileEqual(tileVector, DIRECTION_DOWN)) {
    return MazeDirectionIndex.DOWN;
  } if (isTileEqual(tileVector, DIRECTION_LEFT)) {
    return MazeDirectionIndex.LEFT;
  } if (isTileEqual(tileVector, DIRECTION_RIGHT)) {
    return MazeDirectionIndex.RIGHT;
  }
  console.error("Invalid tile vector being converted to direction index.");
  return null;
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

export const getInverseTileVector = (tileVector: TileVector) => {
  return { x: -tileVector.x, y: -tileVector.y };
}

export const getRandomMazeTile = (game: Game): Tile => {
  const cellList: MazeCell[] = game.maze.getGrid().getAllCells();
  const randomIndex = getRandomInteger(0, cellList.length-1);
  return cellList[randomIndex].getTile();
}

export const getRandomInteger = (min: number, max: number): number => {  
  if (min === max) return max;
  return Math.floor(Math.random() * (max - min + 1) + min);
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

export const getTileFromTileKey = (tileKey: string): Tile => {
  const keys = tileKey.split('-');
  return { x: parseInt(keys[0]), y: parseInt(keys[1]) };
}

export const getCellNeighborTileVector = (startCell: MazeCell, endCell: MazeCell): TileVector => {
  // Assumption: these are actually neighboring cells
  const cellDiff = { x: endCell.x - startCell.x, y: endCell.y - startCell.y };
  return cellDiff;
}

export const getCellNeighborDirectionIndex = (startCell: MazeCell, endCell: MazeCell): MazeDirectionIndex => {
  const tileVector = getCellNeighborTileVector(startCell, endCell);
  return getMazeDirectionIndexFromTileVector(tileVector);
}

export const generateMazeArr = <T>(x: number, y: number, defaultValue: T): Array<Array<T>> => {
  const mazeArr = new Array<Array<T>>();
  for (let i = 0; i < y; i++) {
    mazeArr[i] = new Array<T>();
    for (let j = 0; j < x; j++) {
        mazeArr[i][j] = defaultValue;
    }
  }
  return mazeArr;
}

// Generates a maze with a number in each position representing the distance from exit using optimal pathing.
export const generateMazeSmartPathingArr = (game: Game, maze: Maze): Array2D<number> => {
  const smartPathArr: Array2D<number> = generateMazeArr(maze.grid.sizeX, maze.grid.sizeY, 0);
  //TODO: figure out how to handle exit tile better
  const lastTile = maze.grid.internalExitTile;
  
  
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
