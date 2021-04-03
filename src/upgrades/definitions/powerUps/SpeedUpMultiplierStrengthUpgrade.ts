import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { 
  SPEED_UP_MULTIPLIER_STRENGTH_BASE_COST, 
  SPEED_UP_MULTIPLIER_STRENGTH_COST_MULTIPLIER, 
  UpgradeKey, 
  UpgradeType 
} from "constants/UpgradeConstants";
import { SpeedUpPowerUp } from "powerUps/SpeedUpPowerUp";
import { SPEED_UP_POWER_UP_BASE_STRENGTH, SPEED_UP_POWER_UP_BASE_STRENGTH_INCREASE } from "constants/PowerUpConstants";

const BUTTON_UI_ID = 'buySpeedUpMultiplierStrengthUpgrade';
const TOOLTIP_TEXT = 'The speed up power up is stronger so bots move even faster!  More points!';

export class SpeedUpMultiplierStrengthUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  public updateUiProperties(): void {
    this.setUiText(`Speed Up Multiplier Value  (${SpeedUpMultiplierStrengthUpgrade.getSpeedUpMultiplier(this.game)}x): ${this.getPrettyPrintCost()} pts`);
  }

  public getCost(): number {
    return SPEED_UP_MULTIPLIER_STRENGTH_BASE_COST * Math.pow(SPEED_UP_MULTIPLIER_STRENGTH_COST_MULTIPLIER, this.upgradeLevel);
  }

  public static getSpeedUpMultiplier(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH);
    return SPEED_UP_POWER_UP_BASE_STRENGTH + (upgradeLevel * SPEED_UP_POWER_UP_BASE_STRENGTH_INCREASE)
  }
}
