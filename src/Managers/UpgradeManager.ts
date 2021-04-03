import Upgrade from "upgrades/Upgrade";
import { AvoidRevisitLastPositionUpgrade } from "upgrades/definitions/bots/AvoidRevisitLastPositionUpgrade";
import { PrioritizeUnvisitedUpgrade } from "upgrades/definitions/bots/PrioritizeUnvisitedUpgrade";
import { AutoExitMazeUpgrade } from "upgrades/definitions/bots/AutoExitMazeUpgrade";
import { PlayerMoveIndependentlyUpgrade } from "upgrades/definitions/bots/PlayerMoveIndependentlyUpgrade";
import { TeleportPlayerBacktoBotUpgrade } from "upgrades/definitions/bots/TeleportPlayerBacktoBotUpgrade";
import { TeleportBotBackToPlayerUpgrade } from "upgrades/definitions/bots/TeleportBotBackToPlayerUpgrade";
import { FruitPickupPointsMultiplierUpgrade } from "upgrades/definitions/items/FruitPickupPointsMultiplierUpgrade";
import { FruitSpawnRateUpgrade } from "upgrades/definitions/items/FruitSpawnRateUpgrade";
import { BrainSpawnRateUpgrade } from "upgrades/definitions/items/BrainSpawnRateUpgrade";
import { BrainTileDistanceUpgrade } from "upgrades/definitions/items/BrainTileDistanceUpgrade";
import { BotRememberDeadEndTilesUpgrade } from "upgrades/definitions/bots/BotRememberDeadEndTilesUpgrade";
import { MazeCompletionBonusUpgrade } from "upgrades/definitions/maze/MazeCompletionBonusUpgrade";
import { BotMovementSpeedUpgrade } from "upgrades/definitions/bots/BotMovementSpeedUpgrade";
import { PointsPerVisitUpgrade } from "upgrades/definitions/maze/PointsPerVisitUpgrade";
import { PointsPerRevisitUpgrade } from "upgrades/definitions/maze/PointsPerRevisitUpgrade";
import { MazeSizeUpgrade } from "upgrades/definitions/maze/MazeSizeUpgrade";
import { BotSplitDirectionUpgrade } from "upgrades/definitions/bots/BotSplitDirectionUpgrade";
import { BotSplitAutoMergeUpgrade } from "upgrades/definitions/bots/BotSplitAutoMergeUpgrade";
import { DestructibleWallUpgrade } from "upgrades/definitions/maze/DestructibleWallUpgrade";
import { BotAutoMoveUpgrade } from "upgrades/definitions/bots/BotAutoMoveUpgrade";
import { PointsMultiplierActivateDurationUpgrade } from "upgrades/definitions/powerUps/PointsMultiplierActivateDurationUpgrade";
import { PointsMultiplierStrengthUpgrade } from "upgrades/definitions/powerUps/PointsMultiplierStrengthUpgrade";
import { SpeedUpMultiplierStrengthUpgrade } from "upgrades/definitions/powerUps/SpeedUpMultiplierStrengthUpgrade";
import { SpeedUpActivateDurationUpgrade } from "upgrades/definitions/powerUps/SpeedUpActivateDurationUpgrade";
import { BiomeUpgrade } from "upgrades/definitions/maze/BiomeUpgrade";
import Game from "managers/Game";
import { UpgradeKey, UpgradeType, UPGRADE_TYPE_TO_UI_KEY_MAP } from "constants/UpgradeConstants"
import { Serializable } from "models/Serializable";
import { UserInterface } from "managers/UserInterface";

const UPGRADE_MAP_PROPERTY_KEY = 'upgradeMap';
const SERIALIZABLE_PROPERTIES = [UPGRADE_MAP_PROPERTY_KEY];

export class UpgradeManager extends Serializable {
  private upgradeMap: Map<UpgradeKey, Upgrade>;
  private game: Game;

  constructor(game: Game) {
    super(SERIALIZABLE_PROPERTIES);
    this.game = game;
  }

