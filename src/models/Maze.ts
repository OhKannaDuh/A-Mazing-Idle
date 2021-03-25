import { Tile, TileVector } from "managers/MazeManager";
import { DIRECTIONS_ARR, getMazeDirectionIndexFromTileVector, getTileFromTileKey, MazeDirectionIndex, MazeGridType, MazeWallTypes } from "managers/MazeUtils";
import { MazeCell } from "models/MazeCell";
import { MazeGrid } from "models/MazeGrid";
import { PlusSignMazeGrid } from "mazeGrid/PlusSignMazeGrid";
import { RectangleMazeGrid } from "mazeGrid/RectangleMazeGrid";
import { DiamondMazeGrid } from "mazeGrid/DiamondMazeGrid";
import { SquareMazeGrid } from "mazeGrid/SquareMazeGrid";

export class Maze {
  public grid: MazeGrid;

  constructor(mazeSizeX: number, mazeGridType: MazeGridType) {
    // TODO: inject type of grid here
    this.generateGrid(mazeSizeX, mazeGridType);
  }

  public generateMaze(): void {
    // Reset visited array
    this.grid.resetVisitedTiles();
  }
  
  public generateGrid(mazeSizeX: number, mazeGridType: MazeGridType): void {
    if (mazeGridType === MazeGridType.SQUARE) {
      this.grid = new SquareMazeGrid(mazeSizeX);
    } else if (mazeGridType === MazeGridType.PLUS_SIGN) {
      this.grid = new PlusSignMazeGrid(mazeSizeX);
    } else if (mazeGridType === MazeGridType.RECTANGLE) {
      this.grid = new RectangleMazeGrid(mazeSizeX);
    } else if (mazeGridType === MazeGridType.DIAMOND) {
      this.grid = new DiamondMazeGrid(mazeSizeX);
    } else {
      throw `You didn't make this yet! ${mazeGridType}`;
    }
  }

  public getCell(tile: Tile): MazeCell {
    return this.grid.getCell(tile)
  }

  public getCellByTileKey(tileKey: string): MazeCell {
    return this.getCell(getTileFromTileKey(tileKey));
  }

  public getCellWallType(tile: Tile, wallDirectionIndex: MazeDirectionIndex): MazeWallTypes {
    return this.grid.getCell(tile, true).walls[wallDirectionIndex];
  }

  public getNeighbors(cell: MazeCell): MazeCell[] {
    const neighborsArr: MazeCell[] = [];
    
    for (let dir of DIRECTIONS_ARR) {
      let neighbor = this.grid.getCell({ x: cell.x + dir.x, y: cell.y + dir.y });
      if (neighbor) {
        neighborsArr.push(neighbor);
      }
    }
    return neighborsArr;
  }

  //TODO: util fxn maybe?
  public removeWallByDirIndex(mazeCell: MazeCell, directionIndex: MazeDirectionIndex): void {
    mazeCell.setWallTypeAtIndex(directionIndex, MazeWallTypes.NO_WALL);
  }

  public removeWallByTileVector(mazeCell: MazeCell, tileVector: TileVector): void {
    const directionIndex = getMazeDirectionIndexFromTileVector(tileVector);
    
    this.removeWallByDirIndex(mazeCell, directionIndex);
  }
}
