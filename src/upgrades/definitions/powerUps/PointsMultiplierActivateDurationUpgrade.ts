import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { MULTIPLIER_POWER_UP_SPAWN_RATE_BASE_COST, MULTIPLIER_POWER_UP_SPAWN_RATE_COST_MULTIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";
import { POINTS_MULTIPLIER_POWER_UP_BASE_DURATION, POINTS_MULTIPLIER_POWER_UP_BASE_DURATION_INCREASE } from "constants/PowerUpConstants";
import { PointsMultiplierPowerUp } from "powerUps/PointsMultiplierPowerUp";

const BUTTON_UI_ID = 'buyMultiplierPowerUpActivateDurationUpgrade';
const TOOLTIP_TEXT = 'Points multiplier item applies a multiplier to all items and visited tiles. This upgrade will increase the strength.';

export class PointsMultiplierActivateDurationUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Points Multiplier Activate Duration (${PointsMultiplierPowerUp.getActivateDuration(this.game)/1000}s): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return MULTIPLIER_POWER_UP_SPAWN_RATE_BASE_COST * Math.pow(MULTIPLIER_POWER_UP_SPAWN_RATE_COST_MULTIPLIER, this.upgradeLevel);
  }

  public static getMultiplierPowerUpActivateDuration(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.MULTIPLIER_POWER_UP_ACTIVATE_DURATION);
    return POINTS_MULTIPLIER_POWER_UP_BASE_DURATION + (upgradeLevel * POINTS_MULTIPLIER_POWER_UP_BASE_DURATION_INCREASE);
  }
}
