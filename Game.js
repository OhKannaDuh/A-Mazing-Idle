
class Game {
  constructor() {
    this.maze = new Maze(this);
    this.points = new Points(this);
    this.rngBot = new RNGBot(this);
    this.ui = new UserInterface(this);
  }

  getPlayer() {
    return this.player;
  }

  startGame() {
    this.ui.init();

    this.ui.deleteMaze();
    this.maze.newMaze();
    
    this.ui.printMaze(this.maze.maze);
    this.maze.resetPlayer();
    
    this.rngBot.enableRngBot();
  }
  
  completeMaze() {
    this.rngBot.disableRngBot();
    
    this.points.addMazeCompletionBonus();

    this.startGame();
  }
}
