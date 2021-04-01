import Game from "managers/Game";
import { DIRECTION_RIGHT, getMazeDirectionIndexFromTileVector, getNewTilePositionByVector, GridLocation, MazeGridType, MazeWallTypes } from "managers/MazeUtils";
import { MazeGrid } from "models/MazeGrid";

// Odd based diamond (single edge piece on each side)
//     X
//   X X X
// X X X X X
//   X X X
//     X <-- edge middle piece

//TODO: should pull this into the class and remove pre-constructor requirements.

// Estimated length based on corresponding areas from input X
// Always use odd number since even doesn't make area calculation any closer
const getDiamondOddLength = (sizeX: number): number => {
  // Calculate an area that closely resembles (X * X) dimensions
  const closestArea = Math.sqrt(2 * sizeX * sizeX - 1);
  const flooredLength = Math.floor(closestArea);
  // Only odd lengths are allowed.
  if (isOdd(flooredLength)) {
    return flooredLength;
  }
  // If not odd, ceil will provide odd number. 
  else {
    return Math.ceil(closestArea);
  }
}

const isOdd = (num: number): boolean => {
  return (num % 2) === 1;
}


export class DiamondMazeGrid extends MazeGrid {

  constructor(game: Game, mazeSizeX: number) {
    const diamondOddLength = getDiamondOddLength(mazeSizeX);
    super(game, diamondOddLength, diamondOddLength, MazeGridType.DIAMOND);
  }

  public generateMazeGrid() {
    // Generate a normal grid and then mark cells dead
    super.generateMazeGrid();
    this.markDeadCells();
  }
  
  // Number of tiles from wall until edge middle piece
  private getSingleSideDistance(): number {
    return (this.sizeX - 1) / 2;
  }

  private markDeadCells() {
    const edgeDistance = this.getSingleSideDistance();
    // Top left edge
    for (let y = 0; y < edgeDistance; y++) {
      for (let x = 0; x < edgeDistance - y; x++) {
        this.setDeadCell({ x: x, y: y});
      }
    }
    // Bottom left edge
    for (let y = edgeDistance+1; y < this.sizeY; y++) {
      for (let x = 0; x < y - edgeDistance; x++) {
        this.setDeadCell({ x: x, y: y});
      }
    }
    // Top right edge
    for (let y = 0; y < edgeDistance; y++) {
      for (let x = y+edgeDistance+1; x < this.sizeX; x++) {
        this.setDeadCell({ x: x, y: y});
      }
    }
    // Bottom right edge
    for (let y = edgeDistance+1; y < this.sizeY; y++) {
      for (let x = this.sizeX-y+edgeDistance; x < this.sizeX; x++) {
        this.setDeadCell({ x: x, y: y});
      }
    }
  }
  
  protected getValidStartLocations(): GridLocation[] {
    return [
      GridLocation.MIDDLE_LEFT,
      GridLocation.MIDDLE_RIGHT,
      GridLocation.TOP_MIDDLE,
      GridLocation.BOTTOM_MIDDLE
    ];
  }

  protected getValidExitLocations(): GridLocation[] {
    return [
      GridLocation.MIDDLE_RIGHT,
      GridLocation.MIDDLE_LEFT,
      GridLocation.TOP_MIDDLE,
      GridLocation.BOTTOM_MIDDLE
    ];
  }

  protected getDefaultStartingLocation(): GridLocation {
    return GridLocation.MIDDLE_LEFT;
  }

  protected getDefaultExitLocation(): GridLocation {
    return GridLocation.MIDDLE_RIGHT;
  }
}
