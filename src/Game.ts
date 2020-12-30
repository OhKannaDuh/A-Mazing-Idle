import { printMazeCompleteData } from "./dev/devUtils";
import Maze, { DEFAULT_PLAYER_ID } from "./Maze";
import Points from "./Managers/PointsManager";
import RNGBotManager from "./Managers/RNGBotManager";
import UserInterface from "./UserInterface";
import UpgradeManager from "./Managers/UpgradeManager";
import Serializable from "./models/Serializable";
import SaveManager from "./Managers/SaveManager";
import PlayerManager from "./Managers/PlayerManager";


class Game extends Serializable {
  public maze: Maze;
  public points: Points;
  public rngBot: RNGBotManager;
  public players: PlayerManager;
  public ui: UserInterface;
  public upgrades: UpgradeManager;
  public save: SaveManager;

  private isDevMode: boolean;
  private isDisableUi: boolean;
  
  constructor(isDisableUi = false, isDevMode = false) {
    super(['points', 'upgrades']);
    this.isDevMode = isDevMode;
    this.isDisableUi = isDisableUi;
    this.maze = new Maze(this);
    this.points = new Points(this, this.isDevMode);
    this.rngBot = new RNGBotManager(this, this.isDevMode);
    this.ui = new UserInterface(this, this.isDisableUi);
    this.upgrades = new UpgradeManager(this);
    this.players = new PlayerManager(this);
    this.save = new SaveManager(this);

    this.ui.setDebugPanelVisible(this.isDevMode);
    this.ui.init();
  }

  hardResetGame() {
    //TODO: this cannot be handled from within this object.
    this.save.clearLocalStorage();
    this.resetGame();
    this.maze = new Maze(this);
    this.points.points = 0;
    this.upgrades.initUpgrades();
        
    this.startGame();
    this.save.startSaveTimer();
  }

  setMaze() {
    this.maze.newMaze();
    this.players.resetAllPlayers();
  }

  startGame() {
    this.players.resetAllPlayers();
    this.ui.deleteMaze();
    this.maze.newMaze();
    //TODO: re-run maze option, reset visited
    
    this.ui.printMaze(this.maze.maze, this.maze.fruitTileSet);
    
    this.players.createDefaultPlayer();
    this.rngBot.enableGlobalRngBot();
  }
  
  completeMaze() {
    this.rngBot.disableGlobalMovement();
    this.players.resetAllPlayers();
    this.points.addMazeCompletionBonus();

    if (this.isDevMode) {
      printMazeCompleteData(this);
      return;
    }
    this.startGame();
  }
  
  resetGame() {
    this.rngBot.disableGlobalMovement();
    this.rngBot.disableReEnableBotMovementTimer();
    this.players.resetAllPlayers();
  }
}

export default Game;
