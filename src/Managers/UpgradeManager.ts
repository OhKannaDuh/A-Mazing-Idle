import Upgrade from "../upgrades/Upgrade";
import AvoidRevisitLastPositionUpgrade from "../upgrades/definitions/AvoidRevisitLastPositionUpgrade";
import PrioritizeUnvisitedUpgrade from "../upgrades/definitions/PrioritizeUnvisitedUpgrade";
import AutoExitMazeUpgrade from "../upgrades/definitions/AutoExitMazeUpgrade";
import PlayerMoveIndependentlyUpgrade from "../upgrades/definitions/PlayerMoveIndependentlyUpgrade";
import TeleportPlayerBacktoBotUpgrade from "../upgrades/definitions/TeleportPlayerBacktoBotUpgrade";
import TeleportBotBackToPlayerUpgrade from "../upgrades/definitions/TeleportBotBackToPlayerUpgrade";
import FruitPickupPointsMultiplierUpgrade from "../upgrades/definitions/FruitPickupPointsMultiplierUpgrade";
import FruitSpawnRateUpgrade from "../upgrades/definitions/FruitSpawnRateUpgrade";
import BrainSpawnRateUpgrade from "../upgrades/definitions/BrainSpawnRateUpgrade";
import BotRememberDeadEndsUpgrade from "../upgrades/definitions/BotRememberDeadEndsUpgrade";
import MazeCompletionBonusUpgrade from "../upgrades/definitions/MazeCompletionBonusUpgrade";
import BotMovementSpeedUpgrade from "../upgrades/definitions/BotMovementSpeedUpgrade";
import PointsPerVisitUpgrade from "../upgrades/definitions/PointsPerVisitUpgrade";
import MazeSizeUpgrade from "../upgrades/definitions/MazeSizeUpgrade";
import BotSplitDirectionUpgrade from "../upgrades/definitions/BotSplitDirectionUpgrade";
import BotSplitAutoMergeUpgrade from "../upgrades/definitions/BotSplitAutoMergeUpgrade";
import DestructibleWallUpgrade from "../upgrades/definitions/DestructibleWallUpgrade";
import Game from "../Game";
import { UpgradeKey } from "../upgrades/UpgradeConstants"
import Serializable from "../models/Serializable";

const SERIALIZABLE_PROPERTIES = ['upgradeMap'];

class UpgradeManager extends Serializable {
  private upgradeMap: Map<UpgradeKey, Upgrade>;
  private game: Game;

  constructor(game: Game) {
    super(SERIALIZABLE_PROPERTIES);
    this.game = game;
    this.resetUpgrades();
  }

  resetUpgrades() {
    this.upgradeMap = new Map<UpgradeKey, Upgrade>();
    this.createUpgrade(new AutoExitMazeUpgrade(this.game, UpgradeKey.AUTO_EXIT_MAZE));
    this.createUpgrade(new AvoidRevisitLastPositionUpgrade(this.game, UpgradeKey.AVOID_REVISIT_LAST_POSITION));
    this.createUpgrade(new BotMovementSpeedUpgrade(this.game, UpgradeKey.BOT_MOVEMENT_SPEED));
    this.createUpgrade(new BotSplitAutoMergeUpgrade(this.game, UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE));
    this.createUpgrade(new BotSplitDirectionUpgrade(this.game, UpgradeKey.BOT_SPLIT_DIRECTION));
    this.createUpgrade(new BotRememberDeadEndsUpgrade(this.game, UpgradeKey.BOT_REMEMBER_DEADEND_TILES));
    this.createUpgrade(new FruitPickupPointsMultiplierUpgrade(this.game, UpgradeKey.FRUIT_PICKUP_POINTS));
    this.createUpgrade(new FruitSpawnRateUpgrade(this.game, UpgradeKey.FRUIT_SPAWN));
    this.createUpgrade(new BrainSpawnRateUpgrade(this.game, UpgradeKey.BRAIN_SPAWN));
    this.createUpgrade(new MazeCompletionBonusUpgrade(this.game, UpgradeKey.MAZE_COMPLETION_BONUS));
    this.createUpgrade(new MazeSizeUpgrade(this.game, UpgradeKey.MAZE_SIZE_UPGRADE));
    this.createUpgrade(new PlayerMoveIndependentlyUpgrade(this.game, UpgradeKey.PLAYER_MOVE_INDEPENDENTLY));
    this.createUpgrade(new PointsPerVisitUpgrade(this.game, UpgradeKey.POINTS_PER_VISIT));
    this.createUpgrade(new PrioritizeUnvisitedUpgrade(this.game, UpgradeKey.PRIORITIZE_UNVISITED));
    this.createUpgrade(new TeleportPlayerBacktoBotUpgrade(this.game, UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT));
    this.createUpgrade(new TeleportBotBackToPlayerUpgrade(this.game, UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER));
    // Features
    this.createUpgrade(new DestructibleWallUpgrade(this.game, UpgradeKey.DESTRUCTIBLE_WALLS));
  }

  updateAllUpgradeUi() {
    for (let [upgradeKey, val] of this.upgradeMap) {
      val.updateUiProperties();
      val.updateUiDisabled();
    }
  }

  createUpgrade(upgrade: Upgrade) {
    upgrade.upgradeLevel = this.getInitialUpgradeLevel(upgrade.upgradeKey);
    this.upgradeMap.set(upgrade.upgradeKey, upgrade);
  }

  getUpgrade(upgradeKey: UpgradeKey) {
    if (!this.upgradeMap.has(upgradeKey)) {
      throw `Unexpected upgrade key found: ${upgradeKey}`;
    }
    return this.upgradeMap.get(upgradeKey);
  }

  getInitialUpgradeLevel(upgradeKey: UpgradeKey) {
    //TODO: use for saving.
    return 0;
  }

  getUpgradeLevel(upgradeKey: UpgradeKey) {
    return this.getUpgrade(upgradeKey).upgradeLevel;
  }

  isUpgraded(upgradeKey: UpgradeKey) {
    return this.getUpgrade(upgradeKey).getIsUpgraded();
  }

  serializeProperty(property: string): any {
    // Upgrade map will export the upgrade level of each key
    if (property === 'upgradeMap') {
      const obj = {};
      for (let [k, v] of this.upgradeMap) {
        obj[k] = v.upgradeLevel;
      }
      return obj;
    } else {
      return super.serializeProperty(property);
    }
  }

  deserializeProperty(property: string, value: any): void {
    // Upgrade map will restore the upgrade level of each key
    if (property === 'upgradeMap') {
      for (let upgradeKey in value) {
        this.upgradeMap.get(upgradeKey as UpgradeKey).upgradeLevel = parseInt(value[upgradeKey]);
      }
    } else {
      return super.deserializeProperty(property, value);
    }
  }

  isUnlocked(upgradeKey: UpgradeKey): boolean {
    return this.upgradeMap.get(upgradeKey).isUnlocked();
  }
}


export default UpgradeManager;
