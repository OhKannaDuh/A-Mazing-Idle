
class Game {
  constructor(isDisableUi = false, isDevMode = false) {
    this.maze = new Maze(this);
    this.points = new Points(this, isDevMode);
    this.rngBot = new RNGBot(this, isDevMode);
    this.ui = new UserInterface(this, isDisableUi);
    this.isDevMode = isDevMode;

    this.ui.setDebugPanelVisible(isDevMode);
    this.ui.init();
  }

  setMaze(newMaze) {
    this.maze.newMaze(newMaze);
    this.maze.resetAllPlayers();
  }

  getPlayer() {
    return this.player;
  }

  startGame() {
    this.ui.deleteMaze();
    this.maze.newMaze();
    //TODO: re-run maze option, reset visited
    
    this.ui.printMaze(this.maze.maze, this.maze.fruitTileSet);
    this.maze.resetAllPlayers();

    this.rngBot.enableRngBot(DEFAULT_PLAYER_ID);
  }
  
  completeMaze() {
    this.rngBot.deleteAllRngBot();
    
    this.points.addMazeCompletionBonus();

    if (this.isDevMode) {
      printMazeCompleteData(this);
      return;
    }
    this.startGame();
  }
}
