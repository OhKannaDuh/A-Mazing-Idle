import Game from "managers/Game";
import Upgrade from "upgrades/Upgrade";
import { 
  SPEED_UP_MULTIPLIER_STRENGTH_BASE_COST, 
  SPEED_UP_MULTIPLIER_STRENGTH_COST_MULTIPLIER, 
  UpgradeKey, 
  UpgradeType 
} from "constants/UpgradeConstants";
import { SpeedUpPowerUp } from "powerUps/SpeedUpPowerUp";

const BUTTON_UI_ID = 'buySpeedUpMultiplierStrengthUpgrade';
const TOOLTIP_TEXT = 'The speed up power up is stronger so bots move even faster!  More points!';

export class SpeedUpMultiplierStrengthUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    
    this.setUiText(`Speed Up Multiplier Value  (${SpeedUpPowerUp.getActivateDuration(this.game)}s): ${this.getPrettyPrintCost()} pts`);
  }

  getCost(): number {
    return SPEED_UP_MULTIPLIER_STRENGTH_BASE_COST * Math.pow(SPEED_UP_MULTIPLIER_STRENGTH_COST_MULTIPLIER, this.upgradeLevel);
  }
}
