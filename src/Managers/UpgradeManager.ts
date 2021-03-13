import Upgrade from "upgrades/Upgrade";
import AvoidRevisitLastPositionUpgrade from "upgrades/definitions/bots/AvoidRevisitLastPositionUpgrade";
import PrioritizeUnvisitedUpgrade from "upgrades/definitions/bots/PrioritizeUnvisitedUpgrade";
import AutoExitMazeUpgrade from "upgrades/definitions/bots/AutoExitMazeUpgrade";
import PlayerMoveIndependentlyUpgrade from "upgrades/definitions/bots/PlayerMoveIndependentlyUpgrade";
import TeleportPlayerBacktoBotUpgrade from "upgrades/definitions/bots/TeleportPlayerBacktoBotUpgrade";
import TeleportBotBackToPlayerUpgrade from "upgrades/definitions/bots/TeleportBotBackToPlayerUpgrade";
import FruitPickupPointsMultiplierUpgrade from "upgrades/definitions/items/FruitPickupPointsMultiplierUpgrade";
import FruitSpawnRateUpgrade from "upgrades/definitions/items/FruitSpawnRateUpgrade";
import BrainSpawnRateUpgrade from "upgrades/definitions/items/BrainSpawnRateUpgrade";
import BrainTileDistanceUpgrade from "upgrades/definitions/items/BrainTileDistanceUpgrade";
import BotRememberDeadEndsUpgrade from "upgrades/definitions/bots/BotRememberDeadEndsUpgrade";
import MazeCompletionBonusUpgrade from "upgrades/definitions/maze/MazeCompletionBonusUpgrade";
import BotMovementSpeedUpgrade from "upgrades/definitions/bots/BotMovementSpeedUpgrade";
import PointsPerVisitUpgrade from "upgrades/definitions/maze/PointsPerVisitUpgrade";
import PointsPerRevisitUpgrade from "upgrades/definitions/maze/PointsPerRevisitUpgrade";
import MazeSizeUpgrade from "upgrades/definitions/maze/MazeSizeUpgrade";
import BotSplitDirectionUpgrade from "upgrades/definitions/bots/BotSplitDirectionUpgrade";
import BotSplitAutoMergeUpgrade from "upgrades/definitions/bots/BotSplitAutoMergeUpgrade";
import DestructibleWallUpgrade from "upgrades/definitions/maze/DestructibleWallUpgrade";
import MultiplierItemSpawnRateUpgrade from "upgrades/definitions/items/MultiplierItemSpawnRateUpgrade";
import MultiplierItemStrengthUpgrade from "upgrades/definitions/items/MultiplierItemStrengthUpgrade";
import MultiplierItemExtraBotUpgrade from "upgrades/definitions/items/MultiplierItemExtraBotUpgrade";
import UnlimitedSplitsItemExtraBotUpgrade from "upgrades/definitions/items/UnlimitedSplitsItemExtraBotUpgrade";
import BiomeUpgrade from "upgrades/definitions/maze/BiomeUpgrade";
import Game from "managers/Game";
import { UpgradeKey } from "constants/UpgradeConstants"
import Serializable from "models/Serializable";
import { IS_GLOBAL_UNLOCK_ENABLED } from "dev/devUtils";


const SERIALIZABLE_PROPERTIES = ['upgradeMap'];

class UpgradeManager extends Serializable {
  private upgradeMap: Map<UpgradeKey, Upgrade>;
  private game: Game;

  constructor(game: Game) {
    super(SERIALIZABLE_PROPERTIES);
    this.game = game;
  }

