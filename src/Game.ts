import { printMazeCompleteData } from "./dev/devUtils";
import Maze from "./Maze";
import Points from "./managers/PointsManager";
import RNGBotManager from "./managers/RNGBotManager";
import UserInterface from "./UserInterface";
import UpgradeManager from "./managers/UpgradeManager";
import Serializable from "./models/Serializable";
import SaveManager from "./managers/SaveManager";
import PlayerManager from "./managers/PlayerManager";
import MazeItemManager from "./managers/MazeItemManager";
import StatsManager from "./managers/StatsManager.ts";
import { StatsKey } from "./models/Stats";


const SERIALIZABLE_PROPERTIES: string[] = ['points', 'upgrades', 'stats'];

class Game extends Serializable {
  public maze: Maze;
  public points: Points;
  public rngBot: RNGBotManager;
  public players: PlayerManager;
  public ui: UserInterface;
  public upgrades: UpgradeManager;
  public save: SaveManager;
  public items: MazeItemManager;
  public stats: StatsManager;

  private isDevMode: boolean;
  private isDisableUi: boolean;
  
  constructor(isDisableUi = false, isDevMode = false) {
    super(SERIALIZABLE_PROPERTIES);
    this.isDevMode = isDevMode;
    this.isDisableUi = isDisableUi;
    this.maze = new Maze(this);
    this.points = new Points(this, this.isDevMode);
    this.rngBot = new RNGBotManager(this, this.isDevMode);
    this.ui = new UserInterface(this, this.isDisableUi);
    this.upgrades = new UpgradeManager(this);
    this.players = new PlayerManager(this);
    this.save = new SaveManager(this);
    this.items = new MazeItemManager(this);
    this.stats = new StatsManager(this);

    this.ui.setDebugPanelVisible(this.isDevMode);
    this.ui.init();
    this.stats.initStatsMap();
  }

  hardResetGame() {
    this.save.clearLocalStorage();
    this.resetGame();
    this.maze = new Maze(this);
    this.points.points = 0;
    this.upgrades.resetUpgrades();
    this.stats.initStatsMap();
    
    this.startGame();
    this.save.startSaveTimer();
  }

  setMaze() {
    this.maze.newMaze();
    this.players.resetAllPlayers();
  }

  startGame() {
    this.ui.updateAllStatsKey();
    this.upgrades.updateAllUpgradeUi();
    this.players.resetAllPlayers();
    this.ui.deleteMaze();
    this.maze.newMaze();
    //TODO: re-run maze option, reset visited
    
    this.ui.printMaze(this.maze.maze);
    
    this.players.createDefaultPlayer();
    this.rngBot.enableGlobalRngBot();
  }
  
  completeMaze(playerId: number) {
    this.rngBot.disableGlobalMovement();
    this.players.resetAllPlayers();
    this.points.addMazeCompletionBonus(playerId);

    this.stats.addStatsToKey(1, StatsKey.TOTAL_MAZES_COMPLETED);
    this.stats.clearCurrentMazeStats();

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
    this.items.clearAllItems();
  }
}

export default Game;
