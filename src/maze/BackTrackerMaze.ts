import { MazeDirectionIndex, MazeWallTypes } from "managers/MazeUtils";
import { Maze } from "models/Maze";
import { MazeCell } from "models/MazeCell";


export class BacktrackerMaze extends Maze {
  public sizeX: number;
  public sizeY: number;

  public current: MazeCell;
  public stack;
  public isDone: boolean;

  constructor(mazeSize: number) {
    super(mazeSize);
    this.current = null;
    this.stack = [];
    this.isDone = false;
    this.generateBacktracker();
  }

  public generateBacktracker = () => {
    this.current = this.grid[0][0];
    this.backtrackDFS();

    // Reset visited array
    this.generateVisitedArray();
  }

  public backtrackDFS() {
    while(!this.isDone) {
      if (!this.current.isVisited) {
        this.current.isVisited = true;
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
          this.current.walls[MazeDirectionIndex.UP] = MazeWallTypes.NO_WALL;
          next.walls[MazeDirectionIndex.DOWN] = MazeWallTypes.NO_WALL;
        }
        // RIGHT
        else if (this.current.x - next.x === -1) {
          this.current.walls[MazeDirectionIndex.RIGHT] = MazeWallTypes.NO_WALL;
          next.walls[MazeDirectionIndex.LEFT] = MazeWallTypes.NO_WALL;
        } 
        // BOTTOM
        else if (this.current.y - next.y === -1) {
          this.current.walls[MazeDirectionIndex.DOWN] = MazeWallTypes.NO_WALL;
          next.walls[MazeDirectionIndex.UP] = MazeWallTypes.NO_WALL;
        } 
        // LEFT
        else if (this.current.x - next.x === 1) {
          
          this.current.walls[MazeDirectionIndex.LEFT] = MazeWallTypes.NO_WALL;
          next.walls[MazeDirectionIndex.RIGHT] = MazeWallTypes.NO_WALL;
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
