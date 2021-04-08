import { Tile, TileVector } from "managers/MazeManager";
import { 
  DIRECTIONS_ARR, 
  getCellNeighborTileVector, 
  getInverseDirectionIndex, 
  getMazeDirectionIndexFromTileVector, 
  getTileFromTileKey, 
  MazeAlgorithmType, 
  MazeDirectionIndex, 
  MazeGridType, 
  MazeWallTypes 
} from "managers/MazeUtils";
import { MazeCell } from "models/MazeCell";
import { MazeGrid } from "models/MazeGrid";
import { PlusSignMazeGrid } from "mazeGrid/PlusSignMazeGrid";
import { RectangleMazeGrid } from "mazeGrid/RectangleMazeGrid";
import { DiamondMazeGrid } from "mazeGrid/DiamondMazeGrid";
import { SquareMazeGrid } from "mazeGrid/SquareMazeGrid";
import Game from "managers/Game";
import { DestructibleWallUpgrade } from "upgrades/definitions/maze/DestructibleWallUpgrade";

export class Maze {
  public grid: MazeGrid;
  protected game: Game;
  public mazeAlgorithmType: MazeAlgorithmType;

  constructor(game: Game, mazeSizeX: number, mazeGridType: MazeGridType, mazeAlgorithmType: MazeAlgorithmType) {
    this.game = game;
    this.mazeAlgorithmType = mazeAlgorithmType;
    this.generateGrid(mazeSizeX, mazeGridType);
  }

  public generateMaze(): void {
    // Reset visited array
    this.grid.resetVisitedTiles();
  }
  
  public generateGrid(mazeSizeX: number, mazeGridType: MazeGridType): void {
    if (mazeGridType === MazeGridType.SQUARE) {
      this.grid = new SquareMazeGrid(this.game, mazeSizeX);
    } else if (mazeGridType === MazeGridType.PLUS_SIGN) {
      this.grid = new PlusSignMazeGrid(this.game, mazeSizeX);
    } else if (mazeGridType === MazeGridType.RECTANGLE) {
      this.grid = new RectangleMazeGrid(this.game, mazeSizeX);
    } else if (mazeGridType === MazeGridType.DIAMOND) {
      this.grid = new DiamondMazeGrid(this.game, mazeSizeX);
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
    const cell = this.grid.getCell(tile, true);
    return cell 
      ? cell.walls[wallDirectionIndex]
      : null;
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

  private removeWallByDirIndex(mazeCell: MazeCell, directionIndex: MazeDirectionIndex, wallType: MazeWallTypes = MazeWallTypes.NO_WALL): void {
    mazeCell.setWallTypeAtIndex(directionIndex, wallType);
  }

  public removeWallBetweenCells(mazeCell: MazeCell, neighborCell: MazeCell): void {
    // Calculate vector between tiles and convert it to a wall direction index
    const tileVector = getCellNeighborTileVector(mazeCell, neighborCell);
    const directionIndex = getMazeDirectionIndexFromTileVector(tileVector);
    const neighorDirectionIndex = getInverseDirectionIndex(directionIndex);

    // Determine randomly if this wall is going to be destructible
    const wallType = this.isDestructibleWall() ? MazeWallTypes.DESTRUCTIBLE_WALL : MazeWallTypes.NO_WALL;
    this.removeWallByDirIndex(mazeCell, directionIndex, wallType);
    this.removeWallByDirIndex(neighborCell, neighorDirectionIndex, wallType);
  }

  private isDestructibleWall(): boolean {
    const prob = DestructibleWallUpgrade.getDestructibleWallSpawnProbability(this.game);
    const randomNumber = Math.random();
    return prob > randomNumber;
  }
}
