
class Game {
  constructor() {
    this.maze = new MazeGenerator(this);
    this.points = new Points(this);
    this.rngBot = new RNGBot(this);
    this.ui = new UserInterface(this);
  }

  getPlayer() {
    return this.player;
  }

  startGame() {
    this.ui.init();

    this.maze.deleteMaze();
    this.maze.newMaze();
    this.maze.printMaze();
    this.maze.resetPlayer();
    
    this.rngBot.enableRngBot();
  }
  
  completeMaze() {
    this.rngBot.disableRngBot();
    
    this.points.addMazeCompletionBonus();

    this.startGame();
  }
}
