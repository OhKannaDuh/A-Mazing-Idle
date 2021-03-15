import { Array2D, MazeGridArray, Tile, TileVector } from "managers/MazeManager";
import { DIRECTIONS_ARR, DIRECTION_RIGHT, generateMazeArr, MazeDirectionIndex, MazeWallTypes } from "managers/MazeUtils";
import { MazeCell } from "models/MazeCell";


export class Maze {
  public grid: MazeGridArray;
  public visitedGrid: Array2D<boolean>;
  public sizeX: number;
  public sizeY: number;

  //TODO: use exit tile to clear exit wall tile
  public startTile: Tile;
  public exitTile: Tile;
  public exitDirectionVector: TileVector;

  constructor(mazeSize: number) {
    this.sizeX = mazeSize;
    this.sizeY = mazeSize;
    this.setStartAndEndTile();
    this.generateMazeGrid();
    this.generateVisitedArray();
  }
  
  public isValidCell(x: number, y: number): boolean {
    return x >= 0 && x < this.sizeX 
        && y >= 0 && y < this.sizeY;
  }
  
  public isValidTile(tile: Tile): boolean {
    return this.isValidCell(tile.x, tile.y);
  }
  
  public generateMazeGrid() {
    this.grid = [];
    for (let y = 0; y < this.sizeY; y++) {
      this.grid[y] = new Array();
      for (let x = 0; x < this.sizeX; x++) {
        this.grid[y][x] = new MazeCell(x, y);
      }
    }
  }

  public generateVisitedArray() {
    this.visitedGrid = generateMazeArr(this.sizeX, this.sizeY, false);
  }
  
  public isVisited(tile: Tile): boolean {
    return this.visitedGrid[tile.y][tile.x];
  }

  public setVisited(tile: Tile): void {
    if (!this.isValidCell(tile.x, tile.y)) return;
    this.visitedGrid[tile.y][tile.x] = true;
  }
  
  public getCell(tile: Tile): MazeCell {
    if (!this.isValidCell(tile.x, tile.y)) {
      return null;
    }
    return this.grid[tile.y][tile.x];
  }

  public getCellWallType(tile: Tile, wallDirectionIndex: MazeDirectionIndex): MazeWallTypes {
    return this.getCell(tile).walls[wallDirectionIndex];
  }

  public setStartAndEndTile(): void {
    this.startTile = { x: 0, y: 0 };
    this.exitTile = { x: this.sizeX, y: this.sizeY - 1 };
    this.exitDirectionVector = DIRECTION_RIGHT;
  }

  public getNeighbors(cell: MazeCell): MazeCell[] {
    const neighborsArr: MazeCell[] = [];
    
    for (let dir of DIRECTIONS_ARR) {
      let neighbor = this.getCell({ x: cell.x + dir.x, y: cell.y + dir.y });
      if (neighbor) {
        neighborsArr.push(neighbor);
      }
    }
    return neighborsArr;
  }
}