  initUpgrades() {
    this.upgradeMap = new Map<UpgradeKey, Upgrade>();
    
    // Maze / Points
    this.createUpgrade(new PointsPerVisitUpgrade(this.game, UpgradeKey.POINTS_PER_VISIT));
    this.createUpgrade(new MazeCompletionBonusUpgrade(this.game, UpgradeKey.MAZE_COMPLETION_BONUS));
    this.createUpgrade(new MazeSizeUpgrade(this.game, UpgradeKey.MAZE_SIZE_UPGRADE));
    this.createUpgrade(new PointsPerRevisitUpgrade(this.game, UpgradeKey.POINTS_PER_REVISIT));
    // Bot
    this.createUpgrade(new AutoExitMazeUpgrade(this.game, UpgradeKey.AUTO_EXIT_MAZE));
    this.createUpgrade(new AvoidRevisitLastPositionUpgrade(this.game, UpgradeKey.AVOID_REVISIT_LAST_POSITION));
    this.createUpgrade(new BotMovementSpeedUpgrade(this.game, UpgradeKey.BOT_MOVEMENT_SPEED));
    this.createUpgrade(new BotSplitAutoMergeUpgrade(this.game, UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE));
    this.createUpgrade(new BotSplitDirectionUpgrade(this.game, UpgradeKey.BOT_SPLIT_DIRECTION));
    this.createUpgrade(new BotRememberDeadEndsUpgrade(this.game, UpgradeKey.BOT_REMEMBER_DEADEND_TILES));
    this.createUpgrade(new BrainTileDistanceUpgrade(this.game, UpgradeKey.BRAIN_TILE_DISTANCE));
    this.createUpgrade(new PlayerMoveIndependentlyUpgrade(this.game, UpgradeKey.PLAYER_MOVE_INDEPENDENTLY));
    this.createUpgrade(new PrioritizeUnvisitedUpgrade(this.game, UpgradeKey.PRIORITIZE_UNVISITED));
    this.createUpgrade(new TeleportPlayerBacktoBotUpgrade(this.game, UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT));
    this.createUpgrade(new TeleportBotBackToPlayerUpgrade(this.game, UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER));
    // Item
    this.createUpgrade(new FruitPickupPointsMultiplierUpgrade(this.game, UpgradeKey.FRUIT_PICKUP_POINTS));
    this.createUpgrade(new FruitSpawnRateUpgrade(this.game, UpgradeKey.FRUIT_SPAWN));
    this.createUpgrade(new BrainSpawnRateUpgrade(this.game, UpgradeKey.BRAIN_SPAWN));
    this.createUpgrade(new MultiplierItemSpawnRateUpgrade(this.game, UpgradeKey.MULTIPLIER_ITEM_SPAWN_RATE));
    this.createUpgrade(new MultiplierItemStrengthUpgrade(this.game, UpgradeKey.MULTIPLIER_ITEM_STRENGTH));
    this.createUpgrade(new MultiplierItemExtraBotUpgrade(this.game, UpgradeKey.MULTIPLIER_ITEM_EXTRA_BOT));
    this.createUpgrade(new UnlimitedSplitsItemExtraBotUpgrade(this.game, UpgradeKey.UNLIMITED_SPLIT_ITEM_EXTRA_BOT));
    
    // Features
    this.createUpgrade(new DestructibleWallUpgrade(this.game, UpgradeKey.DESTRUCTIBLE_WALLS));
    // Biomes
    this.createUpgrade(new BiomeUpgrade(this.game, UpgradeKey.BIOME));
  }

  updateAllUpgradeUi() {
    for (let [upgradeKey, upgrade] of this.upgradeMap) {
      upgrade.updateUiProperties();
      upgrade.updateUiDisabled();
      upgrade.updateVisibility();
    }
  }

  createUpgrade(upgrade: Upgrade) {
    this.upgradeMap.set(upgrade.upgradeKey, upgrade);
  }

  getUpgrade(upgradeKey: UpgradeKey) {
    if (!this.upgradeMap.has(upgradeKey)) {
      throw `Unexpected upgrade key found: ${upgradeKey}`;
    }
    return this.upgradeMap.get(upgradeKey);
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
    if (IS_GLOBAL_UNLOCK_ENABLED) return true;
    return this.upgradeMap.get(upgradeKey).isUnlocked();
  }
}


export default UpgradeManager;
