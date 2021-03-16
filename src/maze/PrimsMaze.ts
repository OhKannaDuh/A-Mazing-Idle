import { getCellNeighborDirection, getInverseTileVector, getRandomNumber, MazeDirectionIndex, MazeWallTypes } from "managers/MazeUtils";
import { Maze } from "models/Maze";
import { MazeCell } from "models/MazeCell";


export class PrimsMaze extends Maze {
  private visitedCellSet: Set<string>;
  private nextToVisitSet: Set<string>;

  constructor(mazeSize: number) {
    super(mazeSize);
    this.visitedCellSet = new Set<string>();
    this.nextToVisitSet = new Set<string>();
    this.generateMaze();
  }

  public generateMaze(): void {
    const startingX = getRandomNumber(0, this.sizeX - 1);
    const startingY = getRandomNumber(0, this.sizeX - 1);  //TODO: randomize me
    
    const startCell = this.getCell({ x: startingX, y: startingY });

    this.setCellVisited(startCell);
    
    this.addUnvisitedNeighborsToNext(startCell);
    this.prims();
  }

  private getNextCellToVisit(): MazeCell {
    const nextIndex = getRandomNumber(0, this.nextToVisitSet.size - 1);
    
    // Remove from to-visit list
    const nextTileKey = Array.from(this.nextToVisitSet)[nextIndex];
    this.nextToVisitSet.delete(nextTileKey);
    return this.getCellByTileKey(nextTileKey);
  }

  private prims() {
    while (this.nextToVisitSet.size > 0) {
      // Choose a random unvisited cell
      let currentCell = this.getNextCellToVisit();
      this.setCellVisited(currentCell);
      this.addUnvisitedNeighborsToNext(currentCell);
      

      // Get all visited neighbors
      const visitedNeighbors = this.getVisitedNeighbors(currentCell);
      if (visitedNeighbors.length === 0) {
        console.error("Prim has failed me");
        return;
      }
      // Pick one randomly
      const connectToNeighbor = visitedNeighbors[getRandomNumber(0, visitedNeighbors.length - 1)];
      
      // Remove wall between them
      const tileVector = getCellNeighborDirection(currentCell, connectToNeighbor);
      this.removeWallByTileVector(currentCell, tileVector);
      this.removeWallByTileVector(connectToNeighbor, getInverseTileVector(tileVector));
    }
  }

  private addUnvisitedNeighborsToNext(cell: MazeCell): void {
    const neighbors = this.getNeighbors(cell);
      
    // Add all unvisited neighbors to the to-visit list
    for (let neighbor of neighbors) {
      if (!this.isCellVisited(neighbor)) {
        this.nextToVisitSet.add(neighbor.getTileKey());
      }
    }
  }

  private getVisitedNeighbors(cell: MazeCell): MazeCell[] {
    const visitedNeighbors = this.getNeighbors(cell).filter(neighbor => this.isCellVisited(neighbor));
    return visitedNeighbors;
  }

  private setCellVisited(cell: MazeCell): void {
    this.visitedCellSet.add(cell.getTileKey());
  }

  private isCellVisited(cell: MazeCell): boolean {
    return this.visitedCellSet.has(cell.getTileKey());
  }
}
