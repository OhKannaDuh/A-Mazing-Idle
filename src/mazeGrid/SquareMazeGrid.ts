import { MazeGridType } from "managers/MazeUtils";
import { MazeGrid } from "models/MazeGrid";


export class SquareMazeGrid extends MazeGrid {
  constructor(mazeSizeX: number, mazeSizeY: number) {
    super(mazeSizeX, mazeSizeY, MazeGridType.RECTANGLE);
  }
}
