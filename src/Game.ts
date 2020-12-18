import { printMazeCompleteData } from "./dev/devUtils";
import Maze, { DEFAULT_PLAYER_ID } from "./Maze";
import Points from "./Points";
import RNGBot from "./RNGBot";
import UserInterface from "./UserInterface";
import UpgradeManager from "./upgrades/UpgradeManager";

class Game {
  public maze: Maze;
  public points: Points;
  public rngBot: RNGBot;
  public ui: UserInterface;
  public upgrades: UpgradeManager

  private isDevMode: boolean;

  constructor(isDisableUi = false, isDevMode = false) {
    this.maze = new Maze(this);
    this.points = new Points(this, isDevMode);
    this.rngBot = new RNGBot(this, isDevMode);
    this.ui = new UserInterface(this, isDisableUi);
    this.isDevMode = isDevMode;
    this.upgrades = new UpgradeManager(this);

    this.ui.setDebugPanelVisible(isDevMode);
    this.ui.init();
  }

  setMaze() {
    this.maze.newMaze();
    this.maze.resetAllPlayers();
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

export default Game;