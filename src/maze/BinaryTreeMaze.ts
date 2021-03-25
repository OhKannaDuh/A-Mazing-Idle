import { TileVector } from "managers/MazeManager";
import { DIRECTION_LEFT, DIRECTION_UP, getInverseTileVector, getNewTilePositionByVector, getRandomInteger, MazeGridType } from "managers/MazeUtils";
import { Maze } from "models/Maze";

const VALID_DIR_ARR = [DIRECTION_LEFT, DIRECTION_UP];

export class BinaryTreeMaze extends Maze {
  
  constructor(mazeSizeX: number, mazeSizeY: number, mazeGridType: MazeGridType) {
    if (mazeGridType === MazeGridType.PLUS_SIGN) {
      throw 'Invalid grid type PLUS_SIGN for binary tree maze.'
    }
    super(mazeSizeX, mazeSizeY, mazeGridType);
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
