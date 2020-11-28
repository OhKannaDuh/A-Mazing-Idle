
class Game {
  constructor(isDisableUi = false, isDevMode = false) {
    this.maze = new Maze(this);
    this.points = new Points(this);
    this.rngBot = new RNGBot(this, isDevMode);
    this.ui = new UserInterface(this, isDisableUi);
    this.isDevMode = isDevMode;
  }

  getPlayer() {
    return this.player;
  }

  startGame() {
    this.ui.init();

    this.ui.deleteMaze();
    this.maze.newMaze();
    //TODO: re-run maze option, reset visited
    
    this.ui.printMaze(this.maze.maze);
    this.maze.resetPlayer();
    
    this.rngBot.enableRngBot();
  }
  
  completeMaze() {
    this.rngBot.disableRngBot();
    
    this.points.addMazeCompletionBonus();

    
    if (this.isDevMode) {
      printMazeCompleteData(this);
    }
    this.startGame();
  }
}
