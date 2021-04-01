import Game from "managers/Game";
import { GridLocation, MazeGridType } from "managers/MazeUtils";
import { MazeGrid } from "models/MazeGrid";

const LENGTH_TO_WIDTH_RATIO: number = 1.5;

export class RectangleMazeGrid extends MazeGrid {
  constructor(game: Game, mazeSizeX: number) {
    // Use really crazy math.  And it works.  Don't question it.
    const shortSide = Math.ceil(mazeSizeX / LENGTH_TO_WIDTH_RATIO);
    const longSide = Math.floor(Math.pow(mazeSizeX, 2) / shortSide);
    
    super(game, longSide, shortSide, MazeGridType.RECTANGLE);
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
  
  protected getDefaultStartingLocation(): GridLocation {
    return GridLocation.TOP_LEFT;
  }

  protected getDefaultExitLocation(): GridLocation {
    return GridLocation.BOTTOM_RIGHT;
  }
}