  public initUpgrades() {
    this.upgradeMap = new Map<UpgradeKey, Upgrade>();
    
    // Maze / Points
    this.createUpgrade(new PointsPerVisitUpgrade(this.game, UpgradeKey.POINTS_PER_VISIT));
    this.createUpgrade(new MazeCompletionBonusUpgrade(this.game, UpgradeKey.MAZE_COMPLETION_BONUS));
    this.createUpgrade(new MazeSizeUpgrade(this.game, UpgradeKey.MAZE_SIZE_UPGRADE));
    this.createUpgrade(new PointsPerRevisitUpgrade(this.game, UpgradeKey.POINTS_PER_REVISIT));
    // Bot
    this.createUpgrade(new BotAutoMoveUpgrade(this.game, UpgradeKey.AUTO_MOVE));
    this.createUpgrade(new AutoExitMazeUpgrade(this.game, UpgradeKey.AUTO_EXIT_MAZE));
    this.createUpgrade(new AvoidRevisitLastPositionUpgrade(this.game, UpgradeKey.AVOID_REVISIT_LAST_POSITION));
    this.createUpgrade(new BotMovementSpeedUpgrade(this.game, UpgradeKey.BOT_MOVEMENT_SPEED));
    this.createUpgrade(new BotSplitAutoMergeUpgrade(this.game, UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE));
    this.createUpgrade(new BotSplitDirectionUpgrade(this.game, UpgradeKey.BOT_SPLIT_DIRECTION));
    this.createUpgrade(new BotRememberDeadEndTilesUpgrade(this.game, UpgradeKey.BOT_REMEMBER_DEADEND_TILES));
    this.createUpgrade(new BrainTileDistanceUpgrade(this.game, UpgradeKey.BRAIN_TILE_DISTANCE));
    this.createUpgrade(new PlayerMoveIndependentlyUpgrade(this.game, UpgradeKey.PLAYER_MOVE_INDEPENDENTLY));
    this.createUpgrade(new PrioritizeUnvisitedUpgrade(this.game, UpgradeKey.PRIORITIZE_UNVISITED));
    this.createUpgrade(new TeleportPlayerBacktoBotUpgrade(this.game, UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT));
    this.createUpgrade(new TeleportBotBackToPlayerUpgrade(this.game, UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER));
    // Item
    this.createUpgrade(new FruitPickupPointsMultiplierUpgrade(this.game, UpgradeKey.FRUIT_PICKUP_POINTS));
    this.createUpgrade(new FruitSpawnRateUpgrade(this.game, UpgradeKey.FRUIT_SPAWN));
    this.createUpgrade(new BrainSpawnRateUpgrade(this.game, UpgradeKey.BRAIN_SPAWN));
    // Power Up
    this.createUpgrade(new SpeedUpActivateDurationUpgrade(this.game, UpgradeKey.SPEED_UP_ACTIVATE_DURATION));
    this.createUpgrade(new SpeedUpMultiplierStrengthUpgrade(this.game, UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH));
    this.createUpgrade(new PointsMultiplierActivateDurationUpgrade(this.game, UpgradeKey.MULTIPLIER_POWER_UP_ACTIVATE_DURATION));
    this.createUpgrade(new PointsMultiplierStrengthUpgrade(this.game, UpgradeKey.MULTIPLIER_POWER_UP_STRENGTH));
    // Features
    this.createUpgrade(new DestructibleWallUpgrade(this.game, UpgradeKey.DESTRUCTIBLE_WALLS));
    // Biomes
    this.createUpgrade(new BiomeUpgrade(this.game, UpgradeKey.BIOME));
  }

  public updateAllUpgradeUi() {
    for (let [upgradeKey, upgrade] of this.upgradeMap) {
      upgrade.updateUiProperties();
      upgrade.updateUiDisabled();
      upgrade.updateVisibility();
    }
    this.updateUpgradeSectionVisibility();
  }

  private createUpgrade(upgrade: Upgrade): void {
    this.upgradeMap.set(upgrade.upgradeKey, upgrade);
  }

  public getUpgrade(upgradeKey: UpgradeKey): Upgrade {
    if (!this.hasUpgrade(upgradeKey)) {
      console.error(`Unexpected upgrade key requested: ${upgradeKey}`);
      return null;
    }
    return this.upgradeMap.get(upgradeKey);
  }

  private hasUpgrade(upgradeKey: UpgradeKey): boolean {
    return this.upgradeMap.has(upgradeKey);
  }

  public getUpgradeLevel(upgradeKey: UpgradeKey): number {
    if (!this.hasUpgrade(upgradeKey)) return 0;
    return this.getUpgrade(upgradeKey).upgradeLevel;
  }

  public isUpgraded(upgradeKey: UpgradeKey): boolean {
    if (!this.hasUpgrade(upgradeKey)) return false;
    return this.getUpgrade(upgradeKey).getIsUpgraded();
  }

  public serializeProperty(property: string): any {
    // Upgrade map will export the upgrade level of each key
    if (property === UPGRADE_MAP_PROPERTY_KEY) {
      const obj = {};
      for (let [k, v] of this.upgradeMap) {
        obj[k] = v.upgradeLevel;
      }
      return obj;
    } else {
      return super.serializeProperty(property);
    }
  }

  public deserializeProperty(property: string, value: any): void {
    // Upgrade map will restore the upgrade level of each key
    if (property === UPGRADE_MAP_PROPERTY_KEY) {
      for (const upgradeKey in value) {
        if (this.upgradeMap.has(upgradeKey as UpgradeKey)) {
          this.upgradeMap.get(upgradeKey as UpgradeKey).upgradeLevel = parseInt(value[upgradeKey]);
        } else {
          console.error("Failed to deserialize upgrade key: ", upgradeKey);
        }
      }
    } else {
      return super.deserializeProperty(property, value);
    }
  }

  public isUnlocked(upgradeKey: UpgradeKey): boolean {
    if (!this.hasUpgrade(upgradeKey)) return false;
    return this.upgradeMap.get(upgradeKey).isUnlocked();
  }

  private isUpgradeAvailableForUpgradeType(upgradeType: UpgradeType): boolean {
    for (const upgradeKey in UpgradeKey) {
      const upgrade = this.getUpgrade(upgradeKey as UpgradeKey);
      if (upgrade && upgrade.upgradeType === upgradeType && !upgrade.isMaxUpgradeLevel()) {
        return true;
      }
    }
    return false;
  }

  public updateUpgradeSectionVisibility(): void {
    for (const upgradeType in UpgradeType) {
      const isUpgradeAvailable = this.isUpgradeAvailableForUpgradeType(upgradeType as UpgradeType);
      const uiKey = UPGRADE_TYPE_TO_UI_KEY_MAP.get(upgradeType as UpgradeType);
      if (uiKey) {
        UserInterface.setIdVisible(uiKey, isUpgradeAvailable);
      }
    }
  }
}


export default UpgradeManager;
