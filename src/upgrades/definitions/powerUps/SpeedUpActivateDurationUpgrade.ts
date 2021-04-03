import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { 
  SPEED_UP_POWER_UP_ACTIVATE_DURATION_BASE_COST, 
  SPEED_UP_POWER_UP_ACTIVATE_DURATION_COST_MULTIPLIER, 
  UpgradeKey, 
  UpgradeType 
} from "constants/UpgradeConstants";
import { SpeedUpPowerUp } from "powerUps/SpeedUpPowerUp";
import { SPEED_UP_POWER_UP_BASE_DURATION, SPEED_UP_POWER_UP_BASE_DURATION_INCREASE } from "constants/PowerUpConstants";

const BUTTON_UI_ID = 'buyPowerUpSpeedUpActivateDuration';
const TOOLTIP_TEXT = 'The speed up power up will stay active for a longer duration!  More points!';

export class SpeedUpActivateDurationUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Speed Up Activate Duration  (${SpeedUpPowerUp.getActivateDuration(this.game)/1000}s): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return SPEED_UP_POWER_UP_ACTIVATE_DURATION_BASE_COST * Math.pow(SPEED_UP_POWER_UP_ACTIVATE_DURATION_COST_MULTIPLIER, this.upgradeLevel);
  }
  
  public static getSpeedUpPowerUpActivateDuration(game: Game): number {
    const upgradeLevel = game.upgrades.getUpgradeLevel(UpgradeKey.SPEED_UP_ACTIVATE_DURATION);
    return SPEED_UP_POWER_UP_BASE_DURATION + (upgradeLevel * SPEED_UP_POWER_UP_BASE_DURATION_INCREASE);
  }
}
