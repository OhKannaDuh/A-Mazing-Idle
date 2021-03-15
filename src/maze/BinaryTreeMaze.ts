import { TileVector } from "managers/MazeManager";
import { DIRECTION_LEFT, DIRECTION_UP, getInverseTileVector, getNewTilePositionByVector, getRandomMazeTile, MazeDirectionIndex, MazeWallTypes, randomNumber } from "managers/MazeUtils";
import { Maze } from "models/Maze";
import { MazeCell } from "models/MazeCell";


export class BinaryTreeMaze extends Maze {
  public sizeX: number;
  public sizeY: number;

  constructor(mazeSize: number) {
    super(mazeSize);
    this.generateMaze();
    
    // Reset visited array
    this.generateVisitedArray();
  }

  public generateMaze(): void {
    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0;  x < this.sizeX; x++) {
        const validDirs = this.getValidDirs(x, y);
        if (validDirs.length === 0) {
          continue;
        }
        // Choose random direction and determine it's inverse
        const randomIndex = randomNumber(0, validDirs.length-1);
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
    if (y === 0 && x === 0) {
      return [];
    } else if (x === 0) {
      return [DIRECTION_UP];
    } else if (y === 0) {
      return [DIRECTION_LEFT];
    }
    else {
      return [DIRECTION_LEFT, DIRECTION_UP];
    }
  }
}
