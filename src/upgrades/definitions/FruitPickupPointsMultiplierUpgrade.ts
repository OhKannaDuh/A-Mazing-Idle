import Game from "../../Game";
import Upgrade from "../Upgrade";
import { FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST, FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER, UpgradeKey } from "../UpgradeConstants";

const BUTTON_UI_ID = 'buyFruitPickupPointsUpgrade';
const TOOLTIP_TEXT = 'Fruits pickups are worth more points!';

class FruitPickupPointsMultiplierUpgrade extends Upgrade {
  
  constructor(game: Game, upgradeKey: UpgradeKey, upgradeLevel: number = 0) {
    super(game, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel);
  }
  
  updateUiProperties(): void {
    this.setUiText(`Fruit Pickup Points (${this.upgradeLevel}): ${this.getCost().toLocaleString()} pts`)  }

  getCost(): number {
    return FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST * Math.pow(FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
  }
}

export default FruitPickupPointsMultiplierUpgrade;
