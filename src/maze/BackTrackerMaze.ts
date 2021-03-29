import Game from "managers/Game";
import { MazeDirectionIndex, MazeGridType, MazeWallTypes } from "managers/MazeUtils";
import { Maze } from "models/Maze";
import { MazeCell } from "models/MazeCell";


export class BacktrackerMaze extends Maze {

  public current: MazeCell;
  public stack: MazeCell[];
  public isDone: boolean;

  constructor(game: Game, mazeSizeX: number, mazeGridType: MazeGridType) {
    super(game, mazeSizeX, mazeGridType);
    this.current = null;
    this.stack = [];
    this.isDone = false;
    this.generateMaze();
  }

  public generateMaze() {
    this.current = this.getCell(this.grid.internalStartTile);
    this.backtrackDFS();
    super.generateMaze();
  }

  private backtrackDFS() {
    while(!this.isDone) {
      if (!this.current.isVisited) {
        this.current.setVisited();
        this.stack.push(this.current);
      }
    
      // Add neighbors
      let unvisitedNeighbor = [];
      for (let neigh of this.getNeighbors(this.current)) {
        if (!neigh.isVisited) {
          unvisitedNeighbor.push(neigh);
        }
      }
    
      // Pick a random unvisited neighbour
      if (unvisitedNeighbor.length > 0) {
        let randomIndex = Math.floor(Math.random() * unvisitedNeighbor.length);
        let next: MazeCell = unvisitedNeighbor[randomIndex];
        
        //Remove Walls
        //TODO: this should compare tile diff vectors with direction vectors
        // TOP
        if (this.current.y - next.y === 1) {
          this.removeWallByDirIndex(this.current, MazeDirectionIndex.UP);
          this.removeWallByDirIndex(next, MazeDirectionIndex.DOWN);
        }
        // RIGHT
        else if (this.current.x - next.x === -1) {
          this.removeWallByDirIndex(this.current, MazeDirectionIndex.RIGHT);
          this.removeWallByDirIndex(next, MazeDirectionIndex.LEFT);
        } 
        // BOTTOM
        else if (this.current.y - next.y === -1) {
          this.removeWallByDirIndex(this.current, MazeDirectionIndex.DOWN);
          this.removeWallByDirIndex(next, MazeDirectionIndex.UP);
        } 
        // LEFT
        else if (this.current.x - next.x === 1) {
          this.removeWallByDirIndex(this.current, MazeDirectionIndex.LEFT);
          this.removeWallByDirIndex(next, MazeDirectionIndex.RIGHT);
        }
    
        this.current = next;
      } 
      // If all neighbours visited, pick a random unvisited cell
      else if (this.stack.length > 0) {
        this.current = this.stack.pop();
      } else {
        this.isDone = true;
      }
    }
  }
}
