import Game from "managers/Game";
import { getCellNeighborDirectionIndex, getCellNeighborTileVector, getInverseTileVector, getMazeDirectionIndexFromTileVector, getRandomInteger, MazeDirectionIndex, MazeGridType, MazeWallTypes } from "managers/MazeUtils";
import { Maze } from "models/Maze";
import { MazeCell } from "models/MazeCell";
import queue from "priorityjs";

type DirectionCellPair = [MazeDirectionIndex, MazeCell];


export class PrimsMaze extends Maze {
  private visitedCellSet: Set<string>;
  private nextToVisitSet: Set<string>;
  private queue: queue.PriorityQueue<DirectionCellPair>;
  private startingX: number;
  private startingY: number;

  constructor(game: Game, mazeSizeX: number, mazeGridType: MazeGridType) {
    super(game, mazeSizeX, mazeGridType);
    this.visitedCellSet = new Set<string>();
    this.nextToVisitSet = new Set<string>();
    
    // Consider making this random.
    this.startingX = this.grid.internalStartTile.x;
    this.startingY = this.grid.internalStartTile.y;
    
    this.queue = new queue.PriorityQ<DirectionCellPair>((dirCellPair1, dirCellPair2) => {
      const cell1Dir = this.mapPriorityVal(dirCellPair1);
      const cell2Dir = this.mapPriorityVal(dirCellPair2);
      return cell1Dir <= cell2Dir;
    });
    this.generateMaze();
  }

  private mapPriorityVal(dirCellPair: DirectionCellPair) {
    return Math.random();
    // const dir = dirCellPair[0];
    // const val = Math.random();
    // if (dir === MazeDirectionIndex.UP) return val*.1;
    // if (dir === MazeDirectionIndex.DOWN) return val*5;
    // if (dir === MazeDirectionIndex.RIGHT) return val*5;
    // if (dir === MazeDirectionIndex.LEFT) return val*.1;
    // return 0; 
  }

  private getDistanceFromStart(cell: MazeCell): number {
    return Math.sqrt(Math.pow(cell.x-this.startingX, 2) + Math.pow(cell.y-this.startingY, 2));
  }

  public generateMaze(): void {
    const startCell = this.getCell({ x: this.startingX, y: this.startingY });
    this.setCellVisited(startCell);
    this.addUnvisitedNeighborsToNext(startCell);
    this.prims();
  }

  private getNextCellToVisit(): MazeCell {
    const nextCell: MazeCell = this.queue.pop()[1];
    
    // Remove from to-visit list
    const nextTileKey = nextCell.getTileKey();
    this.nextToVisitSet.delete(nextTileKey);
    return this.getCellByTileKey(nextTileKey);
  }

  private prims() {
    while (this.queue.size() > 0) {
      // Choose a random unvisited cell
      let currentCell = this.getNextCellToVisit();
      if (this.isCellVisited(currentCell)) {
        return;
      }
      this.setCellVisited(currentCell);
      this.addUnvisitedNeighborsToNext(currentCell);
      

      // Get all visited neighbors
      const visitedNeighbors = this.getVisitedNeighbors(currentCell);
      if (visitedNeighbors.length === 0) {
        console.error("Prim has failed me");
        return;
      }
      // Pick one randomly
      const connectToNeighbor = visitedNeighbors[getRandomInteger(0, visitedNeighbors.length - 1)];
      
      // Remove wall between them
      const tileVector = getCellNeighborTileVector(currentCell, connectToNeighbor);
      this.removeWallByTileVector(currentCell, tileVector);
      this.removeWallByTileVector(connectToNeighbor, getInverseTileVector(tileVector));
    }
  }

  private addUnvisitedNeighborsToNext(cell: MazeCell): void {
    const neighbors = this.getNeighbors(cell);
      
    // Add all unvisited neighbors to the to-visit list
    for (let neighbor of neighbors) {
      // Avoid duplicate adding neighbors (visited + already in queue)
      if (!this.isCellVisited(neighbor) && !this.nextToVisitSet.has(neighbor.getTileKey())) {
        const dirIndex = getCellNeighborDirectionIndex(cell, neighbor);
        this.nextToVisitSet.add(neighbor.getTileKey());
        this.queue.push([dirIndex, neighbor]);
      }
    }
  }

  private getVisitedNeighbors(cell: MazeCell): MazeCell[] {
    const visitedNeighbors = this.getNeighbors(cell).filter(neighbor => this.isCellVisited(neighbor));
    return visitedNeighbors;
  }

  //TODO: visited cell set needs MazeGrid integration
  private setCellVisited(cell: MazeCell): void {
    this.visitedCellSet.add(cell.getTileKey());
  }

  private isCellVisited(cell: MazeCell): boolean {
    return this.visitedCellSet.has(cell.getTileKey());
  }
}
