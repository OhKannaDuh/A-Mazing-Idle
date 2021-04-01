import Game from "managers/Game";
import { TileVector } from "managers/MazeManager";
import {getInverseTileVector, getNewTilePositionByVector, getRandomInteger, MazeAlgorithmType, MazeGridType } from "managers/MazeUtils";
import { Maze } from "models/Maze";

//TODO: why can i not import the regular one.
const DIRECTION_UP: TileVector = {x: 0, y: -1};
const DIRECTION_LEFT: TileVector = {x: -1, y: 0};
const VALID_DIR_ARR = [DIRECTION_LEFT, DIRECTION_UP];

export class BinaryTreeMaze extends Maze {
  
  constructor(game: Game, mazeSizeX: number, mazeGridType: MazeGridType) {
    if (mazeGridType === MazeGridType.PLUS_SIGN || mazeGridType === MazeGridType.DIAMOND) {
      console.error(`Invalid grid type ${mazeGridType} for binary tree maze.`);
      mazeGridType = MazeGridType.SQUARE;
    }
    super(game, mazeSizeX, mazeGridType, MazeAlgorithmType.BINARY_TREE);
    this.generateMaze();
  }

  public generateMaze(): void {
    for (let y = 0; y < this.grid.sizeY; y++) {
      for (let x = 0;  x < this.grid.sizeX; x++) {
        if (!this.grid.isValidTile({ x: x, y: y})) continue;
        const validDirs = this.getValidDirs(x, y);
        if (validDirs.length === 0) {
          continue;
        }
        // Choose random direction and determine it's inverse
        const randomIndex = getRandomInteger(0, validDirs.length-1);
        const randomTileVector = validDirs[randomIndex];
        const inverseTileVector = getInverseTileVector(randomTileVector);
        
        // Get current tile and neighbour tile
        const currentTile = { x: x, y: y };
        const newTile = getNewTilePositionByVector(currentTile, randomTileVector);
        
        // Convert to maze grid cell
        const currentCell = this.getCell(currentTile);
        const newCell = this.getCell(newTile);
        
        // Remove wall connecting neighbors
        this.removeWallByTileVector(currentCell, randomTileVector);
        this.removeWallByTileVector(newCell, inverseTileVector);
      }
    }

    super.generateMaze();
  }

  public getValidDirs(x: number, y: number): TileVector[] {
    // Biased LEFT and UP. Defend against edge case movements.

    const validDirs = [];
    for (let dir of VALID_DIR_ARR) {
      let testTile = getNewTilePositionByVector(dir, { x: x, y: y})
      if (this.grid.isValidTile(testTile)) {
        validDirs.push(dir);
      }
    }
    
    return validDirs;
  }
}
