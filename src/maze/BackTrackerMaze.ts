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
      let unvisitedNeighbor = [];
      for (let neigh of this.getNeighbors(this.currentTile)) {
        if (!neigh.isVisited) {
          unvisitedNeighbor.push(neigh);
        }
      }
    
      // Pick a random unvisited neighbour
      if (unvisitedNeighbor.length > 0) {
        let randomIndex = Math.floor(Math.random() * unvisitedNeighbor.length);
        let nextTile: MazeCell = unvisitedNeighbor[randomIndex];
        
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
  }
}
