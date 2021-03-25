import { GridLocation, MazeGridType } from "managers/MazeUtils";
import { MazeGrid } from "models/MazeGrid";


export class SquareMazeGrid extends MazeGrid {
  constructor(mazeSizeX: number) {
    super(mazeSizeX, mazeSizeX, MazeGridType.RECTANGLE);
  }

  protected getValidStartLocations(): GridLocation[] {
    return [
      GridLocation.BOTTOM_LEFT,
      GridLocation.BOTTOM_RIGHT,
      GridLocation.TOP_LEFT,
      GridLocation.TOP_RIGHT
    ];
  }

  protected getValidExitLocations(): GridLocation[] {
    return [
      GridLocation.BOTTOM_RIGHT,
      GridLocation.BOTTOM_LEFT,
      GridLocation.TOP_LEFT,
      GridLocation.TOP_RIGHT
    ];
  }
}
