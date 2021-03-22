import { MazeGridType } from "managers/MazeUtils";
import { MazeGrid } from "models/MazeGrid";

const LENGTH_TO_WIDTH_RATIO: number = 1.5;

export class RectangleMazeGrid extends MazeGrid {
  constructor(mazeSizeX: number, mazeSizeY: number) {
    // Use really crazy math.  And it works.  Don't question it.
    const shortSide = Math.ceil(mazeSizeX / LENGTH_TO_WIDTH_RATIO);
    const longSide = Math.floor(Math.pow(mazeSizeX, 2) / shortSide);
    super(longSide, shortSide, MazeGridType.RECTANGLE);
  }
}
