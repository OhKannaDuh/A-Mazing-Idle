import Game from "managers/Game";
import { DIRECTION_RIGHT, getMazeDirectionIndexFromTileVector, getNewTilePositionByVector, GridLocation, MazeGridType, MazeWallTypes } from "managers/MazeUtils";
import { MazeCell } from "models/MazeCell";
import { MazeGrid } from "models/MazeGrid";



export class PlusSignMazeGrid extends MazeGrid {
  constructor(game: Game, mazeSizeX: number) {
    const bufferX = Math.ceil(mazeSizeX / 3);
    const bufferY = Math.ceil(mazeSizeX / 3);
    super(game, mazeSizeX + bufferX, mazeSizeX + bufferY, MazeGridType.PLUS_SIGN);
  }

  public generateMazeGrid(): void {
    // Generate a normal grid and then mark cells dead
    super.generateMazeGrid();

    const xRange = this.getXRange();
    const yRange = this.getYRange();

    // Top left
    this.markCellRangeCornerDead(0, xRange, 0, yRange);
    // Bottom Left
    this.markCellRangeCornerDead(0, xRange, this.sizeY - yRange, this.sizeY)
    // Top Right
    this.markCellRangeCornerDead(this.sizeX - xRange, this.sizeX, 0, yRange);
    // Bottom Right
    this.markCellRangeCornerDead(this.sizeX - xRange, this.sizeX, this.sizeY - yRange, this.sizeY);
  }

  private getXRange(): number {
    return Math.ceil(this.sizeX / 3);
  }
  
  private getYRange(): number {
    return Math.ceil(this.sizeY / 3);
  }

  private markCellRangeCornerDead(xStart: number, xEnd: number, yStart: number, yEnd: number): void {
    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        this.setDeadCell({ x: x, y: y});
      }
    }
  }
  
  // protected setStartAndEndTile(): void {
  //   // Bottom of the left/right side of plus sign
  //   const middleXOffset = this.getXRange() - 1;
  //   const middleYOffset = this.getYRange() - 1;
  //   this.internalStartTile = { x: 0, y: this.getXRange() + middleXOffset };

  //   this.internalExitTile = { x: this.sizeX - 1, y: this.getYRange() + middleYOffset };
    
  //   this.exitDirectionVector = DIRECTION_RIGHT;
  //   this.externalExitTile = getNewTilePositionByVector(this.internalExitTile, this.exitDirectionVector);
  //   this.getCell(this.internalExitTile).setWallTypeAtIndex(getMazeDirectionIndexFromTileVector(DIRECTION_RIGHT), MazeWallTypes.NO_WALL);
  // }

  protected getValidStartLocations(): GridLocation[] {
    return [
      GridLocation.MIDDLE_LEFT,
      GridLocation.TOP_MIDDLE,
      GridLocation.BOTTOM_MIDDLE,
      GridLocation.MIDDLE_RIGHT
    ];
  }

  protected getValidExitLocations(): GridLocation[] {
    return [
      GridLocation.MIDDLE_RIGHT,
      GridLocation.TOP_MIDDLE,
      GridLocation.BOTTOM_MIDDLE,
      GridLocation.MIDDLE_LEFT
    ];
  }
}