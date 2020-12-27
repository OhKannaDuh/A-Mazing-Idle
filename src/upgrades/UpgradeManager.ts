import Upgrade from "./Upgrade";
import AvoidRevisitLastPositionUpgrade from "./definitions/AvoidRevisitLastPositionUpgrade";
import PrioritizeUnvisitedUpgrade from "./definitions/PrioritizeUnvisitedUpgrade";
import AutoExitMazeUpgrade from "./definitions/AutoExitMazeUpgrade";
import PlayerMoveIndependentlyUpgrade from "./definitions/PlayerMoveIndependentlyUpgrade";
import TeleportPlayerBacktoBotUpgrade from "./definitions/TeleportPlayerBacktoBotUpgrade";
import TeleportBotBackToPlayerUpgrade from "./definitions/TeleportBotBackToPlayerUpgrade";
import FruitPickupPointsMultiplierUpgrade from "./definitions/FruitPickupPointsMultiplierUpgrade";
import FruitSpawnRateUpgrade from "./definitions/FruitSpawnRateUpgrade";
import BotRememberDeadEndsUpgrade from "./definitions/BotRememberDeadEndsUpgrade";
import MazeCompletionBonusUpgrade from "./definitions/MazeCompletionBonusUpgrade";
import BotMovementSpeedUpgrade from "./definitions/BotMovementSpeedUpgrade";
import PointsPerVisitUpgrade from "./definitions/PointsPerVisitUpgrade";
import MazeSizeUpgrade from "./definitions/MazeSizeUpgrade";
import BotSplitDirectionUpgrade from "./definitions/BotSplitDirectionUpgrade";
import BotSplitAutoMergeUpgrade from "./definitions/BotSplitAutoMergeUpgrade";
import Game from "../Game";
import { UpgradeKey } from "./UpgradeConstants"
import Serializable from "../models/Serializable";


class UpgradeManager extends Serializable {
  private upgradeMap = new Map<UpgradeKey, Upgrade>();
  private game: Game;

  constructor(game: Game) {
    super(['upgradeMap']);
    this.game = game;
    this.initUpgrades();
  }

  initUpgrades() {
    this.createUpgrade(new AutoExitMazeUpgrade(this.game, UpgradeKey.AUTO_EXIT_MAZE));
    this.createUpgrade(new AvoidRevisitLastPositionUpgrade(this.game, UpgradeKey.AVOID_REVISIT_LAST_POSITION));
    this.createUpgrade(new BotMovementSpeedUpgrade(this.game, UpgradeKey.BOT_MOVEMENT_SPEED));
    this.createUpgrade(new BotSplitAutoMergeUpgrade(this.game, UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE));
    this.createUpgrade(new BotSplitDirectionUpgrade(this.game, UpgradeKey.BOT_SPLIT_DIRECTION));
    this.createUpgrade(new BotRememberDeadEndsUpgrade(this.game, UpgradeKey.BOT_REMEMBER_DEADEND_TILES));
    this.createUpgrade(new FruitPickupPointsMultiplierUpgrade(this.game, UpgradeKey.FRUIT_PICKUP_POINTS));
    this.createUpgrade(new FruitSpawnRateUpgrade(this.game, UpgradeKey.FRUIT_SPAWN));
    this.createUpgrade(new MazeCompletionBonusUpgrade(this.game, UpgradeKey.MAZE_COMPLETION_BONUS));
    this.createUpgrade(new MazeSizeUpgrade(this.game, UpgradeKey.MAZE_SIZE_UPGRADE));
    this.createUpgrade(new PlayerMoveIndependentlyUpgrade(this.game, UpgradeKey.PLAYER_MOVE_INDEPENDENTLY));
    this.createUpgrade(new PointsPerVisitUpgrade(this.game, UpgradeKey.POINTS_PER_VISIT));
    this.createUpgrade(new PrioritizeUnvisitedUpgrade(this.game, UpgradeKey.PRIORITIZE_UNVISITED));
    this.createUpgrade(new TeleportPlayerBacktoBotUpgrade(this.game, UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT));
    this.createUpgrade(new TeleportBotBackToPlayerUpgrade(this.game, UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER));
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
    return this.getUpgrade(upgradeKey).getIsSinglePurchaseUpgraded();
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
}


export default UpgradeManager;
