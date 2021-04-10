import Game from "managers/Game";
import { MazeAlgorithmType, MazeDirectionIndex, MazeGridType, MazeWallTypes } from "managers/MazeUtils";
import { Maze } from "models/Maze";
import { MazeCell } from "models/MazeCell";


export class BacktrackerMaze extends Maze {

  public currentTile: MazeCell;
  public stack: MazeCell[];
  public isDone: boolean;

  constructor(game: Game, mazeSizeX: number, mazeGridType: MazeGridType) {
    super(game, mazeSizeX, mazeGridType, MazeAlgorithmType.BACK_TRACKER);
    this.currentTile = null;
    this.stack = [];
    this.isDone = false;
    this.generateMaze();
  }

  public generateMaze() {
    this.currentTile = this.getCell(this.grid.internalStartTile);
    this.backtrackDFS();
    super.generateMaze();
  }

  private backtrackDFS() {
    while(!this.isDone) {
      if (!this.currentTile.isVisited) {
        this.currentTile.setVisited();
        this.stack.push(this.currentTile);
      }

      // Add neighbors
      let unvisitedNeighborList = [];
      const neighbors = this.getNeighbors(this.currentTile);
      for (let neigh of neighbors) {
        if (!neigh.isVisited) {
          unvisitedNeighborList.push(neigh);
        }
      }
      
      
      // Pick a random unvisited neighbour
      if (unvisitedNeighborList.length > 0) {
        let randomIndex = Math.floor(Math.random() * unvisitedNeighborList.length);
        let nextTile: MazeCell = unvisitedNeighborList[randomIndex];

        // Remove Walls
        this.removeWallBetweenCells(this.currentTile, nextTile);
        
        // Assign new current tile
        this.currentTile = nextTile;
      }
      // Allow edge pieces with only single connections to connect with already-visited tiles
      else if (neighbors.length === 1) {
        let nextTile: MazeCell = neighbors[0];
        
        // Remove Walls
        this.removeWallBetweenCells(this.currentTile, nextTile);
        
        // Assign new current tile
        this.currentTile = nextTile;
      }
      // If all neighbours visited, pick a random unvisited cell
      else if (this.stack.length > 0) {
        this.currentTile = this.stack.pop();
      } else {
        this.isDone = true;
      }
    }

    // Backtracker does not guarantee "odd" shaped grids (ie. diamond)
    // will actually visit every single tile.  Clean up any unvisited cells after.
    for (const cell of this.grid.getAllCells()) {
      if (!cell.isVisited) {
        const neighbors = this.getNeighbors(cell);
        if (neighbors && neighbors.length > 0) {
          this.removeWallBetweenCells(cell, neighbors[0]);
        } else {
          console.error("Impossible to reach cell for backtracker.  Unable to cleanup.");
        }
      }
    }
  }
}
