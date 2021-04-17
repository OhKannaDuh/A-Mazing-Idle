import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { MULTIPLIER_POWER_UP_STRENGTH_BASE_COST, MULTIPLIER_POWER_UP_STRENGTH_BASE_COST_MULTIPLIER, UpgradeKey, UpgradeType } from "constants/UpgradeConstants";
import { POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH, POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH_MULTIPLIER } from "constants/PowerUpConstants";

const BUTTON_UI_ID = 'buyMultiplierPowerUpStrengthUpgrade';
const TOOLTIP_TEXT = 'Points multiplier power up will increase in strength.';

export class PointsMultiplierStrengthUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Points Multiplier Strength (${PointsMultiplierStrengthUpgrade.getPointsMultiplierStrength(this.game)}x): ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return MULTIPLIER_POWER_UP_STRENGTH_BASE_COST * Math.pow(MULTIPLIER_POWER_UP_STRENGTH_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }

  public static getPointsMultiplierStrength(game: Game) {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.MULTIPLIER_POWER_UP_STRENGTH);
    return POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH + (POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH_MULTIPLIER * upgradeLevel);
  }
}
